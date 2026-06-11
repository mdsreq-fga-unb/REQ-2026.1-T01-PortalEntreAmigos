import { useState } from 'react';
import { TransparencyCard } from '../../components/TransparencyCard/TransparencyCard';
import { transparencyReportsMock } from '../../services/mocks';
import { useAuth } from '../../contexts/AuthContext';
import { X, UploadCloud } from 'lucide-react';
import styles from './Transparencia.module.css';

export function Transparencia() {
  const { isAdmin } = useAuth();
  const mockReports = transparencyReportsMock;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const openAddModal = (reportId: string) => {
    setSelectedReportId(reportId);
    setIsModalOpen(true);
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
    setSelectedReportId(null);
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação do upload do PDF
    console.log(`Fazendo upload do PDF para o relatório: ${selectedReportId}`);
    closeAddModal();
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>TRANSPARÊNCIA</h1>
        <p className={styles.subtitle}>
          Cada real doado é registrado e comprovado. Veja abaixo<br/>
          as notas fiscais e relatórios das campanhas.
        </p>
      </header>

      <section className={styles.grid}>
        {mockReports.map((report) => (
          <TransparencyCard
            key={report.id}
            title={report.title}
            subtitle={report.subtitle}
            isAdmin={isAdmin}
            onAddClick={() => openAddModal(report.id)}
          />
        ))}
      </section>

      {/* Modal para Adicionar PDF (Apenas para Moderador) */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h2>Adicionar Comprovante</h2>
              <button className={styles.closeButton} onClick={closeAddModal}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleFileUpload} className={styles.form}>
              <div className={styles.uploadArea}>
                <UploadCloud size={48} className={styles.uploadIcon} />
                <p>Arraste e solte o arquivo PDF aqui</p>
                <span className={styles.uploadSubtext}>ou clique para procurar no seu computador</span>
                <input type="file" accept="application/pdf" className={styles.fileInput} required />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={closeAddModal}>Cancelar</button>
                <button type="submit" className={styles.saveButton}>Salvar Comprovante</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
