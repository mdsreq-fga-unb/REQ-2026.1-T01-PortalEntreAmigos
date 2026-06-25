import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, AlertCircle, ArrowLeft, Info, X } from 'lucide-react';
import styles from './Login.module.css';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailTip, setShowEmailTip] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setIsLoading(true);
      await login(formData.email, formData.senha);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'E-mail, CPF ou senha incorretos.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <Link to="/minha-conta" className={styles.backLink}>
            <ArrowLeft size={20} />
            Voltar
          </Link>
          
          <div className={styles.header}>
            <h1 className={styles.title}>Acessar Conta</h1>
            <p className={styles.subtitle}>
              Bem-vindo de volta! Insira suas credenciais para continuar.
            </p>
          </div>

          {error && (
            <div className={styles.globalError}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="email" className={styles.label}>E-mail ou CPF</label>
                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={() => setShowEmailTip(true)}
                >
                  Esqueci o e-mail
                </button>
              </div>
              <div className={styles.inputWrapper}>
                <User size={20} className={styles.inputIcon} />
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  placeholder="seu@email.com ou 000.000.000-00"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="senha" className={styles.label}>Senha</label>
                <Link to="/esqueci-senha" className={styles.forgotLink}>
                  Esqueci a senha
                </Link>
              </div>
              <div className={styles.inputWrapper}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  placeholder="Sua senha"
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className={styles.registerRedirect}>
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
          </p>
        </div>
      </div>

      {/* Modal: Esqueci o e-mail */}
      {showEmailTip && (
        <div className={styles.modalOverlay} onClick={() => setShowEmailTip(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowEmailTip(false)}>
              <X size={20} />
            </button>
            <div className={styles.modalIcon}>
              <Info size={28} />
            </div>
            <h2 className={styles.modalTitle}>Esqueceu o e-mail?</h2>
            <p className={styles.modalText}>
              Se você não lembra do e-mail cadastrado, você pode acessar sua conta usando o seu <strong>CPF</strong> e sua senha no campo acima.
            </p>
            <p className={styles.modalText}>
              Uma vez logado, acesse <strong>Minha Conta → Visualizar Perfil</strong> para consultar o e-mail vinculado à sua conta.
            </p>
            <button className={styles.modalButton} onClick={() => setShowEmailTip(false)}>
              Entendi
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
