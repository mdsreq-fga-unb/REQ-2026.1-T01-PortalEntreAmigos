import { TransparencyCard } from '../../components/TransparencyCard/TransparencyCard';
import { transparencyReportsMock } from '../../services/mocks';
import styles from './Transparencia.module.css';

export function Transparencia() {
  // TODO: Em breve substituiremos este mock por uma chamada de API
  const mockReports = transparencyReportsMock;

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
          />
        ))}
      </section>
    </main>
  );
}
