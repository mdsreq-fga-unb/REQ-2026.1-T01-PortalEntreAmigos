import { CampaignCard } from '../../components/CampaignCard/CampaignCard';
import { activeCampaignMock, closedCampaignsMock } from '../../services/mocks';
import styles from './Campanhas.module.css';

export function Campanhas() {
  // TODO: Em breve substituiremos estes mocks por uma chamada de API (React Query ou useEffect)
  const activeCampaign = activeCampaignMock;
  const closedCampaigns = closedCampaignsMock;

  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Campanhas</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ativa</h2>
        <div className={styles.campaignWrapper}>
          <CampaignCard
            image={activeCampaign.image}
            progress={activeCampaign.progress}
            progressColor="primary"
            endDate={activeCampaign.endDate}
            title={activeCampaign.title}
            description={activeCampaign.description}
            isActive={true}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Encerradas</h2>
        <div className={styles.closedCampaignsGrid}>
          {closedCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              image={campaign.image}
              progress={campaign.progress}
              progressColor="secondary"
              endDate={campaign.endDate}
              title={campaign.title}
              description={campaign.description}
              isActive={false}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
