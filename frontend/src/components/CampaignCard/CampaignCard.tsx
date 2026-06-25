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
  const visualProgress = Math.min(progress, 100);
  const barClass = progressColor === 'primary' ? styles.barPrimary : styles.barSecondary;

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
          ) : (
            <Link to={`/campanha-encerrada/${id}`} className={`${styles.button} ${styles.btnSecondary}`} style={{ textAlign: 'center', textDecoration: 'none' }}>
              VISUALIZAR CAMPANHA
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}