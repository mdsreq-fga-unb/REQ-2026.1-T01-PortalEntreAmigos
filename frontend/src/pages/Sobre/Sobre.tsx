import { FileText, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import todosImg from '../../assets/todos_sobre.png';
import missaoImg from '../../assets/desenho_sobre.png';
import visaoImg from '../../assets/coelho_sobre.png';
import valoresImg from '../../assets/touro_sobre.png';
import styles from './Sobre.module.css';

const timelineEvents = [
  { year: '2013', title: 'Descoberta da comunidade', description: 'Durante uma ronda de entrega de sopa, o grupo conheceu uma comunidade em vulnerabilidade próxima ao Setor Militar Urbano (SMU).', dot: 'dotRed' },
  { year: 'Final de 2013', title: 'Primeira ação de Natal', description: 'Uma grande festa de Natal foi realizada para as famílias da comunidade, marcando o início de um trabalho contínuo.', dot: 'dotOrange' },
  { year: 'Crescimento', title: 'Novos voluntários', description: 'Amigos, familiares e parceiros passaram a apoiar as ações, ampliando o alcance dos projetos sociais.', dot: 'dotYellow' },
  { year: 'Formalização', title: 'Criação da ONG', description: 'O crescimento das demandas levou à formalização da Ação Entre Amigos como organização sem fins lucrativos.', dot: 'dotGreen' },
  { year: 'Hoje', title: 'Impacto contínuo', description: 'A ONG segue promovendo ações sociais, mantendo seus princípios de solidariedade, respeito e independência.', dot: 'dotBlue' },
];

const mvv = [
  {
    title: 'Missão',
    text: 'Promover ações sociais que levem apoio, dignidade e esperança a pessoas e famílias em situação de vulnerabilidade, mobilizando voluntários e parceiros em torno da solidariedade e do compromisso com o próximo.',
    img: missaoImg,
    alt: 'Missão',
  },
  {
    title: 'Visão',
    text: 'Ampliar o impacto das ações solidárias, fortalecendo comunidades e inspirando cada vez mais pessoas a participarem da construção de uma sociedade mais justa, humana e acolhedora.',
    img: visaoImg,
    alt: 'Visão',
  },
  {
    title: 'Valores',
    text: 'Acreditamos na solidariedade como instrumento de transformação social. Nossas ações são guiadas pela empatia, pelo respeito ao próximo, pela transparência e pelo compromisso com as comunidades atendidas.',
    img: valoresImg,
    alt: 'Valores',
  },
];

export function Sobre() {
  return (
    <main className={styles.container}>
      <PageHeader
        title="Ação Entre Amigos BSB"
        subtitle="Quem Somos - Desde 2013, unimos pessoas, recursos e solidariedade para levar esperança a quem mais precisa."
      />

      {/* História */}
      <section className={styles.historiaSection}>
        <div className={styles.historiaText}>
          <h2>Nossa História</h2>
          <p>
            A Ação Entre Amigos nasceu em 2013 a partir de um gesto simples de solidariedade. Durante uma das
            rondas de entrega de sopa realizadas pelo grupo, foi identificada uma comunidade em situação de
            vulnerabilidade no coração de Brasília.
          </p>
          <p>
            O contato com as famílias daquela região despertou o desejo de fazer mais. O que começou com a
            distribuição de alimentos evoluiu para ações sociais permanentes, mobilizando voluntários, parceiros e
            doadores em torno de um propósito comum: transformar vidas por meio da solidariedade.
          </p>
        </div>
        <div className={styles.historiaImageWrapper}>
          <img src={todosImg} alt="Comunidade Ação Entre Amigos" className={styles.historiaImage} />
          <div className={styles.historiaOverlay}>
            <span>Conheça Nossa História</span>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timelineSection}>
        <h2 className={styles.timelineTitle}>Nossa Trajetória</h2>
        <div className={styles.timelineList}>
          {timelineEvents.map((event, i) => (
            <div key={i} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}>
              <div className={styles.timelineCard}>
                <span className={`${styles.timelineDot} ${styles[event.dot]}`} />
                <p className={styles.timelineYear}>{event.year}</p>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
          <div className={styles.timelineAxis} />
        </div>
      </section>

      {/* Missão Visão Valores */}
      <section className={styles.mvvSection}>
        <h2 className={styles.mvvTitle}>Missão, Visão e Valores</h2>
        <div className={styles.mvvGrid}>
          {mvv.map((item) => (
            <div key={item.title} className={styles.mvvCard}>
              <div className={styles.mvvImageWrapper}>
                <img src={item.img} alt={item.alt} className={styles.mvvImage} />
              </div>
              <div className={styles.mvvContent}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Números */}
      <section className={styles.numerosSection}>
        <div className={styles.numerosHeader}>
          <h2 className={styles.numerosTitle}>Nosso Impacto em Números</h2>
          <p className={styles.numerosSubtitle}>
            Ao longo de nossa trajetória, transformamos a solidariedade em ações concretas.
            Cada campanha realizada representa o esforço conjunto de voluntários, doadores e
            parceiros comprometidos em gerar mudanças positivas nas comunidades atendidas.
          </p>
        </div>
        <div className={styles.numerosGrid}>
          <div className={styles.numeroCard}>
            <span className={styles.numeroValor}>424</span>
            <span className={styles.numeroLabel}>Voluntários Cadastrados</span>
          </div>
          <div className={styles.numeroCard}>
            <span className={styles.numeroValor}>51</span>
            <span className={styles.numeroLabel}>Ações Realizadas</span>
          </div>
          <div className={styles.numeroCard}>
            <span className={styles.numeroValor}>R$242mil</span>
            <span className={styles.numeroLabel}>Em Doações Arrecadadas</span>
          </div>
          <div className={styles.numeroCard}>
            <span className={styles.numeroValor}>3.995</span>
            <span className={styles.numeroLabel}>Pessoas Assistidas</span>
          </div>
        </div>
      </section>

      {/* Transparência */}
      <section className={styles.transparenciaSection}>
        <div className={styles.transparenciaContent}>
          <h2>Sustentabilidade e Transparência</h2>
          <p>
            Acreditamos que a confiança é construída por meio da transparência. Por isso,
            buscamos divulgar de forma clara os recursos arrecadados, as despesas realizadas
            e os resultados alcançados em cada ação.
          </p>
          <p>
            Nosso compromisso é garantir que cada doação seja utilizada de maneira responsável,
            contribuindo diretamente para o desenvolvimento das atividades e para o atendimento
            das comunidades beneficiadas. Promovemos a prestação de contas periódica e o
            compartilhamento dos impactos gerados por nossas iniciativas.
          </p>
          <div className={styles.transparenciaCards}>
            <div className={styles.transparenciaCard}>
              <FileText size={32} className={styles.transparenciaCardIcon} />
              <strong>Prestação de Contas</strong>
              <p>Publicamos relatórios detalhados de receitas e despesas a cada ação realizada.</p>
            </div>
            <div className={styles.transparenciaCard}>
              <DollarSign size={32} className={styles.transparenciaCardIcon} />
              <strong>Gestão das Doações</strong>
              <p>Cada real recebido tem destino rastreável e comprovantes de gasto publicados.</p>
            </div>
            <div className={styles.transparenciaCard}>
              <Users size={32} className={styles.transparenciaCardIcon} />
              <strong>Impacto Social</strong>
              <p>Medimos e divulgamos o número de pessoas e comunidades beneficiadas em cada campanha.</p>
            </div>
          </div>
          <Link to="/transparencia" className={styles.transparenciaBtn}>
            Ver página de Transparência completa
          </Link>
        </div>
      </section>
    </main>
  );
}