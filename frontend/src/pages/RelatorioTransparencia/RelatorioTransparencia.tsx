import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Plus, Image as ImageIcon, Trash2 } from 'lucide-react';
import { eventoService, itemDoacaoService } from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { Modal } from '../../components/Modal/Modal';
import styles from './RelatorioTransparencia.module.css';

// Recharts components
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export function RelatorioTransparencia() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [campanha, setCampanha] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    action: () => {}
  });

  // Table rows state
  const [rows, setRows] = useState<any[]>([]);
  // Chart data state
  const [chartData, setChartData] = useState<any[]>([]);
  // Receipts (images) state
  const [comprovantes, setComprovantes] = useState<{ id: number, url: string, nome: string }[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const carregarDados = useCallback(async () => {
    if (!id) return;
    try {
      const campanhaData = await eventoService.buscar(id);
      const itensData = await itemDoacaoService.listarPorEvento(id);
      
      setCampanha(campanhaData);

      // Pre-fill table rows with received items
      const initialRows = itensData.map((item: any, index: number) => ({
        id: `db-${item.id}-${index}`,
        produto: item.nome,
        quantidade: item.quantidade_recebida || item.meta_item || 0,
        unidade: item.unidade_medida || 'unidade',
        unitario: '',
        total: 0
      }));
      setRows(initialRows);

      // Pre-fill chart data
      const cData = itensData.map((item: any) => ({
        name: item.nome,
        'Prometido': item.quantidade_prometida,
        'Confirmado': item.quantidade_recebida
      }));
      setChartData(cData);

    } catch {
      toast.error('Erro ao carregar dados do relatório');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  useEffect(() => {
    if (campanha?.status === 'AGUARDANDO_RELATORIO') {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = ''; // Required for Chrome to show the prompt
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [campanha?.status]);

  const handleRowChange = (id: string, field: string, value: string | number) => {
    setRows(prev => prev.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        // Recalculate total if quantity or unit price changes
        if (field === 'quantidade' || field === 'unitario') {
          const qte = Number(updatedRow.quantidade) || 0;
          
          // Parse BRL value safely. If user types 10,50 we treat as 10.50
          let unitPrice = 0;
          if (typeof updatedRow.unitario === 'string') {
            const normalized = updatedRow.unitario.replace(',', '.');
            unitPrice = parseFloat(normalized);
          } else {
            unitPrice = updatedRow.unitario;
          }

          if (!isNaN(unitPrice)) {
            updatedRow.total = qte * unitPrice;
          } else {
            updatedRow.total = 0;
          }
        }
        return updatedRow;
      }
      return row;
    }));
  };

  const handleAddRow = () => {
    const newId = `new-${Date.now()}`;
    setRows([...rows, {
      id: newId,
      produto: '',
      quantidade: 0,
      unidade: 'unidade',
      unitario: '',
      total: 0
    }]);
  };

  const handleRemoveRow = (id: string) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  // Image Upload Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const processFiles = (files: File[]) => {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (imageFiles.length !== files.length) {
      toast.error('Apenas imagens são permitidas (PNG, JPG, etc).');
    }

    const newComprovantes = imageFiles.map(file => {
      return {
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        nome: file.name
      };
    });

    setComprovantes(prev => [...prev, ...newComprovantes]);
  };

  const updateComprovanteName = (id: number, newName: string) => {
    setComprovantes(prev => prev.map(c => c.id === id ? { ...c, nome: newName } : c));
  };

  const removeComprovante = (id: number) => {
    setComprovantes(prev => prev.filter(c => c.id !== id));
  };

  const requestFinalizar = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Finalizar Relatório',
      message: 'Tem certeza que deseja finalizar e exportar o relatório? Esta ação não poderá ser desfeita e a campanha será totalmente encerrada.',
      action: async () => {
        try {
          // Atualiza status para CONCLUIDO
          await eventoService.atualizar(id!, { status: 'CONCLUIDO' });
          toast.success('Relatório finalizado com sucesso!');
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
          
          // Aguarda modal fechar para imprimir e redirecionar
          setTimeout(() => {
            window.print();
            navigate('/gerenciar-campanhas');
          }, 500);
        } catch {
          toast.error('Erro ao finalizar o relatório');
        }
      }
    });
  };

  if (!isAdmin) {
    return (
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCard}>
            <h2>Acesso Restrito</h2>
            <p>Apenas administradores podem acessar relatórios.</p>
            <Link to="/" className={styles.primaryButton}>Voltar para Início</Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) return <p>Carregando...</p>;
  if (!campanha) return <p>Campanha não encontrada.</p>;

  // Totals calculations
  const totalItensDoados = rows.length;
  const totalEstimadoQuantidade = rows.reduce((acc, row) => acc + (Number(row.quantidade) || 0), 0);
  const totalValores = rows.reduce((acc, row) => acc + (Number(row.total) || 0), 0);

  return (
    <main className={styles.container}>
      <div className={styles.topBar}>
        <Link to="/gerenciar-campanhas" className={styles.backLink}>
          <ArrowLeft size={20} />
          Voltar para o Painel
        </Link>
        <button className={styles.printButton} onClick={requestFinalizar}>
          <Printer size={20} />
          Finalizar e Exportar Relatório
        </button>
      </div>

      <div className={styles.reportSheet}>
        {/* Header do Relatório */}
        <div className={styles.reportHeader}>
          <h1>Prestação de Contas — {campanha.nome}</h1>
          <p>Período: {campanha.data_inicio} a {campanha.data_fim}</p>
        </div>

        {/* Gráfico Comparativo (Hidden on print) */}
        <div className={styles.chartSection}>
          <h2>Resumo de Arrecadações (Prometido vs Confirmado)</h2>
          {chartData.length > 0 ? (
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Prometido" fill="#36A2EB" />
                  <Bar dataKey="Confirmado" fill="#4BC0C0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p>Nenhum dado para exibir no gráfico.</p>
          )}
        </div>

        {/* Tabela de Produtos */}
        <div className={styles.tableSection}>
          <h2>Lista de Materiais e Valores</h2>
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Item/Produto</th>
                  <th style={{ width: '80px' }}>Qde.</th>
                  <th style={{ width: '100px' }}>Un.med.</th>
                  <th style={{ width: '120px' }}>R$ Unit.</th>
                  <th style={{ width: '120px' }}>R$ Total</th>
                  <th className={styles.noPrintAction} style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <input 
                        type="text" 
                        value={row.produto} 
                        onChange={(e) => handleRowChange(row.id, 'produto', e.target.value)} 
                        placeholder="Nome do produto"
                        className={styles.cellInput}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={row.quantidade} 
                        onChange={(e) => handleRowChange(row.id, 'quantidade', e.target.value)} 
                        className={styles.cellInput}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={row.unidade} 
                        onChange={(e) => handleRowChange(row.id, 'unidade', e.target.value)} 
                        className={styles.cellInput}
                      />
                    </td>
                    <td>
                      <div className={styles.currencyInputWrapper}>
                        <span>R$</span>
                        <input 
                          type="text" 
                          value={row.unitario} 
                          onChange={(e) => handleRowChange(row.id, 'unitario', e.target.value)} 
                          placeholder="0,00"
                          className={styles.cellInput}
                        />
                      </div>
                    </td>
                    <td className={styles.totalCell}>
                      R$ {row.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className={styles.noPrintAction}>
                      <button onClick={() => handleRemoveRow(row.id)} className={styles.btnRemoveRow} title="Remover linha">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className={`${styles.btnAddRow} ${styles.noPrint}`} onClick={handleAddRow}>
            <Plus size={16} /> Adicionar Linha
          </button>
        </div>

        {/* Rodapé Resumo */}
        <div className={styles.summarySection}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total de itens doados (categorias):</span>
            <span className={styles.summaryValue}>{totalItensDoados}</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total estimado de doações (quantidades):</span>
            <span className={styles.summaryValue}>{totalEstimadoQuantidade.toLocaleString('pt-BR')}</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total aproximado em valores:</span>
            <span className={styles.summaryValue}>R$ {totalValores.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Comprovantes */}
        <div className={styles.comprovantesSection}>
          <h2>Comprovantes</h2>
          
          <div 
            className={`${styles.dropZone} ${styles.noPrint}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon size={32} className={styles.dropIcon} />
            <p>Arraste imagens aqui ou clique para selecionar comprovantes (PNG, JPG).</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              multiple 
              onChange={handleFileSelect}
            />
          </div>

          <div className={styles.comprovantesGrid}>
            {comprovantes.map((comp) => (
              <div key={comp.id} className={styles.comprovanteCard}>
                <img src={comp.url} alt={comp.nome} className={styles.comprovanteImage} />
                <div className={styles.comprovanteFooter}>
                  <input 
                    type="text" 
                    value={comp.nome} 
                    onChange={(e) => updateComprovanteName(comp.id, e.target.value)}
                    className={styles.comprovanteInput}
                    placeholder="Legenda do comprovante"
                  />
                  <button className={`${styles.btnRemoveComprovante} ${styles.noPrint}`} onClick={() => removeComprovante(comp.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── Modal de Confirmação ───────────────────────────────────────── */}
      <Modal 
        isOpen={confirmModal.isOpen} 
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        title={confirmModal.title}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ marginBottom: '1.5rem', color: '#4b5563', lineHeight: '1.5' }}>
            {confirmModal.message}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: 'white', color: '#374151', cursor: 'pointer', fontWeight: 500 }}
              onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            >
              Cancelar
            </button>
            <button
              type="button"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}
              onClick={confirmModal.action}
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>

    </main>
  );
}
