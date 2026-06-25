import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { eventoService, itemDoacaoService } from '../../services/api';
import styles from './CampanhaEncerrada.module.css';
import toast from 'react-hot-toast';

export function CampanhaEncerrada() {
  const { id } = useParams();
  const [campanha, setCampanha] = useState<any>(null);
  const [itens, setItens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const carregarDados = async () => {
      try {
        const eventoData = await eventoService.obterPorId(id);
        const itensData = await itemDoacaoService.listarPorEvento(id);
        
        setCampanha(eventoData);
        setItens(itensData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Não foi possível carregar as informações da campanha.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  if (loading) {
    return <div className={styles.container}><p>Carregando informações da campanha...</p></div>;
  }

  if (!campanha) {
    return (
      <div className={styles.container}>
        <div className={styles.errorCard}>
          <h2>Campanha não encontrada</h2>
          <p>Esta campanha não existe mais ou foi removida do sistema.</p>
          <Link to="/campanhas" className={styles.primaryButton}>
            Voltar para Campanhas
          </Link>
        </div>
      </div>
    );
  }

  const chartData = itens.map(item => ({
    name: item.nome,
    'Promessas de Doação': item.quantidade_prometida || 0,
    'Doações Confirmadas': item.quantidade_recebida || 0,
  }));

  return (
    <main className={styles.container}>
      <div className={styles.topBar}>
        <Link to="/campanhas" className={styles.backLink}>
          <ChevronLeft size={20} />
          Voltar para Campanhas
        </Link>
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>{campanha.nome}</h1>
        <p className={styles.description}>{campanha.descricao}</p>
        
        <h2 className={styles.sectionTitle}>Arrecadação</h2>
        {itens.length > 0 ? (
          <ul>
            {itens.map((item: any) => (
              <li key={item.id} style={{ marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                <strong>{item.nome}</strong>: {item.quantidade_recebida} / {item.meta_quantidade} {item.unidade_medida} confirmados.
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum item registrado nesta campanha.</p>
        )}

        {itens.length > 0 && (
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Legend />
                <Bar dataKey="Promessas de Doação" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Doações Confirmadas" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </main>
  );
}
