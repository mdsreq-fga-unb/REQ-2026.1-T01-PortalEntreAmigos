import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './DonationProgress.module.css';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface DonationProgressProps {
  data: ChartData[];
  globalProgress: number;
}

export function DonationProgress({ data, globalProgress }: DonationProgressProps) {
  return (
    <div className={styles.card}>
      <div className={styles.headerButtons}>
        {/* DOAR removed as requested */}
        <button className={`${styles.button} ${styles.btnSecondary}`}>COMPARTILHAR</button>
      </div>

      <h3 className={styles.title}>Distribuição das Doações</h3>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              stroke="#000"
              strokeWidth={1.5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        {data.map((item, index) => (
          <div key={index} className={styles.legendItem}>
            <div 
              className={styles.legendColor} 
              style={{ backgroundColor: item.color }} 
            />
            <span className={styles.legendName}>{item.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.globalProgressContainer}>
        <h3 className={styles.globalTitle}>Progresso<br/>Global</h3>
        
        {/* Simple SVG Circular Progress */}
        <div className={styles.circularProgress}>
          <svg viewBox="0 0 100 100">
            <circle
              className={styles.circleBg}
              cx="50" cy="50" r="40"
            />
            <circle
              className={styles.circleValue}
              cx="50" cy="50" r="40"
              strokeDasharray="251.2" /* 2 * PI * 40 */
              strokeDashoffset={251.2 - (251.2 * globalProgress) / 100}
            />
          </svg>
          <div className={styles.progressTextValue}>{globalProgress}%</div>
        </div>
      </div>
    </div>
  );
}
