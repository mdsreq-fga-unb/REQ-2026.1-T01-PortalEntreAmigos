import { Users, Heart, Target } from 'lucide-react';
import styles from './Sobre.module.css';

export function Sobre() {
  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Quem Somos</h1>
            <p className={styles.subtitle}>
              Unindo forças para transformar realidades e levar esperança onde mais se precisa.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.textBlock}>
          <h2>Nossa História</h2>
          <p>
            A <strong>Ação Entre Amigos BSB</strong> nasceu do desejo genuíno de um grupo de pessoas de fazer a diferença. 
            Nós acreditamos que a solidariedade é o motor capaz de gerar grandes transformações na sociedade. 
            Atuamos em diversas frentes, sempre focados em levar dignidade, alimento, educação e carinho para famílias 
            em situação de vulnerabilidade.
          </p>
          <p>
            Com o apoio de voluntários dedicados e parceiros essenciais, conseguimos expandir nosso alcance a cada ano, 
            provando que a união de amigos pode, de fato, mudar o mundo ao nosso redor.
          </p>
        </div>

        {/* Activities Grid */}
        <div className={styles.activitiesGrid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Heart size={32} />
            </div>
            <h3>Assistência Social</h3>
            <p>Distribuição de cestas básicas, roupas e itens de higiene para comunidades carentes da região.</p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Users size={32} />
            </div>
            <h3>Apoio Comunitário</h3>
            <p>Ações de escuta e acolhimento, criando uma rede de suporte emocional e psicológico.</p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Target size={32} />
            </div>
            <h3>Projetos Educativos</h3>
            <p>Iniciativas focadas em capacitação, oficinas e atividades lúdicas para crianças e jovens.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
