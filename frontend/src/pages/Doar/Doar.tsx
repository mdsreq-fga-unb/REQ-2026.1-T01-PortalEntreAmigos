import { PageHeader } from '../../components/PageHeader/PageHeader';
import { DonationSelector } from './components/DonationSelector/DonationSelector';
import { DonationProgress } from './components/DonationProgress/DonationProgress';
import { CollectionPoint } from './components/CollectionPoint/CollectionPoint';
import { donationItemsMock, donationChartDataMock, globalProgressMock } from '../../services/mocks';

import bannerImg from '../../assets/donation_banner.png';
import styles from './Doar.module.css';

export function Doar() {
  // TODO: Em breve substituiremos estes mocks por uma chamada de API
  const donationItems = donationItemsMock;
  const chartData = donationChartDataMock;

  return (
    <main className={styles.container}>
      <PageHeader 
        image={bannerImg} 
        title="Arrecadação de alimentos" 
        showNavArrows={true}
      />

      <div className={styles.contentWrapper}>
        <div className={styles.descriptionCard}>
          <h2 className={styles.descriptionTitle}>Sobre a Ação</h2>
          <p className={styles.descriptionText}>
            AQUI ESTA A DESCRIÇÃO DO EVENTO URRU adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.leftColumn}>
            <DonationSelector items={donationItems} />
            <div className={styles.spacer} />
            <CollectionPoint />
          </div>

          <div className={styles.rightColumn}>
            <DonationProgress data={chartData} globalProgress={globalProgressMock} />
          </div>
        </div>
      </div>
    </main>
  );
}
