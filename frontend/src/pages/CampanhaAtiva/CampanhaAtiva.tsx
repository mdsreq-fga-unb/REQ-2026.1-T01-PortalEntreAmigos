import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, StopCircle, Trash2, Calendar, Target, MapPin, X, Type, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './CampanhaAtiva.module.css';

export function CampanhaAtiva() {
  const { isAdmin } = useAuth();

  const [activeCampaign, setActiveCampaign] = useState({
    titulo: 'Campanha de Inverno Solidário',
    descricao: 'Arrecadação de agasalhos e cobertores para famílias em situação de vulnerabilidade durante o inverno rigoroso.',
    dataInicio: '2026-06-01',
    dataTermino: '2026-07-30',
    local: 'Sede da Ação Entre Amigos BSB',
    metas: '500 cobertores e R$ 2.000,00'
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...activeCampaign });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format dates locally just for display if needed, but assuming HTML5 format
    setActiveCampaign({ ...editFormData });
    setIsEditModalOpen(false);
  };

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
            <h2>{activeCampaign.titulo}</h2>
            <p className={styles.description}>{activeCampaign.descricao}</p>
            
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <Calendar size={20} className={styles.infoIcon} />
                <div>
                  <strong>Período</strong>
                  <span>{activeCampaign.dataInicio} a {activeCampaign.dataTermino}</span>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <Target size={20} className={styles.infoIcon} />
                <div>
                  <strong>Metas</strong>
                  <span>{activeCampaign.metas}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <MapPin size={20} className={styles.infoIcon} />
                <div>
                  <strong>Local</strong>
                  <span>{activeCampaign.local}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionsDivider}>
            Ações da Campanha
          </div>

          <div className={styles.actionsGrid}>
            <button className={`${styles.actionButton} ${styles.btnEdit}`} onClick={() => { setEditFormData({ ...activeCampaign }); setIsEditModalOpen(true); }}>
              <Edit size={24} />
              <span>Editar Campanha</span>
            </button>

            <button className={`${styles.actionButton} ${styles.btnStop}`}>
              <StopCircle size={24} />
              <span>Encerrar Campanha</span>
            </button>

            <button className={`${styles.actionButton} ${styles.btnDelete}`}>
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
                  <input type="text" name="titulo" value={editFormData.titulo} onChange={handleEditChange} className={styles.input} required />
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
                    <input type="date" name="dataInicio" value={editFormData.dataInicio} onChange={handleEditChange} className={styles.input} required />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Data de Término</label>
                  <div className={styles.inputWrapper}>
                    <Calendar size={20} className={styles.inputIcon} />
                    <input type="date" name="dataTermino" value={editFormData.dataTermino} onChange={handleEditChange} className={styles.input} required />
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

              <div className={styles.inputGroup}>
                <label className={styles.label}>Metas de Arrecadação</label>
                <div className={styles.inputWrapper}>
                  <Target size={20} className={styles.inputIcon} />
                  <input type="text" name="metas" value={editFormData.metas} onChange={handleEditChange} className={styles.input} required />
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
