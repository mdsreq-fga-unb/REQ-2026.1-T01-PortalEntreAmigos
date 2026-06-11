import { Link } from 'react-router-dom';
import { PlusCircle, Settings, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './GerenciarCampanhas.module.css';

export function GerenciarCampanhas() {
  const { user, isAdmin } = useAuth();

  // Proteção básica de rota no frontend para demonstração
  if (!isAdmin) {
    return (
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCard}>
            <h2>Acesso Restrito</h2>
            <p>Você precisa estar logado como Administrador para visualizar o painel.</p>
            <Link to="/login" className={styles.primaryButton}>Ir para Login</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={20} />
          Voltar para Início
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>Painel Administrativo</h1>
          <p className={styles.subtitle}>
            Olá, <strong>{user?.nome}</strong>. O que você gostaria de gerenciar hoje?
          </p>
        </div>
        
        <div className={styles.grid}>
          {/* Card: Criar Nova Campanha */}
          <Link to="/nova-campanha" className={styles.actionCard}>
            <div className={`${styles.iconWrapper} ${styles.iconCreate}`}>
              <PlusCircle size={36} />
            </div>
            <div className={styles.cardText}>
              <h3>Criar Nova Campanha</h3>
              <p>Inicie uma nova arrecadação definindo título, descrição, itens necessários e datas.</p>
            </div>
          </Link>

          {/* Card: Gerenciar Campanha Ativa */}
          <Link to="/campanha-ativa" className={styles.actionCard}>
            <div className={`${styles.iconWrapper} ${styles.iconManage}`}>
              <Settings size={36} />
            </div>
            <div className={styles.cardText}>
              <h3>Gerenciar Campanha Ativa</h3>
              <p>Edite as informações da campanha vigente, acompanhe o progresso das doações ou encerre.</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
