import { FiFileText, FiDownload } from 'react-icons/fi';
import styles from './TransparencyCard.module.css';

interface TransparencyCardProps {
  title: string;
  subtitle: string;
  fileUrl?: string; // Futuro link para o comprovante
}

export function TransparencyCard({ title, subtitle, fileUrl }: TransparencyCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <FiFileText size={24} className={styles.icon} />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      
      <button className={styles.actionButton} title="Visualizar comprovante">
        <FiDownload size={18} />
        <span>VISUALIZAR</span>
      </button>
    </div>
  );
}
