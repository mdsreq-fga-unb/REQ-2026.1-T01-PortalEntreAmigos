import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, StopCircle, Trash2, Calendar, Target, MapPin, X, Type, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { eventoService } from '../../services/api';
import toast from 'react-hot-toast';
import styles from './CampanhaAtiva.module.css';

export function CampanhaAtiva() {
  const { isAdmin } = useAuth();
  const { id } = useParams(); // pega o ID da URL: /campanhas/:id

  const [campanha, setCampanha] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<any>({});

  // Busca o evento ao carregar
  useEffect(() => {
    if (!id) return;
    eventoService.buscar(id)
      .then(data => {
        setCampanha(data);
        setEditFormData(data);
      })
      .catch(() => toast.error('Erro ao carregar campanha'))
      .finally(() => setLoading(false));
  }, [id]);

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
        local: editFormData.local,
        capacidade_voluntarios: editFormData.capacidade_voluntarios,
      });
      setCampanha(atualizado);
      setIsEditModalOpen(false);
      toast.success('Campanha atualizada!');
    } catch {
      toast.error('Erro ao atualizar campanha');
    }
  };

  const handleEncerrar = async () => {
    try {
      const atualizado = await eventoService.atualizar(id!, { status: 'CONCLUIDO' });
      setCampanha(atualizado);
      toast.success('Campanha encerrada!');
    } catch {
      toast.error('Erro ao encerrar campanha');
    }
  };

  const handleDeletar = async () => {
    if (!confirm('Tem certeza que deseja excluir esta campanha?')) return;
    try {
      await eventoService.deletar(id!);
      toast.success('Campanha excluída!');
      window.location.href = '/gerenciar-campanhas';
    } catch {
      toast.error('Erro ao excluir campanha');
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
                  <strong>Progresso Geral</strong>
                  <span>{campanha.progresso_geral}%</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <MapPin size={20} className={styles.infoIcon} />
                <div>
                  <strong>Local</strong>
                  <span>{campanha.local}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionsDivider}>Ações da Campanha</div>

          <div className={styles.actionsGrid}>
            <button className={`${styles.actionButton} ${styles.btnEdit}`}
              onClick={() => { setEditFormData({ ...campanha }); setIsEditModalOpen(true); }}>
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
        </div>
      </div>

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
                <label className={styles.label}>Local de Arrecadação</label>
                <div className={styles.inputWrapper}>
                  <MapPin size={20} className={styles.inputIcon} />
                  <input type="text" name="local" value={editFormData.local} onChange={handleEditChange} className={styles.input} required />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
                <button type="submit" className={styles.saveButton}>Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}