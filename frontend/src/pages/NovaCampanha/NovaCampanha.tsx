import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Calendar, MapPin, Target, FileText, Type } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { Modal } from '../../components/Modal/Modal';
import { eventoService, itemDoacaoService } from '../../services/api';
import styles from './NovaCampanha.module.css';

const itemSchema = z.object({
  nome: z.string(),
  tipo: z.enum(['alimento', 'objeto']),
  quantidade: z.number(),
});

type Item = z.infer<typeof itemSchema>;

const campanhaSchema = z.object({
  titulo: z.string().min(1, 'O título é obrigatório.'),
  descricao: z.string().min(1, 'A descrição é obrigatória.'),
  dataInicio: z.string().min(1, 'Data de início é obrigatória.'),
  dataTermino: z.string().min(1, 'Data de término é obrigatória.'),
  local: z.string().min(1, 'O local é obrigatório.'),
  itens: z.array(itemSchema).min(1, 'Adicione pelo menos um item à campanha.'),
}).refine((data) => {
  if (data.dataInicio && data.dataTermino) {
    return new Date(data.dataInicio) <= new Date(data.dataTermino);
  }
  return true;
}, {
  message: 'A data de término deve ser após a data de início.',
  path: ['dataTermino'],
});

type CampanhaFormData = z.infer<typeof campanhaSchema>;

