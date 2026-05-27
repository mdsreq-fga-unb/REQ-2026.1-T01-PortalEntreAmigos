import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

export function Home() {
  return (
    <main className={styles.container}>
      {/* Banner da Campanha Ativa */}
      <section className={styles.campaignBanner}>
        <div className={styles.bannerOverlay}>
          <div className={styles.bannerContent}>
            <span className={styles.badge}>Campanha Ativa</span>
            <h1 className={styles.bannerTitle}>Campanha de Inverno Solidário</h1>
            <p className={styles.bannerSubtitle}>
              Ajude-nos a aquecer famílias neste inverno. Estamos arrecadando roupas de frio, cobertores e alimentos não perecíveis.
            </p>
            <Link to="/doar" className={styles.donateButton}>
              <Heart size={20} className={styles.heartIcon} />
              Quero Doar Agora
            </Link>
          </div>
        </div>
      </section>

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
    </main>
  );
}
