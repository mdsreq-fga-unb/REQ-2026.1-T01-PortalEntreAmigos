import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, LogIn, LogOut, User as UserIcon, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './MinhaConta.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { Modal } from '../../components/Modal/Modal';
import { doacaoService, contaService } from '../../services/api';

export function MinhaConta() {
  const { user, isAdmin, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // Local state for regular user modals
  const [modalType, setModalType] = useState<'none' | 'view' | 'edit' | 'delete'>('none');
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  
  // Local state to simulate edited user data
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
  });
  const [editPassword, setEditPassword] = useState('');
  const [editNovaSenha, setEditNovaSenha] = useState('');
  const [editConfirmarSenha, setEditConfirmarSenha] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cleanCPF.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
  };

  const validateTelefone = (telefone: string) => {
    const cleanTelefone = telefone.replace(/\D/g, '');
    return cleanTelefone.length === 10 || cleanTelefone.length === 11;
  };

  const formatCPF = (value: string) => {
    const clean = value.replace(/\D/g, '');
    return clean
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);
  };

  const formatTelefone = (value: string) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 10) {
      return clean
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
        .substring(0, 14);
    }
    return clean
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
      .substring(0, 15);
  };

  // Promises state
  const [promessas, setPromessas] = useState<any[]>([]);
  const [loadingPromessas, setLoadingPromessas] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        nome: user.nome || '',
        email: user.email || '',
        cpf: formatCPF(user.cpf || ''),
        telefone: formatTelefone(user.telefone || ''),
      });

      // Se não for admin, carregar as promessas de doação dele
      if (!isAdmin) {
        fetchPromessas();
      }
    }
  }, [user, isAdmin]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const fetchPromessas = async () => {
    setLoadingPromessas(true);
    try {
      const data = await doacaoService.listarMinhas();
      setPromessas(data);
    } catch (err) {
      console.error('Erro ao carregar promessas:', err);
    } finally {
      setLoadingPromessas(false);
    }
  };

  const handleCancelPromise = async (id: number) => {
    if (window.confirm("Deseja realmente cancelar esta promessa de doação?")) {
      try {
        await doacaoService.deletar(id);
        toast.success("Promessa de doação cancelada com sucesso!");
        fetchPromessas();
      } catch (err) {
        toast.error("Erro ao cancelar promessa.");
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!userData.nome.trim()) {
      toast.error('Nome é obrigatório.');
      return;
    }
    if (!userData.email.trim()) {
      toast.error('E-mail é obrigatório.');
      return;
    }
    if (userData.cpf && !validateCPF(userData.cpf)) {
      toast.error('CPF inválido.');
      return;
    }
    if (userData.telefone && !validateTelefone(userData.telefone)) {
      toast.error('Telefone inválido (deve conter DDD).');
      return;
    }
    if (!editPassword.trim()) {
      toast.error('Digite sua senha atual para salvar as alterações.');
      return;
    }
    if (editNovaSenha && editNovaSenha !== editConfirmarSenha) {
      toast.error('A nova senha e a confirmação não coincidem.');
      return;
    }

    // Se o e-mail mudou, exibir popup de aviso antes de continuar
    const emailMudou = userData.email.trim().toLowerCase() !== (user?.email || '').toLowerCase();
    if (emailMudou) {
      setShowEmailWarning(true);
      return;
    }

    await executarSalvamento();
  };

  const executarSalvamento = async () => {
    try {
      const resultado = await updateUser({
        nome: userData.nome,
        email: userData.email,
        cpf: userData.cpf.replace(/\D/g, ''),
        telefone: userData.telefone.replace(/\D/g, ''),
        password: editPassword,
        ...(editNovaSenha ? { nova_senha: editNovaSenha } : {}),
      });

      if (resultado.email_alterado) {
        // E-mail foi alterado: conta inativada, forçar logout
        setModalType('none');
        setShowEmailWarning(false);
        toast.success('E-mail alterado! Verifique sua caixa de entrada para ativar o novo e-mail.');
        setTimeout(() => {
          logout();
          navigate('/login');
        }, 2500);
      } else {
        setModalType('none');
        setEditPassword('');
        setEditNovaSenha('');
        setEditConfirmarSenha('');
        toast.success('Perfil atualizado com sucesso!');
      }
    } catch (err: any) {
      setShowEmailWarning(false);
      toast.error(err.message || 'Erro ao atualizar perfil.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      toast.error('Digite sua senha para confirmar a exclusão.');
      return;
    }
    try {
      await contaService.excluir({ password: deletePassword });
      setModalType('none');
      logout();
      navigate('/');
      toast.success('Conta excluída com sucesso.');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || err.response?.data?.password || 'Senha incorreta ou erro ao excluir a conta.');
    }
  };

  if (user) {
    if (isAdmin) {
      return (
        <main className={styles.container}>
          <div className={styles.content}>
            <div className={styles.card}>
              <div className={styles.header}>
                <h1 className={styles.title}>Minha Conta</h1>
                <p className={styles.subtitle}>
                  Usuário administrador
                </p>
              </div>
              
              <div className={styles.actions}>
                <button 
                  onClick={handleLogout} 
                  className={`${styles.button} ${styles.primaryButton}`}
                  style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                >
                  <div className={styles.iconWrapper}>
                    <LogOut size={28} className={styles.icon} />
                  </div>
                  <div className={styles.buttonText}>
                    <strong>Deslogar</strong>
                    <span>Sair da sua conta</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }
    
    // Regular User View
    return (
      <main className={styles.container}>
        <div className={styles.grid}>
          {/* Menu / Perfil Card */}
          <div className={styles.card}>
            <div className={styles.header}>
              <h1 className={styles.title}>Minha Conta</h1>
              <p className={styles.subtitle}>
                Olá, {userData.nome}! O que você deseja fazer?
              </p>
            </div>
            <div className={styles.actions}>
              <button 
                onClick={() => setModalType('view')} 
                className={`${styles.button} ${styles.primaryButton}`}
                style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
              >
                <div className={styles.iconWrapper}>
                  <UserIcon size={28} className={styles.icon} />
                </div>
                <div className={styles.buttonText}>
                  <strong>Visualizar Perfil</strong>
                  <span>Veja seus dados cadastrados</span>
                </div>
              </button>

              <button 
                onClick={() => setModalType('edit')} 
                className={`${styles.button} ${styles.secondaryButton}`}
                style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
              >
                <div className={styles.iconWrapper}>
                  <Edit size={28} className={styles.icon} />
                </div>
                <div className={styles.buttonText}>
                  <strong>Editar Perfil</strong>
                  <span>Altere seus dados cadastrados</span>
                </div>
              </button>

              <button 
                onClick={() => { setModalType('delete'); setDeletePassword(''); }} 
                className={`${styles.button} ${styles.primaryButton}`}
                style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', borderColor: 'var(--color-danger)' }}
              >
                <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(229, 62, 62, 0.1)', color: 'var(--color-danger)' }}>
                  <Trash2 size={28} className={styles.icon} />
                </div>
                <div className={styles.buttonText}>
                  <strong>Excluir Perfil</strong>
                  <span>Exclua sua conta permanentemente</span>
                </div>
              </button>

              <button 
                onClick={handleLogout} 
                className={`${styles.button} ${styles.primaryButton}`}
                style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
              >
                <div className={styles.iconWrapper}>
                  <LogOut size={28} className={styles.icon} />
                </div>
                <div className={styles.buttonText}>
                  <strong>Deslogar</strong>
                  <span>Sair da sua conta</span>
                </div>
              </button>
            </div>
          </div>

          {/* Minhas Promessas Card */}
          <div className={styles.card}>
            <div className={styles.header}>
              <h2 className={styles.title} style={{ fontSize: '2rem' }}>Minhas Promessas</h2>
              <p className={styles.subtitle}>
                Acompanhe o status dos itens que você prometeu doar.
              </p>
            </div>
            
            <div className={styles.promisesList}>
              {loadingPromessas ? (
                <div className={styles.loading}>Carregando suas promessas...</div>
              ) : promessas.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Você ainda não fez nenhuma promessa de doação.</p>
                  <Link to="/" className={styles.browseLink}>
                    Ver campanhas ativas
                  </Link>
                </div>
              ) : (
                <>
                  <h3 style={{ marginTop: '0', marginBottom: '1rem', color: 'var(--color-text-main)', fontSize: '1.25rem' }}>Em Andamento</h3>
                  {promessas.filter(p => p.evento_status === 'EM_ANDAMENTO').length === 0 ? (
                    <p style={{ color: 'var(--color-text-muted)' }}>Nenhuma promessa em campanhas ativas.</p>
                  ) : (
                    promessas.filter(p => p.evento_status === 'EM_ANDAMENTO').map((promessa) => (
                      <div key={promessa.id} className={styles.promiseItem}>
                        <div className={styles.promiseDetails}>
                          <span className={styles.campaignName}>{promessa.evento_nome || 'Campanha'}</span>
                          <span className={styles.itemName}>
                            {promessa.item_nome} • <strong>{promessa.quantidade} u.</strong>
                          </span>
                          <span className={styles.promiseDate}>
                            Prometido em: {new Date(promessa.criado_em).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className={styles.promiseStatus}>
                          {promessa.status === 'RECEBIDA' ? (
                            <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                              ✓ Confirmada
                            </span>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span className={`${styles.badge} ${styles.badgeWarning}`}>
                                ⏳ Precisa cumprir
                              </span>
                              <button
                                onClick={() => handleCancelPromise(promessa.id)}
                                style={{ 
                                  background: 'transparent', 
                                  border: 'none', 
                                  color: '#ef4444', 
                                  cursor: 'pointer', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  padding: '4px',
                                  borderRadius: '4px'
                                }}
                                title="Cancelar promessa"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}

                  {promessas.filter(p => p.evento_status !== 'EM_ANDAMENTO').length > 0 && (
                    <>
                      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--color-text-main)', fontSize: '1.25rem' }}>Histórico (Campanhas Encerradas)</h3>
                      {promessas.filter(p => p.evento_status !== 'EM_ANDAMENTO').map((promessa) => (
                        <div key={promessa.id} className={styles.promiseItem}>
                          <div className={styles.promiseDetails}>
                            <span className={styles.campaignName}>{promessa.evento_nome || 'Campanha'}</span>
                            <span className={styles.itemName}>
                              {promessa.item_nome} • <strong>{promessa.quantidade} u.</strong>
                            </span>
                            <span className={styles.promiseDate}>
                              Prometido em: {new Date(promessa.criado_em).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <div className={styles.promiseStatus}>
                            {promessa.status === 'RECEBIDA' ? (
                              <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                                ✓ Confirmada
                              </span>
                            ) : (
                              <span className={`${styles.badge} ${styles.badgeWarning}`}>
                                Não Confirmada
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* View Modal Content */}
        <Modal 
          isOpen={modalType === 'view'} 
          onClose={() => setModalType('none')}
          title="Visualizar Perfil"
        >
          <div className={styles.formGroup}>
            <label>Nome:</label>
            <div className={styles.input} style={{ backgroundColor: '#f7fafc', cursor: 'not-allowed' }}>{userData.nome}</div>
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <div className={styles.input} style={{ backgroundColor: '#f7fafc', cursor: 'not-allowed' }}>{userData.email}</div>
          </div>
          <div className={styles.formGroup}>
            <label>CPF:</label>
            <div className={styles.input} style={{ backgroundColor: '#f7fafc', cursor: 'not-allowed' }}>{userData.cpf || 'Não informado'}</div>
          </div>
          <div className={styles.formGroup}>
            <label>Telefone:</label>
            <div className={styles.input} style={{ backgroundColor: '#f7fafc', cursor: 'not-allowed' }}>{userData.telefone || 'Não informado'}</div>
          </div>
          <div className={styles.modalActions}>
            <button className={styles.cancelButton} onClick={() => setModalType('none')}>Fechar</button>
          </div>
        </Modal>

        {/* Edit Modal Content */}
        <Modal 
          isOpen={modalType === 'edit'} 
          onClose={() => { setModalType('none'); setEditPassword(''); }}
          title="Editar Perfil"
        >
          <div className={styles.formGroup}>
            <label>Nome</label>
            <input 
              type="text" 
              className={styles.input} 
              value={userData.nome}
              onChange={(e) => setUserData({...userData, nome: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input 
              type="email" 
              className={styles.input} 
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label>CPF</label>
            <input 
              type="text" 
              className={styles.input} 
              value={userData.cpf}
              onChange={(e) => setUserData({...userData, cpf: formatCPF(e.target.value)})}
              placeholder="000.000.000-00"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Telefone</label>
            <input 
              type="text" 
              className={styles.input} 
              value={userData.telefone}
              onChange={(e) => setUserData({...userData, telefone: formatTelefone(e.target.value)})}
              placeholder="(00) 00000-0000"
            />
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0.5rem 0' }} />
          <div className={styles.formGroup}>
            <label>Senha atual <span style={{ color: 'var(--color-danger)', fontWeight: 700 }}>*</span></label>
            <input 
              type="password" 
              className={styles.input} 
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              placeholder="Digite sua senha para confirmar"
            />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0.5rem 0' }} />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>Alterar senha (opcional)</p>
          <div className={styles.formGroup}>
            <label>Nova senha</label>
            <input 
              type="password" 
              className={styles.input} 
              value={editNovaSenha}
              onChange={(e) => setEditNovaSenha(e.target.value)}
              placeholder="Mín. 8 caracteres, maiúscula, número e especial"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirmar nova senha</label>
            <input 
              type="password" 
              className={styles.input} 
              value={editConfirmarSenha}
              onChange={(e) => setEditConfirmarSenha(e.target.value)}
              placeholder="Repita a nova senha"
            />
          </div>
          <div className={styles.modalActions}>
            <button className={styles.cancelButton} onClick={() => { setModalType('none'); setEditPassword(''); setEditNovaSenha(''); setEditConfirmarSenha(''); }}>Cancelar</button>
            <button className={styles.saveButton} onClick={handleSaveEdit}>Salvar</button>
          </div>
        </Modal>

        {/* Email Warning Modal */}
        <Modal
          isOpen={showEmailWarning}
          onClose={() => setShowEmailWarning(false)}
          title="Confirmar troca de e-mail"
        >
          <p style={{ color: 'var(--color-text-main)', margin: 0, lineHeight: 1.6 }}>
            Ao trocar seu e-mail, <strong>sua sessão será encerrada</strong> e o novo endereço precisará ser confirmado pela sua caixa de entrada antes de ter acesso à conta novamente.
          </p>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '0.75rem', fontSize: '0.95rem' }}>
            Um link de ativação será enviado para <strong>{userData.email}</strong>.
          </p>
          <div className={styles.modalActions}>
            <button className={styles.cancelButton} onClick={() => setShowEmailWarning(false)}>Cancelar</button>
            <button className={styles.saveButton} onClick={executarSalvamento}>Confirmar e Continuar</button>
          </div>
        </Modal>

        {/* Delete Modal Content */}
        <Modal 
          isOpen={modalType === 'delete'} 
          onClose={() => setModalType('none')}
          title="Excluir Conta"
        >
          <p style={{ color: 'var(--color-text-main)', margin: 0 }}>
            Tem certeza de que deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita.
          </p>
          <div className={styles.formGroup}>
            <label>Digite sua senha para confirmar:</label>
            <input 
              type="password" 
              className={styles.input} 
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Sua senha..."
            />
          </div>
          <div className={styles.modalActions}>
            <button className={styles.cancelButton} onClick={() => setModalType('none')}>Cancelar</button>
            <button className={styles.dangerButton} onClick={handleDeleteAccount}>Confirmar Exclusão</button>
          </div>
        </Modal>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Acesse sua conta</h1>
            <p className={styles.subtitle}>
              Escolha uma das opções abaixo para entrar ou criar uma nova conta na nossa plataforma.
            </p>
          </div>
          
          <div className={styles.actions}>
            <Link to="/login" className={`${styles.button} ${styles.primaryButton}`}>
              <div className={styles.iconWrapper}>
                <LogIn size={28} className={styles.icon} />
              </div>
              <div className={styles.buttonText}>
                <strong>Já sou cadastrado</strong>
                <span>Fazer login na minha conta</span>
              </div>
            </Link>

            <Link to="/cadastro" className={`${styles.button} ${styles.secondaryButton}`}>
              <div className={styles.iconWrapper}>
                <UserPlus size={28} className={styles.icon} />
              </div>
              <div className={styles.buttonText}>
                <strong>Quero me cadastrar</strong>
                <span>Criar uma nova conta agora</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

