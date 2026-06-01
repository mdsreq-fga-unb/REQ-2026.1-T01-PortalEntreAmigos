import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
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
}

export function DonationSelector({ items }: DonationSelectorProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );

  const handleIncrement = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const totalSelected = Object.values(quantities).reduce((a, b) => a + b, 0);

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Sobre a Ação</h2>
      <p className={styles.subtitle}>Selecione quanto voce quer doar</p>

      <div className={styles.list}>
        {items.map(item => (
          <div key={item.id} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <div className={styles.itemHeader}>
                <div 
                  className={styles.colorDot} 
                  style={{ backgroundColor: item.color }} 
                />
                <span className={styles.itemName}>{item.name}</span>
              </div>
              <span className={styles.itemProgress}>
                {item.collected} / {item.goal} kg arrecadado
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

      <button className={styles.donateBtn}>
        DOAR ITENS SELECIONADOS ({totalSelected})
      </button>
    </div>
  );
}
