import { FiMapPin } from 'react-icons/fi';
import styles from './CollectionPoint.module.css';

export function CollectionPoint() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <FiMapPin size={24} color="white" />
        </div>
        <div>
          <h2 className={styles.title}>Ponto de Arrecadação</h2>
          <p className={styles.hours}>Seg a Sex, 9h-18h, Sáb 9h-13h</p>
        </div>
      </div>
      
      <p className={styles.address}>
        SCS Quadra 7, Bloco A, Sala 312 — Brasília/DF, CEP 70.300-911
      </p>

      {/* Mock Map Image */}
      <div className={styles.mapContainer}>
        {/* Placeholder styling for map */}
        <div className={styles.mapMock}>
          <svg viewBox="0 0 400 150" className={styles.mapSvg}>
            <path d="M0,75 Q100,50 200,75 T400,75" fill="none" stroke="#333" strokeWidth="2"/>
            <circle cx="200" cy="75" r="15" fill="var(--color-primary)" />
            <circle cx="200" cy="75" r="6" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}
