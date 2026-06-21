import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, ArrowLeft, Phone, Fingerprint } from 'lucide-react';
import toast from 'react-hot-toast'; // Importando o Toast
import styles from './Cadastro.module.css';

export function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
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

  const handleSubmit = async (e: FormEvent) => { // Função agora é assíncrona (async)
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome completo é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    
    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!validateTelefone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido (deve conter DDD)';
    }

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
          nome_completo: formData.nome,
          email: formData.email,
          password: formData.senha,
          confirmacao_senha: formData.confirmarSenha,
          cpf: formData.cpf.replace(/\D/g, ''),
          telefone: formData.telefone.replace(/\D/g, '')
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorValues = Object.values(data).flat();
        const errorMessage = errorValues.length > 0 ? errorValues[0] : 'Erro ao realizar cadastro.';
        throw new Error(errorMessage as string);
      }

      toast.success('Conta criada com sucesso!', { id: toastId });
      navigate('/login');

    } catch (error: any) {
      toast.error(error.message || 'Erro de conexão com o servidor.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === 'cpf') {
      value = formatCPF(value);
    } else if (e.target.name === 'telefone') {
      value = formatTelefone(value);
    }

    setFormData({ ...formData, [e.target.name]: value });
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
              <label htmlFor="cpf" className={styles.label}>CPF</label>
              <div className={styles.inputWrapper}>
                <Fingerprint size={20} className={styles.inputIcon} />
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.cpf ? styles.inputError : ''}`}
                  placeholder="000.000.000-00"
                  disabled={isLoading}
                />
              </div>
              {errors.cpf && (
                <span className={styles.errorMessage}>
                  <AlertCircle size={16} /> {errors.cpf}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="telefone" className={styles.label}>Telefone</label>
              <div className={styles.inputWrapper}>
                <Phone size={20} className={styles.inputIcon} />
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.telefone ? styles.inputError : ''}`}
                  placeholder="(00) 00000-0000"
                  disabled={isLoading}
                />
              </div>
              {errors.telefone && (
                <span className={styles.errorMessage}>
                  <AlertCircle size={16} /> {errors.telefone}
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