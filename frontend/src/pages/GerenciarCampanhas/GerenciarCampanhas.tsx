import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Settings, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { eventoService } from '../../services/api';
import toast from 'react-hot-toast';
import styles from './GerenciarCampanhas.module.css';

export function GerenciarCampanhas() {
  const { user, isAdmin } = useAuth();
  const [campanhaAtivaId, setCampanhaAtivaId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) return;
    eventoService.listar()
      .then(data => {
        const ativa = data.find((e: any) => e.status === 'EM_ANDAMENTO');
        if (ativa) setCampanhaAtivaId(ativa.id);
      })
      .catch(() => toast.error('Erro ao buscar campanha ativa'));
  }, [isAdmin]);

  const handleGerenciar = () => {
    if (!campanhaAtivaId) {
      toast.error('Nenhuma campanha ativa no momento.');
      return;
    }
    navigate(`/campanha-ativa/${campanhaAtivaId}`);
  };

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
          <Link to="/nova-campanha" className={styles.actionCard}>
            <div className={`${styles.iconWrapper} ${styles.iconCreate}`}>
              <PlusCircle size={36} />
            </div>
            <div className={styles.cardText}>
              <h3>Criar Nova Campanha</h3>
              <p>Inicie uma nova arrecadação definindo título, descrição, itens necessários e datas.</p>
            </div>
          </Link>

          {/* Agora é button em vez de Link, pois precisa do ID dinâmico */}
          <button onClick={handleGerenciar} className={styles.actionCard}>
            <div className={`${styles.iconWrapper} ${styles.iconManage}`}>
              <Settings size={36} />
            </div>
            <div className={styles.cardText}>
              <h3>Gerenciar Campanha Ativa</h3>
              <p>Edite as informações da campanha vigente, acompanhe o progresso das doações ou encerre.</p>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}