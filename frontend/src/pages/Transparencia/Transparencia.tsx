import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X, UploadCloud, Edit, Trash2, FileText, Plus } from 'lucide-react';
import { transparenciaService } from '../../services/api';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import toast from 'react-hot-toast';
import styles from './Transparencia.module.css';

export function Transparencia() {
  const { isAdmin } = useAuth();
  
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Form states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const carregarCards = async () => {
    try {
      const data = await transparenciaService.listar();
      setCards(data);
    } catch (err) {
      toast.error('Erro ao carregar os relatórios de transparência.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCards();
  }, []);

  const openModal = (card: any = null) => {
    if (card) {
      setEditingId(card.id);
      setNome(card.nome);
      setPdfFile(null); // the existing file will be kept if not changed
    } else {
      setEditingId(null);
      setNome('');
      setPdfFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setNome('');
    setPdfFile(null);
  };

  const openDeleteModal = (id: number) => {
    setEditingId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEditingId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      toast.error('O nome da campanha é obrigatório.');
      return;
    }
    if (!editingId && !pdfFile) {
      toast.error('O arquivo PDF é obrigatório.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('nome', nome);
      if (pdfFile) {
        formData.append('arquivo_pdf', pdfFile);
      }

      if (editingId) {
        await transparenciaService.atualizar(editingId, formData);
        toast.success('Card atualizado com sucesso!');
      } else {
        await transparenciaService.criar(formData);
        toast.success('Card criado com sucesso!');
      }
      
      closeModal();
      carregarCards();
    } catch (err: any) {
      let mensagem = 'Erro ao salvar o card.';
      if (err.response?.data) {
        console.error(err.response.data);
      }
      toast.error(mensagem);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!editingId) return;
    setIsSubmitting(true);
    try {
      await transparenciaService.deletar(editingId);
      toast.success('Card excluído com sucesso!');
      closeDeleteModal();
      carregarCards();
    } catch (err) {
      toast.error('Erro ao excluir o card.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewPdf = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return <main className={styles.container}><p style={{textAlign: 'center', marginTop: '4rem'}}>Carregando transparência...</p></main>;
  }

  return (
    <main className={styles.container}>
      <PageHeader 
        title="TRANSPARÊNCIA"
        subtitle="Cada real doado é registrado e comprovado. Veja abaixo as notas fiscais e relatórios das campanhas."
        minHeight="200px"
      >
        {isAdmin && (
          <button className={styles.addButton} onClick={() => openModal()} style={{ marginTop: '1rem', width: 'auto', alignSelf: 'center', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
            <Plus size={20} style={{ marginRight: '8px' }} />
            Adicionar Transparência
          </button>
        )}
      </PageHeader>

      <section className={styles.cardsList}>
        {cards.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Ainda não há relatórios de transparência cadastrados.</p>
          </div>
        ) : (
          cards.map((card) => (
            <div key={card.id} className={styles.cardItem}>
              <div className={styles.cardInfo}>
                <FileText className={styles.cardIcon} size={32} />
                <h3 className={styles.cardTitle}>{card.nome}</h3>
              </div>
              <div className={styles.cardActions}>
                <button 
                  className={styles.viewPdfButton} 
                  onClick={() => handleViewPdf(card.arquivo_pdf)}
                >
                  Visualizar PDF
                </button>
                
                {isAdmin && (
                  <>
                    <button 
                      className={styles.iconButton} 
                      onClick={() => openModal(card)}
                      title="Editar"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      className={`${styles.iconButton} ${styles.dangerIcon}`} 
                      onClick={() => openDeleteModal(card.id)}
                      title="Excluir"
                    >
                      <Trash2 size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h2>{editingId ? 'Editar Transparência' : 'Adicionar Transparência'}</h2>
              <button className={styles.closeButton} onClick={closeModal} disabled={isSubmitting}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nome da Campanha / Ação *</label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Ação número 15"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.uploadArea}>
                <UploadCloud size={48} className={styles.uploadIcon} />
                <p>Arraste e solte o arquivo PDF aqui</p>
                <span className={styles.uploadSubtext}>ou clique para procurar no seu computador</span>
                <input 
                  type="file" 
                  accept="application/pdf" 
                  className={styles.fileInput} 
                  onChange={handleFileChange}
                  required={!editingId}
                />
                {pdfFile && <p className={styles.fileName}>Arquivo selecionado: {pdfFile.name}</p>}
                {editingId && !pdfFile && <p className={styles.fileName}>Manter arquivo atual.</p>}
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={closeModal} disabled={isSubmitting}>Cancelar</button>
                <button type="submit" className={styles.saveButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando...' : 'Salvar Comprovante'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Excluir */}
      {isDeleteModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer} style={{ maxWidth: '400px' }}>
            <div className={styles.modalHeader}>
              <h2>Excluir Transparência</h2>
              <button className={styles.closeButton} onClick={closeDeleteModal} disabled={isSubmitting}>
                <X size={24} />
              </button>
            </div>
            <p style={{ margin: '1rem 0' }}>Tem certeza que deseja excluir este relatório? Esta ação não pode ser desfeita.</p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelButton} onClick={closeDeleteModal} disabled={isSubmitting}>Cancelar</button>
              <button type="button" className={`${styles.saveButton} ${styles.dangerButton}`} onClick={handleDelete} disabled={isSubmitting}>
                {isSubmitting ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
