import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
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
      navigate('/'); // Redireciona para home após sucesso
    } catch (err: any) {
      setError(err.message || 'E-mail ou senha incorretos.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpar o erro ao digitar
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
              <label htmlFor="email" className={styles.label}>E-mail</label>
              <div className={styles.inputWrapper}>
                <Mail size={20} className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="senha" className={styles.label}>Senha</label>
                {/* Opcional: link para recuperar senha futuramente */}
                {/* <Link to="/recuperar-senha" className={styles.forgotPassword}>Esqueceu a senha?</Link> */}
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
    </main>
  );
}
