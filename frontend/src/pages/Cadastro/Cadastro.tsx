import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast'; // Importando o Toast
import styles from './Cadastro.module.css';

export function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false); // Novo estado de carregamento

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasUpperCase && hasNumber && hasSpecialChar;
  };

  const handleSubmit = async (e: FormEvent) => { // Função agora é assíncrona (async)
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome completo é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (!validatePassword(formData.senha)) {
      newErrors.senha = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial';
    }

    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Início da Integração com Backend
    setIsLoading(true);
    const toastId = toast.loading('Criando sua conta...');

    try {
      const response = await fetch('http://localhost:8000/api/cadastro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Mapeando os nomes do frontend para o que o Django espera
          nome_completo: formData.nome,
          email: formData.email,
          password: formData.senha,
          confirmacao_senha: formData.confirmarSenha
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Pega a primeira mensagem de erro retornada pelo Django
        const errorValues = Object.values(data).flat();
        const errorMessage = errorValues.length > 0 ? errorValues[0] : 'Erro ao realizar cadastro.';
        throw new Error(errorMessage as string);
      }

      // Sucesso!
      toast.success('Conta criada com sucesso!', { id: toastId });
      
      // Redireciona o usuário para a tela de login
      navigate('/login');

    } catch (error: any) {
      // Falha (Ex: e-mail já existe)
      toast.error(error.message || 'Erro de conexão com o servidor.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpar o erro ao digitar
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
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
            <h1 className={styles.title}>Criar Conta</h1>
            <p className={styles.subtitle}>
              Preencha os dados abaixo para se tornar um voluntário e ajudar na nossa causa.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="nome" className={styles.label}>Nome Completo</label>
              <div className={styles.inputWrapper}>
                <User size={20} className={styles.inputIcon} />
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.nome ? styles.inputError : ''}`}
                  placeholder="Digite seu nome completo"
                  disabled={isLoading}
                />
              </div>
              {errors.nome && (
                <span className={styles.errorMessage}>
                  <AlertCircle size={16} /> {errors.nome}
                </span>
              )}
            </div>

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
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  placeholder="seu@email.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <span className={styles.errorMessage}>
                  <AlertCircle size={16} /> {errors.email}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="senha" className={styles.label}>Senha</label>
              <div className={styles.inputWrapper}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.senha ? styles.inputError : ''}`}
                  placeholder="Crie uma senha forte"
                  disabled={isLoading}
                />
              </div>
              <span className={styles.helperText}>
                A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.
              </span>
              {errors.senha && (
                <span className={styles.errorMessage}>
                  <AlertCircle size={16} /> {errors.senha}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmarSenha" className={styles.label}>Confirme sua Senha</label>
              <div className={styles.inputWrapper}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.confirmarSenha ? styles.inputError : ''}`}
                  placeholder="Repita a sua senha"
                  disabled={isLoading}
                />
              </div>
              {errors.confirmarSenha && (
                <span className={styles.errorMessage}>
                  <AlertCircle size={16} /> {errors.confirmarSenha}
                </span>
              )}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </button>
          </form>

          <p className={styles.loginRedirect}>
            Já tem uma conta? <Link to="/login">Faça login aqui</Link>
          </p>
        </div>
      </div>
    </main>
  );
}