export function NovaCampanha() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CampanhaFormData>({
    resolver: zodResolver(campanhaSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      dataInicio: '',
      dataTermino: '',
      local: '',
      itens: [],
    }
  });

  const watchItens = watch('itens');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(1);
  const [currentItem, setCurrentItem] = useState({
    nome: '',
    tipo: 'alimento' as 'alimento' | 'objeto',
    quantidade: '' as number | string
  });

  // Proteção básica
  if (!isAdmin) {
    return (
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCard}>
            <h2>Acesso Restrito</h2>
            <p>Você precisa ser administrador para criar uma nova campanha.</p>
            <Link to="/" className={styles.primaryButton}>Voltar para Início</Link>
          </div>
        </div>
      </main>
    );
  }

   const onSubmit = async (data: CampanhaFormData) => {
    setIsSubmitting(true);
    try {
      // Cria o evento
      const evento = await eventoService.criar({
        nome: data.titulo,
        descricao: data.descricao,
        data_inicio: data.dataInicio,
        data_fim: data.dataTermino,
        local: data.local,
        capacidade_voluntarios: 0,
        status: 'EM_ANDAMENTO',
      });

      // Cria cada item de doação vinculado ao evento
      await Promise.all(
        data.itens.map(item =>
          itemDoacaoService.criar({
            evento: evento.id,
            nome: item.nome,
            meta_item: Number(item.quantidade),
          })
        )
      );

      toast.success('Campanha criada com sucesso!');
      setTimeout(() => navigate('/gerenciar-campanhas'), 2000);

    } catch {
      toast.error('Erro ao criar campanha. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddItem = (closeModal: boolean) => {
    if (currentItem.nome && currentItem.quantidade) {
      const newItem: Item = {
        nome: currentItem.nome,
        tipo: currentItem.tipo,
        quantidade: Number(currentItem.quantidade)
      };
      setValue('itens', [...watchItens, newItem], { shouldValidate: true });
      
      if (closeModal) {
        setIsModalOpen(false);
      } else {
        setCurrentItemIndex(currentItemIndex + 1);
        setCurrentItem({ nome: '', tipo: 'alimento', quantidade: '' });
      }
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Link to="/gerenciar-campanhas" className={styles.backLink}>
          <ArrowLeft size={20} />
          Voltar para o Painel
        </Link>
        
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Criar Nova Campanha</h1>
            <p className={styles.subtitle}>
              Preencha os dados abaixo para publicar uma nova iniciativa de arrecadação.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Título */}
            <div className={styles.inputGroup}>
              <label htmlFor="titulo" className={styles.label}>Título da Campanha</label>
              <div className={styles.inputWrapper}>
                <Type size={20} className={styles.inputIcon} />
                <input
                  type="text"
                  id="titulo"
                  {...register('titulo')}
                  className={`${styles.input} ${errors.titulo ? styles.inputError : ''}`}
                  placeholder="Ex: Campanha de Inverno 2026"
                />
              </div>
              {errors.titulo && <span className={styles.errorMessage}><AlertCircle size={16} />{errors.titulo.message}</span>}
            </div>

            {/* Descrição */}
            <div className={styles.inputGroup}>
              <label htmlFor="descricao" className={styles.label}>Descrição</label>
              <div className={styles.inputWrapper}>
                <FileText size={20} className={styles.inputIcon} style={{ top: '1rem', position: 'absolute' }} />
                <textarea
                  id="descricao"
                  {...register('descricao')}
                  rows={4}
                  className={`${styles.textarea} ${errors.descricao ? styles.inputError : ''}`}
                  placeholder="Explique o propósito da campanha..."
                />
              </div>
              {errors.descricao && <span className={styles.errorMessage}><AlertCircle size={16} />{errors.descricao.message}</span>}
            </div>

            {/* Datas */}
            <div className={styles.rowGroup}>
              <div className={styles.inputGroup}>
                <label htmlFor="dataInicio" className={styles.label}>Data de Início</label>
                <div className={styles.inputWrapper}>
                  <Calendar size={20} className={styles.inputIcon} />
                  <input
                    type="date"
                    id="dataInicio"
                    {...register('dataInicio')}
                    className={`${styles.input} ${errors.dataInicio ? styles.inputError : ''}`}
                  />
                </div>
                {errors.dataInicio && <span className={styles.errorMessage}><AlertCircle size={16} />{errors.dataInicio.message}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="dataTermino" className={styles.label}>Data de Término</label>
                <div className={styles.inputWrapper}>
                  <Calendar size={20} className={styles.inputIcon} />
                  <input
                    type="date"
                    id="dataTermino"
                    {...register('dataTermino')}
                    className={`${styles.input} ${errors.dataTermino ? styles.inputError : ''}`}
                  />
                </div>
                {errors.dataTermino && <span className={styles.errorMessage}><AlertCircle size={16} />{errors.dataTermino.message}</span>}
              </div>
            </div>

            {/* Local */}
            <div className={styles.inputGroup}>
              <label htmlFor="local" className={styles.label}>Local de Arrecadação / Ponto de Coleta</label>
              <div className={styles.inputWrapper}>
                <MapPin size={20} className={styles.inputIcon} />
                <input
                  type="text"
                  id="local"
                  {...register('local')}
                  className={`${styles.input} ${errors.local ? styles.inputError : ''}`}
                  placeholder="Ex: Sede da ONG - Brasília, DF"
                />
              </div>
              {errors.local && <span className={styles.errorMessage}><AlertCircle size={16} />{errors.local.message}</span>}
            </div>

            {/* Itens */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Itens Necessários</label>
              <button 
                type="button" 
                className={styles.secondaryButton}
                onClick={() => {
                  setIsModalOpen(true);
                  setCurrentItemIndex(watchItens.length + 1);
                  setCurrentItem({ nome: '', tipo: 'alimento', quantidade: '' });
                }}
              >
                <Target size={20} />
                Cadastrar Itens
              </button>
              
              {watchItens.length > 0 && (
                <div className={styles.itemList}>
                  {watchItens.map((item, index) => (
                    <div key={index} className={styles.itemCard}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{item.nome}</span>
                        <span className={styles.itemDetail}>
                          {item.quantidade} {item.tipo === 'alimento' ? 'kg' : 'unidades'} • {item.tipo === 'alimento' ? 'Alimento' : 'Objeto'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {errors.itens && <span className={styles.errorMessage}><AlertCircle size={16} />{errors.itens.message}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>
              Publicar Campanha
            </button>
          </form>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={`Adicionando ${currentItemIndex}° item`}
      >
        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nome</label>
            <input
              type="text"
              className={styles.input}
              style={{ paddingLeft: '1rem' }}
              value={currentItem.nome}
              onChange={(e) => setCurrentItem({ ...currentItem, nome: e.target.value })}
              placeholder="Ex: Arroz, Cobertor..."
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Tipo</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="tipoItem"
                  className={styles.radioInput}
                  checked={currentItem.tipo === 'alimento'}
                  onChange={() => setCurrentItem({ ...currentItem, tipo: 'alimento' })}
                />
                Alimento
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="tipoItem"
                  className={styles.radioInput}
                  checked={currentItem.tipo === 'objeto'}
                  onChange={() => setCurrentItem({ ...currentItem, tipo: 'objeto' })}
                />
                Objeto
              </label>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Quantidade ({currentItem.tipo === 'alimento' ? 'kg' : 'unidades'})
            </label>
            <input
              type="number"
              min="1"
              className={styles.input}
              style={{ paddingLeft: '1rem' }}
              value={currentItem.quantidade}
              onChange={(e) => setCurrentItem({ ...currentItem, quantidade: e.target.value })}
              placeholder="Ex: 10"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className={styles.outlineButton}
              onClick={() => handleAddItem(false)}
            >
              Adicionar Próximo Item
            </button>
            <button
              type="button"
              className={styles.primaryModalButton}
              style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              onClick={() => handleAddItem(true)}
            >
              Concluir
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
