import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, LogIn, LogOut, User as UserIcon, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './MinhaConta.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { Modal } from '../../components/Modal/Modal';

export function MinhaConta() {
  const { user, isAdmin, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // Local state for regular user modals
  const [modalType, setModalType] = useState<'none' | 'view' | 'edit' | 'delete'>('none');
  
  // Local state to simulate edited user data
  const [userData, setUserData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
  });
  const [deletePassword, setDeletePassword] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveEdit = () => {
    // Call the context update
    updateUser(userData);
    setModalType('none');
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleDeleteAccount = () => {
    // In a real app, this would verify the password and delete the user API
    if (deletePassword === 'user123') { // Hardcoded to match the mock
      setModalType('none');
      logout();
      navigate('/');
      toast.success('Conta excluída com sucesso.');
    } else {
      toast.error('Senha incorreta.');
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
        <div className={styles.content}>
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
          <div className={styles.modalActions}>
            <button className={styles.cancelButton} onClick={() => setModalType('none')}>Fechar</button>
          </div>
        </Modal>

        {/* Edit Modal Content */}
        <Modal 
          isOpen={modalType === 'edit'} 
          onClose={() => setModalType('none')}
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
          <div className={styles.modalActions}>
            <button className={styles.cancelButton} onClick={() => setModalType('none')}>Cancelar</button>
            <button className={styles.saveButton} onClick={handleSaveEdit}>Salvar</button>
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
