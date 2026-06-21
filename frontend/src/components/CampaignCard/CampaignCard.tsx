import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { eventoService } from '../../services/api';
import styles from './CampaignCard.module.css';

interface CampaignCardProps {
  id: number | string;
  image: string;
  progress: number;
  progressColor?: 'primary' | 'secondary';
  endDate: string;
  title: string;
  description: string;
  isActive: boolean;
}

export function CampaignCard({
  id,
  image,
  progress,
  progressColor = 'primary',
  endDate,
  title,
  description,
  isActive
}: CampaignCardProps) {
  const { isAdmin } = useAuth();
  const [isExporting, setIsExporting] = useState(false);

  // Cap progress at 100% for the visual bar width
  const visualProgress = Math.min(progress, 100);
  const barClass = progressColor === 'primary' ? styles.barPrimary : styles.barSecondary;

  const handleExportarPDF = async () => {
  try {
    setIsExporting(true);
    const blob = await eventoService.exportarRelatorioPDF(id);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `doacoes_${title}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    let mensagem = 'Erro ao gerar relatório em PDF.';
    if (error.response?.data instanceof Blob) {
      try {
        const texto = await error.response.data.text();
        mensagem = JSON.parse(texto).detail || mensagem;
      } catch {
      }
    }
    toast.error(mensagem);
  } finally {
    setIsExporting(false);
  }
};

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.progressContainer}>
          <div className={styles.progressBarWrapper}>
            <div
              className={`${styles.progressBar} ${barClass}`}
              style={{ width: `${visualProgress}%` }}
            >
              <span className={styles.progressText}>{progress}%</span>
            </div>
          </div>
        </div>
        <p className={styles.endDate}>Até {endDate}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          {isActive ? (
            <>
              <Link to="/doar" className={`${styles.button} ${styles.btnPrimary}`} style={{ textAlign: 'center', textDecoration: 'none' }}>DOAR</Link>
              <button className={`${styles.button} ${styles.btnSecondary}`}>COMPARTILHAR</button>
            </>
          ) : isAdmin ? (
            <button
              className={`${styles.button} ${styles.btnSecondary}`}
              onClick={handleExportarPDF}
              disabled={isExporting}
            >
              {isExporting ? 'EXPORTANDO...' : 'EXPORTAR RELATÓRIO'}
            </button>
          ) : (
            <button className={`${styles.button} ${styles.btnSecondary}`}>COMPROVANTE</button>
          )}
        </div>
      </div>
    </div>
  );
}