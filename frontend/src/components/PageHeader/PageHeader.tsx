import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  alignment?: 'center' | 'left';
  showNavArrows?: boolean;
  minHeight?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  image,
  title,
  subtitle,
  badge,
  alignment = 'center',
  showNavArrows = false,
  minHeight = '400px',
  children
}: PageHeaderProps) {
  return (
    <section className={styles.headerContainer} style={{ minHeight }}>
      <div 
        className={styles.backgroundImage} 
        style={{ backgroundImage: `url(${image})` }}
      />
      
      <div className={styles.overlay}>
        {showNavArrows && (
          <button className={styles.navButton} aria-label="Anterior">
            <FiChevronLeft size={40} />
          </button>
        )}

        <div className={`${styles.content} ${alignment === 'left' ? styles.alignLeft : styles.alignCenter}`}>
          {badge && <span className={styles.badge}>{badge}</span>}
          
          <h1 className={styles.title}>{title}</h1>
          
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          
          {children && <div className={styles.extraContent}>{children}</div>}
        </div>

        {showNavArrows && (
          <button className={styles.navButton} aria-label="Próximo">
            <FiChevronRight size={40} />
          </button>
        )}
      </div>
    </section>
  );
}
