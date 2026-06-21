import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignCard } from '../../components/CampaignCard/CampaignCard';
import { eventoService } from '../../services/api';
import toast from 'react-hot-toast';
import styles from './Campanhas.module.css';
import bannerImg from '../../assets/donation_banner.png'

export function Campanhas() {
  const [campanhasAtivas, setCampanhasAtivas] = useState<any[]>([]);
  const [campanhasEncerradas, setCampanhasEncerradas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    eventoService.listar()
      .then(data => {
        setCampanhasAtivas(data.filter((e: any) => e.status === 'EM_ANDAMENTO'));
        setCampanhasEncerradas(data.filter((e: any) => e.status === 'CONCLUIDO' || e.status === 'CANCELADO'));
      })
      .catch((err) => {
    console.error('Erro:', err) 
    toast.error('Erro ao carregar campanhas')
     })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Campanhas</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ativa</h2>
        <div className={styles.campaignWrapper}>
          {campanhasAtivas.length === 0 ? (
            <p>Nenhuma campanha ativa no momento.</p>
          ) : (
            campanhasAtivas.map(campanha => (
              <div key={campanha.id} onClick={() => navigate(`/doar/${campanha.id}`)} style={{ cursor: 'pointer' }}>
              <CampaignCard
                key={campanha.id}
                id={campanha.id}
                progress={campanha.progresso_geral}
                progressColor="primary"
                endDate={campanha.data_fim}
                title={campanha.nome}
                description={campanha.descricao}
                isActive={true}
                image={bannerImg}
              />
              </div>
            ))
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Encerradas</h2>
        <div className={styles.closedCampaignsGrid}>
          {campanhasEncerradas.length === 0 ? (
            <p>Nenhuma campanha encerrada.</p>
          ) : (
            campanhasEncerradas.map(campanha => (
              <CampaignCard
                key={campanha.id}
                id={campanha.id}
                progress={campanha.progresso_geral}
                progressColor="secondary"
                endDate={campanha.data_fim}
                title={campanha.nome}
                description={campanha.descricao}
                isActive={false}
                image={bannerImg}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}