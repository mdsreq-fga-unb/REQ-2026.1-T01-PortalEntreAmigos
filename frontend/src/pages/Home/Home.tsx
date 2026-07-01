import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Users, Package, TrendingUp } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { eventoService } from '../../services/api';
import styles from './Home.module.css';

export function Home() {
  const [campanhaAtiva, setCampanhaAtiva] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    eventoService.listar()
      .then(data => {
        const ativa = data.find((e: any) => e.status === 'EM_ANDAMENTO');
        if (ativa) setCampanhaAtiva(ativa);
      })
      .catch(() => {}); // silencia — a home não precisa mostrar erro
  }, []);

  const handleDoar = () => {
    if (campanhaAtiva) {
      navigate(`/doar/${campanhaAtiva.id}`);
    } else {
      navigate('/campanhas');
    }
  };

  // Se temos campanha, usamos os dados dela
  const titulo = campanhaAtiva ? campanhaAtiva.nome : 'Ação Entre Amigos BSB';
  const subtitulo = campanhaAtiva 
    ? campanhaAtiva.descricao 
    : 'Não existem campanhas em andamento no momento.';
  const badge = campanhaAtiva ? 'Campanha Ativa' : undefined;
  
  return (
    <main className={styles.container}>
      <PageHeader
        title={titulo}
        subtitle={subtitulo}
        badge={badge}
        alignment="center"
        minHeight="350px"
      >
        {campanhaAtiva && (
          <button onClick={handleDoar} className={styles.donateButton}>
            <Heart size={20} className={styles.heartIcon} />
            Quero Doar Agora
          </button>
        )}
      </PageHeader>

      {/* restante do JSX igual ao original */}
      <section className={styles.introSection}>
        <div className={styles.introContent}>
          <h2 className={styles.sectionTitle}>Bem-vindo à Ação Entre Amigos BSB</h2>
          <div className={styles.introText}>
            <p>
              Somos mais do que um grupo de voluntários, somos uma rede de amigos dedicada a levar esperança e suporte
              para aqueles que mais precisam no Distrito Federal. Nossa missão é transformar realidades através de
              ações conjuntas, oferecendo assistência social, apoio comunitário e muito carinho.
            </p>
            <p>
              Acreditamos que pequenas atitudes geram grandes impactos. Cada doação, cada minuto de voluntariado
              e cada palavra de conforto ajuda a construir um futuro melhor para centenas de famílias.
            </p>
          </div>
          <Link to="/sobre" className={styles.learnMoreLink}>
            Conheça mais sobre nossa história
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}><Users size={32} /></div>
            <h3 className={styles.featureTitle}>Conectamos pessoas</h3>
            <p className={styles.featureText}>
              Aproximamos doadores de famílias que realmente precisam, criando uma rede de apoio baseada na solidariedade.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}><Package size={32} /></div>
            <h3 className={styles.featureTitle}>Criamos campanhas</h3>
            <p className={styles.featureText}>
              Planejamos e divulgamos campanhas de arrecadação para atender necessidades específicas com organização e eficiência.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}><TrendingUp size={32} /></div>
            <h3 className={styles.featureTitle}>Transparência total</h3>
            <p className={styles.featureText}>
              Mostramos como cada doação é utilizada, garantindo confiança e clareza em todo o processo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}