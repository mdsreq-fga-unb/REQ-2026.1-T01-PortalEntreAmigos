import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { doacaoService } from '../../../../services/api';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doador, setDoador] = useState({ nome: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIncrement = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const totalSelected = Object.values(quantities).reduce((a, b) => a + b, 0);

  const handleAbrirModal = () => {
    if (totalSelected === 0) {
      toast.error('Selecione ao menos um item para doar.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmarDoacao = async () => {
    if (!doador.nome || !doador.email) {
      toast.error('Preencha seu nome e e-mail.');
      return;
    }

    setIsSubmitting(true);
    try {
      const itensParaDoar = items.filter(item => quantities[item.id] > 0);

      await Promise.all(
        itensParaDoar.map(item =>
          doacaoService.registrar({
            item: Number(item.id),
            doador_nome: doador.nome,
            doador_email: doador.email,
            quantidade: quantities[item.id]
          })
        )
      );

      toast.success('Doação registrada com sucesso! Obrigado ❤️');
      setIsModalOpen(false);
      // Zera as quantidades após doação
      setQuantities(items.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {}));
      setDoador({ nome: '', email: '' });

    } catch {
      toast.error('Erro ao registrar doação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Sobre a Ação</h2>
      <p className={styles.subtitle}>Selecione quanto você quer doar</p>

      <div className={styles.list}>
        {items.map(item => (
          <div key={item.id} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <div className={styles.itemHeader}>
                <div className={styles.colorDot} style={{ backgroundColor: item.color }} />
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

      <button className={styles.donateBtn} onClick={handleAbrirModal}>
        DOAR ITENS SELECIONADOS ({totalSelected})
      </button>

      {/* Modal de confirmação */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'white', borderRadius: '12px', padding: '2rem',
            width: '100%', maxWidth: '420px', position: 'relative'
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ marginBottom: '0.5rem' }}>Confirmar Doação</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Preencha seus dados para registrar a doação.
            </p>

            {/* Resumo dos itens */}
            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
              {items.filter(item => quantities[item.id] > 0).map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>{item.name}</span>
                  <strong>{quantities[item.id]} un.</strong>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Nome</label>
              <input
                type="text"
                value={doador.nome}
                onChange={e => setDoador(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Seu nome completo"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>E-mail</label>
              <input
                type="email"
                value={doador.email}
                onChange={e => setDoador(prev => ({ ...prev, email: e.target.value }))}
                placeholder="seu@email.com"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarDoacao}
                disabled={isSubmitting}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}
              >
                {isSubmitting ? 'Enviando...' : 'Confirmar Doação'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}