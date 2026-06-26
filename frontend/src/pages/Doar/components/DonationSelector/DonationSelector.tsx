import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { doacaoService } from '../../../../services/api';
import { useAuth } from '../../../../contexts/AuthContext';
import { Modal } from '../../../../components/Modal/Modal';
import styles from './DonationSelector.module.css';

export interface DonationItem {
  id: string;
  name: string;
  color: string;
  collected: number;
  goal: number;
}

interface DonationSelectorProps {
  items: DonationItem[];
  onPromessaFeita?: () => void; // callback para atualizar dados da página pai
}

export function DonationSelector({ items, onPromessaFeita }: DonationSelectorProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quantities, setQuantities] = useState<Record<string, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncrement = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const totalSelected = Object.values(quantities).reduce((a, b) => a + b, 0);

  const handleOpenModal = () => {
    if (!user) {
      toast.error('Você precisa estar logado para fazer uma promessa de doação.');
      navigate('/login');
      return;
    }

    if (totalSelected === 0) {
      toast.error('Selecione ao menos um item para prometer.');
      return;
    }

    setIsModalOpen(true);
  };

  const handlePrometear = async () => {

    setIsSubmitting(true);
    try {
      const itensParaDoar = items.filter(item => quantities[item.id] > 0);

      await Promise.all(
        itensParaDoar.map(item =>
          doacaoService.registrar({
            item: Number(item.id),
            quantidade: quantities[item.id],
          })
        )
      );

      toast.success('Promessa de doação registrada! Obrigado pelo compromisso ❤️');
      // Zera as quantidades após a promessa
      setQuantities(items.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {}));
      // Notifica a página pai para recarregar os dados do gráfico
      onPromessaFeita?.();

    } catch {
      toast.error('Erro ao registrar promessa de doação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Quero Ajudar</h2>
      <p className={styles.subtitle}>Selecione a quantidade que você pretende levar ao ponto de coleta</p>

      <div className={styles.list}>
        {items.map(item => (
          <div key={item.id} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <div className={styles.itemHeader}>
                <div className={styles.colorDot} style={{ backgroundColor: item.color }} />
                <span className={styles.itemName}>{item.name}</span>
              </div>
              <span className={styles.itemProgress}>
                {item.collected} / {item.goal} prometidos
              </span>
            </div>
            <div className={styles.counter}>
              <button
                className={styles.counterBtn}
                onClick={() => handleDecrement(item.id)}
                disabled={quantities[item.id] === 0}
                aria-label={`Diminuir quantidade de ${item.name}`}
              >
                <FiMinus size={16} />
              </button>
              <span className={styles.quantity}>{quantities[item.id]}</span>
              <button
                className={`${styles.counterBtn} ${styles.counterBtnPlus}`}
                onClick={() => handleIncrement(item.id)}
                aria-label={`Incrementar quantidade de ${item.name}`}
              >
                <FiPlus size={16} color="white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className={styles.donateBtn}
        onClick={handleOpenModal}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'REGISTRANDO...' : `PROMETER DOAR ITENS SELECIONADOS (${totalSelected})`}
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Confirmar Promessa"
      >
        <p style={{ color: 'var(--color-text-main)', marginBottom: '1rem' }}>
          Deseja realmente confirmar essa promessa de doação?
        </p>
        
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-main)', fontSize: '0.9rem' }}>Itens selecionados:</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.filter(item => quantities[item.id] > 0).map(item => (
              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', color: 'var(--color-text-muted)' }}>
                <span>{item.name}</span>
                <strong style={{ color: 'var(--color-primary)' }}>{quantities[item.id]} un.</strong>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => setIsModalOpen(false)}
            style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, color: 'var(--color-text-muted)' }}
          >
            Cancelar
          </button>
          <button 
            onClick={() => { setIsModalOpen(false); handlePrometear(); }}
            style={{ padding: '0.5rem 1rem', background: 'var(--color-primary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, color: 'white' }}
          >
            Confirmar Doação
          </button>
        </div>
      </Modal>
    </div>
  );
}