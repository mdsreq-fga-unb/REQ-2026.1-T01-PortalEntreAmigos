import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Users, Package, TrendingUp } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import bannerImg from '../../assets/donation_banner.png';
import styles from './Home.module.css';

export function Home() {
  return (
    <main className={styles.container}>
      <PageHeader 
        image={bannerImg}
        title="Campanha de Inverno Solidário"
        subtitle="Ajude-nos a aquecer famílias neste inverno. Estamos arrecadando roupas de frio, cobertores e alimentos não perecíveis."
        badge="Campanha Ativa"
        alignment="left"
        minHeight="500px"
      >
        <Link to="/doar" className={styles.donateButton}>
          <Heart size={20} className={styles.heartIcon} />
          Quero Doar Agora
        </Link>
      </PageHeader>

      {/* Introdução sobre a ONG */}
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

      {/* Seção de Funcionalidades/Valores (Cards Empilhados) */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <Users size={32} />
            </div>
            <h3 className={styles.featureTitle}>Conectamos pessoas</h3>
            <p className={styles.featureText}>
              Aproximamos doadores de famílias que realmente precisam, criando uma rede de apoio baseada na solidariedade.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <Package size={32} />
            </div>
            <h3 className={styles.featureTitle}>Criamos campanhas</h3>
            <p className={styles.featureText}>
              Planejamos e divulgamos campanhas de arrecadação para atender necessidades específicas com organização e eficiência.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <TrendingUp size={32} />
            </div>
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
