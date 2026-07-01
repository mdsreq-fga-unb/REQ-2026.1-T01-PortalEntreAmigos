import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { DonationSelector } from './components/DonationSelector/DonationSelector';
import { DonationProgress } from './components/DonationProgress/DonationProgress';
import { CollectionPoint } from './components/CollectionPoint/CollectionPoint';
import { eventoService, itemDoacaoService } from '../../services/api';
import toast from 'react-hot-toast';
import styles from './Doar.module.css';

// Cores para cada item (expande conforme necessário)
const CORES = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export function Doar() {
  const { id } = useParams();
  const [evento, setEvento] = useState<any>(null);
  const [itens, setItens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarDados = useCallback(() => {
    if (!id) return;
    Promise.all([
      eventoService.buscar(id),
      itemDoacaoService.listarPorEvento(id)
    ])
      .then(([eventoData, itensData]) => {
        setEvento(eventoData);
        setItens(itensData);
      })
      .catch(() => toast.error('Erro ao carregar dados da campanha'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  if (loading) return <p>Carregando...</p>;
  if (!evento) return <p>Campanha não encontrada.</p>;

  // Converte os itens da API para o formato do DonationSelector
  const itensSeletor = itens.map((item, index) => ({
    id: String(item.id),
    name: item.nome,
    color: CORES[index % CORES.length],
    collected: item.quantidade_prometida,
    goal: item.meta_item,
  }));

  // Converte os itens para o gráfico de itens prometidos
  const dadosGraficoPromessas = itens.map((item, index) => ({
    name: item.nome,
    value: item.quantidade_prometida,
    color: CORES[index % CORES.length],
  }));

  return (
    <main className={styles.container}>
      <PageHeader
        title={evento.nome}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.descriptionCard}>
          <h2 className={styles.descriptionTitle}>Sobre a Ação</h2>
          <p className={styles.descriptionText}>{evento.descricao}</p>
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.leftColumn}>
            <DonationSelector
              items={itensSeletor}
              onPromessaFeita={carregarDados}
            />
            <div className={styles.spacer} />
            <CollectionPoint
              pontosColeta={evento.pontos_coleta ?? []}
              localTexto={evento.local}
            />

          </div>
          <div className={styles.rightColumn}>
            <DonationProgress
              data={dadosGraficoPromessas}
              globalProgress={evento.progresso_geral}
              title="Distribuição das Promessas"
              campaignName={evento.nome}
            />
          </div>
        </div>
      </div>
    </main>
  );
}