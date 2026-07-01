import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Edit, StopCircle, Trash2, Calendar, Target, MapPin,
  X, Type, FileText, CheckCircle2, Trash
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { eventoService, itemDoacaoService, doacaoService } from '../../services/api';
import { DonationProgress } from '../Doar/components/DonationProgress/DonationProgress';
import { MapPicker, type PontoColeta } from '../../components/MapPicker/MapPicker';
import { Modal } from '../../components/Modal/Modal';
import toast from 'react-hot-toast';
import styles from './CampanhaAtiva.module.css';


const CORES = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export function CampanhaAtiva() {
  const { isAdmin } = useAuth();
  const { id } = useParams();

  const [campanha, setCampanha] = useState<any>(null);
  const [itens, setItens] = useState<any[]>([]);
  const [promessas, setPromessas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<any>({});
  const [pontosEditando, setPontosEditando] = useState<PontoColeta[]>([]);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    action: () => {}
  });


  const carregarDados = useCallback(async () => {
    if (!id) return;
    try {
      const [campanhaData, itensData, promessasData] = await Promise.all([
        eventoService.buscar(id),
        itemDoacaoService.listarPorEvento(id),
        doacaoService.listarPorEvento(id),
      ]);
      setCampanha(campanhaData);
      setItens(itensData);
      setPromessas(promessasData);
    } catch {
      toast.error('Erro ao carregar campanha');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const atualizado = await eventoService.atualizar(id!, {
        nome: editFormData.nome,
        descricao: editFormData.descricao,
        data_inicio: editFormData.data_inicio,
        data_fim: editFormData.data_fim,
        local: '',
        capacidade_voluntarios: editFormData.capacidade_voluntarios,
        pontos_coleta: pontosEditando,
      });
      setCampanha(atualizado);
      setIsEditModalOpen(false);
      toast.success('Campanha atualizada!');
    } catch (error: any) {
      const responseData = error.response?.data;
      if (responseData && typeof responseData === 'object') {
        const errorMsgs = Object.values(responseData).flat().join(' ');
        toast.error(errorMsgs || 'Erro ao atualizar campanha.');
      } else {
        toast.error('Erro ao atualizar campanha.');
      }
      console.error(error);
    }
  };


  const navigate = useNavigate();

  const handleEncerrar = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Encerrar Campanha',
      message: 'Tem certeza que deseja encerrar esta campanha? Esta ação não poderá ser desfeita.',
      action: async () => {
        try {
          const atualizado = await eventoService.atualizar(id!, { status: 'AGUARDANDO_RELATORIO' });
          setCampanha(atualizado);
          toast.success('Campanha encerrada! Redirecionando para o relatório...');
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
          navigate(`/relatorio-transparencia/${id}`);
        } catch {
          toast.error('Erro ao encerrar campanha');
        }
      }
    });
  };

  const handleDeletar = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Excluir Campanha',
      message: 'Tem certeza que deseja excluir esta campanha? Todos os dados serão perdidos permanentemente.',
      action: async () => {
        try {
          await eventoService.deletar(id!);
          toast.success('Campanha excluída!');
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
          navigate('/gerenciar-campanhas');
        } catch {
          toast.error('Erro ao excluir campanha');
        }
      }
    });
  };

  const handleConfirmarPromessa = async (promessaId: number) => {
    try {
      await doacaoService.confirmar(promessaId);
      toast.success('Doação confirmada como recebida! ✅');
      carregarDados(); // recarrega promessas e itens (incluindo progresso)
    } catch {
      toast.error('Erro ao confirmar doação.');
    }
  };

  const handleExcluirPromessa = async (promessaId: number) => {
    if (!confirm('Deseja cancelar esta promessa de doação?')) return;
    try {
      await doacaoService.deletar(promessaId);
      toast.success('Promessa cancelada.');
      carregarDados();
    } catch {
      toast.error('Erro ao cancelar promessa.');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!campanha) return <p>Campanha não encontrada.</p>;

  if (!isAdmin) {
    return (
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCard}>
            <h2>Acesso Restrito</h2>
            <p>Você precisa ser administrador para gerenciar a campanha ativa.</p>
            <Link to="/" className={styles.primaryButton}>Voltar para Início</Link>
          </div>
        </div>
      </main>
    );
  }

  // Dados para os gráficos
  const dadosPromessas = itens.map((item, index) => ({
    name: item.nome,
    value: item.quantidade_prometida,
    color: CORES[index % CORES.length],
  }));

  const dadosRecebidos = itens.map((item, index) => ({
    name: item.nome,
    value: item.quantidade_recebida,
    color: CORES[index % CORES.length],
  }));

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Link to="/gerenciar-campanhas" className={styles.backLink}>
          <ArrowLeft size={20} />
          Voltar para o Painel
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>Gerenciar Campanha Ativa</h1>
          <p className={styles.subtitle}>
            Abaixo estão os detalhes da campanha em andamento e as ações disponíveis.
          </p>
        </div>

        {/* ─── Card de Detalhes da Campanha ─────────────────────────── */}
        <div className={styles.card}>
          <div className={styles.campaignDetails}>
            <h2>{campanha.nome}</h2>
            <p className={styles.description}>{campanha.descricao}</p>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <Calendar size={20} className={styles.infoIcon} />
                <div>
                  <strong>Período</strong>
                  <span>{campanha.data_inicio} a {campanha.data_fim}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Target size={20} className={styles.infoIcon} />
                <div>
                  <strong>Progresso (Prometido)</strong>
                  <span>{campanha.progresso_geral}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionsDivider}>Ações da Campanha</div>

          <div className={styles.actionsGrid}>
            <button
              className={`${styles.actionButton} ${styles.btnEdit}`}
              onClick={() => {
                setEditFormData({ ...campanha });
                setPontosEditando(campanha.pontos_coleta ?? []);
                setIsEditModalOpen(true);
              }}
            >
              <Edit size={24} />
              <span>Editar Campanha</span>
            </button>

            <button className={`${styles.actionButton} ${styles.btnStop}`} onClick={handleEncerrar}>
              <StopCircle size={24} />
              <span>Encerrar Campanha</span>
            </button>

            <button className={`${styles.actionButton} ${styles.btnDelete}`} onClick={handleDeletar}>
              <Trash2 size={24} />
              <span>Excluir Campanha</span>
            </button>
          </div>

          {/* ─── Tabela de Promessas ──────────────────────────────── */}
          <div className={styles.promessasSection}>
            <div className={styles.sectionDivider}>Promessas de Doação</div>

            <div className={styles.tableWrapper}>
              <table className={styles.promessasTable}>
                <thead>
                  <tr>
                    <th>Voluntário</th>
                    <th>CPF</th>
                    <th>Item</th>
                    <th>Qtd.</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {promessas.length === 0 ? (
                    <tr>
                      <td colSpan={6} className={styles.emptyState}>
                        Nenhuma promessa de doação registrada ainda.
                      </td>
                    </tr>
                  ) : (
                    promessas.map((p: any) => (
                      <tr
                        key={p.id}
                        className={p.status === 'RECEBIDA' ? styles.rowConfirmada : ''}
                      >
                        <td>{p.doador_nome || '—'}</td>
                        <td>{p.doador_cpf || '—'}</td>
                        <td>{p.item_nome || `Item #${p.item}`}</td>
                        <td>{p.quantidade}</td>
                        <td>
                          <span
                            className={`${styles.statusBadge} ${
                              p.status === 'RECEBIDA' ? styles.statusRecebida : styles.statusPendente
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td>
                          <div className={styles.tableActions}>
                            <button
                              className={styles.btnConfirmar}
                              onClick={() => handleConfirmarPromessa(p.id)}
                              disabled={p.status === 'RECEBIDA'}
                              title="Confirmar recebimento"
                            >
                              <CheckCircle2 size={14} />
                              Confirmar
                            </button>
                            <button
                              className={styles.btnExcluir}
                              onClick={() => handleExcluirPromessa(p.id)}
                              title="Cancelar promessa"
                            >
                              <Trash size={14} />
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ─── Gráficos ──────────────────────────────────────────────── */}
        <div className={styles.chartsGrid}>
          <DonationProgress
            data={dadosPromessas}
            globalProgress={campanha.progresso_geral}
            title="Distribuição das Promessas"
          />
          <DonationProgress
            data={dadosRecebidos}
            globalProgress={campanha.progresso_recebido ?? 0}
            title="Distribuição dos Itens Recebidos"
          />
        </div>
      </div>

      {/* ─── Modal de Edição ───────────────────────────────────────── */}
      {isEditModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h2>Editar Campanha</h2>
              <button className={styles.closeButton} onClick={() => setIsEditModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Título da Campanha</label>
                <div className={styles.inputWrapper}>
                  <Type size={20} className={styles.inputIcon} />
                  <input type="text" name="nome" value={editFormData.nome} onChange={handleEditChange} className={styles.input} required />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Descrição</label>
                <div className={styles.inputWrapper}>
                  <FileText size={20} className={styles.inputIcon} style={{ top: '1rem', position: 'absolute' }} />
                  <textarea name="descricao" value={editFormData.descricao} onChange={handleEditChange} className={styles.textarea} rows={3} required />
                </div>
              </div>

              <div className={styles.rowGroup}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Data de Início</label>
                  <div className={styles.inputWrapper}>
                    <Calendar size={20} className={styles.inputIcon} />
                    <input type="date" name="data_inicio" value={editFormData.data_inicio} onChange={handleEditChange} className={styles.input} required />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Data de Término</label>
                  <div className={styles.inputWrapper}>
                    <Calendar size={20} className={styles.inputIcon} />
                    <input type="date" name="data_fim" value={editFormData.data_fim} onChange={handleEditChange} className={styles.input} required />
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <MapPin size={16} style={{ display: 'inline', marginRight: '0.35rem' }} />
                  Pontos de Coleta no Mapa
                </label>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem', marginTop: '-0.25rem' }}>
                  Clique no mapa para adicionar ou remover pontos de coleta.
                </p>
                <MapPicker pontos={pontosEditando} onChange={setPontosEditando} />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
                <button type="submit" className={styles.saveButton}>Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Modal de Confirmação ───────────────────────────────────────── */}
      <Modal 
        isOpen={confirmModal.isOpen} 
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        title={confirmModal.title}
      >
        <div className={styles.form}>
          <p style={{ marginBottom: '1.5rem', color: '#4b5563', lineHeight: '1.5' }}>
            {confirmModal.message}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            >
              Cancelar
            </button>
            <button
              type="button"
              className={styles.saveButton}
              style={{ backgroundColor: confirmModal.title.includes('Excluir') ? '#ef4444' : 'var(--color-primary)' }}
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