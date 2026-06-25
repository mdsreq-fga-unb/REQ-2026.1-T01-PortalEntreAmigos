import React from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  alignment?: 'center' | 'left';
  minHeight?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  alignment = 'center',
  minHeight = '250px',
  children
}: PageHeaderProps) {
  return (
    <section className={styles.headerContainer} style={{ minHeight }}>
      <div className={styles.overlay}>
        <div className={`${styles.content} ${alignment === 'left' ? styles.alignLeft : styles.alignCenter}`}>
          {badge && <span className={styles.badge}>{badge}</span>}
          
          {title && <h1 className={styles.title}>{title}</h1>}
          
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          
          {children && <div className={styles.extraContent}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
