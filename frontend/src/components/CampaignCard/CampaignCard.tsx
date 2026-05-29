import { Link } from 'react-router-dom';
import styles from './CampaignCard.module.css';

interface CampaignCardProps {
  image: string;
  progress: number;
  progressColor?: 'primary' | 'secondary';
  endDate: string;
  title: string;
  description: string;
  isActive: boolean;
}

export function CampaignCard({
  image,
  progress,
  progressColor = 'primary',
  endDate,
  title,
  description,
  isActive
}: CampaignCardProps) {
  // Cap progress at 100% for the visual bar width
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
            <button className={`${styles.button} ${styles.btnSecondary}`}>COMPROVANTE</button>
          )}
        </div>
      </div>
    </div>
  );
}
