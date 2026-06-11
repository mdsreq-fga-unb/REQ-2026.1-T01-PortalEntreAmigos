import { FiFileText, FiDownload, FiPlus } from 'react-icons/fi';
import styles from './TransparencyCard.module.css';

interface TransparencyCardProps {
  title: string;
  subtitle: string;
  fileUrl?: string; // Futuro link para o comprovante
  isAdmin?: boolean;
  onAddClick?: () => void;
}

export function TransparencyCard({ title, subtitle, fileUrl, isAdmin, onAddClick }: TransparencyCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <FiFileText size={24} className={styles.icon} />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      
      <div className={styles.actionsContainer}>
        {isAdmin && (
          <button className={`${styles.actionButton} ${styles.addButton}`} onClick={onAddClick} title="Adicionar arquivo PDF">
            <FiPlus size={18} />
            <span>ADICIONAR</span>
          </button>
        )}
        <button className={styles.actionButton} title="Visualizar comprovante">
          <FiDownload size={18} />
          <span>VISUALIZAR</span>
        </button>
      </div>
    </div>
  );
}
