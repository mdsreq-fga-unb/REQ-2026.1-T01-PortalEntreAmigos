import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, KeyRound, Lock, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './EsqueciSenha.module.css';
import { useAuth } from '../../contexts/AuthContext';

type Etapa = 'email' | 'codigo' | 'sucesso';

export function EsqueciSenha() {
  const navigate = useNavigate();
  const { esqueciSenha, redefinirSenha } = useAuth();

  const [etapa, setEtapa] = useState<Etapa>('email');
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSolicitarCodigo = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Por favor, informe seu e-mail.');
      return;
    }
    try {
      setIsLoading(true);
      await esqueciSenha(email.trim());
      setEtapa('codigo');
    } catch (err: any) {
      setError(err.message || 'Erro ao solicitar código.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedefinirSenha = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!codigo.trim() || !novaSenha || !confirmarSenha) {
      setError('Preencha todos os campos.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      setIsLoading(true);
      await redefinirSenha(email.trim(), codigo.trim(), novaSenha, confirmarSenha);
      setEtapa('sucesso');
    } catch (err: any) {
      setError(err.message || 'Erro ao redefinir senha.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <Link to="/login" className={styles.backLink}>
            <ArrowLeft size={20} />
            Voltar ao login
          </Link>

          {etapa === 'email' && (
            <>
              <div className={styles.header}>
                <div className={styles.iconWrapper}>
                  <Mail size={32} />
                </div>
                <h1 className={styles.title}>Esqueceu a senha?</h1>
                <p className={styles.subtitle}>
                  Informe o e-mail cadastrado na sua conta. Enviaremos um código de 5 dígitos para você criar uma nova senha.
                </p>
              </div>

              {error && (
                <div className={styles.errorBox}>
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSolicitarCodigo} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email-recuperacao" className={styles.label}>E-mail cadastrado</label>
                  <div className={styles.inputWrapper}>
                    <Mail size={20} className={styles.inputIcon} />
                    <input
                      id="email-recuperacao"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      className={`${styles.input} ${error ? styles.inputError : ''}`}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  {isLoading ? 'Enviando...' : 'Enviar código'}
                </button>
              </form>
            </>
          )}

          {etapa === 'codigo' && (
            <>
              <div className={styles.header}>
                <div className={styles.iconWrapper}>
                  <KeyRound size={32} />
                </div>
                <h1 className={styles.title}>Verifique seu e-mail</h1>
                <p className={styles.subtitle}>
                  Enviamos um código de 5 dígitos para <strong>{email}</strong>. Insira-o abaixo junto com sua nova senha.
                </p>
                <p className={styles.resendHint}>
                  Não recebeu?{' '}
                  <button
                    className={styles.resendBtn}
                    onClick={() => { setEtapa('email'); setError(''); setCodigo(''); setNovaSenha(''); setConfirmarSenha(''); }}
                  >
                    Tentar novamente
                  </button>
                </p>
              </div>

              {error && (
                <div className={styles.errorBox}>
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRedefinirSenha} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="codigo-verificacao" className={styles.label}>Código de verificação</label>
                  <div className={styles.inputWrapper}>
                    <KeyRound size={20} className={styles.inputIcon} />
                    <input
                      id="codigo-verificacao"
                      type="text"
                      value={codigo}
                      onChange={(e) => { setCodigo(e.target.value.replace(/\D/g, '').slice(0, 5)); setError(''); }}
                      className={`${styles.input} ${styles.codigoInput} ${error ? styles.inputError : ''}`}
                      placeholder="12345"
                      maxLength={5}
                    />
                  </div>
                </div>

                <div className={styles.divider}><span>Nova senha</span></div>

                <div className={styles.inputGroup}>
                  <label htmlFor="nova-senha" className={styles.label}>Nova senha</label>
                  <div className={styles.inputWrapper}>
                    <Lock size={20} className={styles.inputIcon} />
                    <input
                      id="nova-senha"
                      type="password"
                      value={novaSenha}
                      onChange={(e) => { setNovaSenha(e.target.value); setError(''); }}
                      className={`${styles.input} ${error ? styles.inputError : ''}`}
                      placeholder="Mín. 8 caracteres, maiúscula, número e especial"
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="confirmar-senha" className={styles.label}>Confirmar nova senha</label>
                  <div className={styles.inputWrapper}>
                    <Lock size={20} className={styles.inputIcon} />
                    <input
                      id="confirmar-senha"
                      type="password"
                      value={confirmarSenha}
                      onChange={(e) => { setConfirmarSenha(e.target.value); setError(''); }}
                      className={`${styles.input} ${error ? styles.inputError : ''}`}
                      placeholder="Repita a nova senha"
                    />
                  </div>
                </div>

                <ul className={styles.passwordRules}>
                  <li className={novaSenha.length >= 8 ? styles.ruleOk : ''}>Mínimo 8 caracteres</li>
                  <li className={/[A-Z]/.test(novaSenha) ? styles.ruleOk : ''}>Uma letra maiúscula</li>
                  <li className={/\d/.test(novaSenha) ? styles.ruleOk : ''}>Um número</li>
                  <li className={/[!@#$%^&*(),.?":{}|<>]/.test(novaSenha) ? styles.ruleOk : ''}>Um caractere especial</li>
                </ul>

                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  {isLoading ? 'Redefinindo...' : 'Redefinir senha'}
                </button>
              </form>
            </>
          )}

          {etapa === 'sucesso' && (
            <div className={styles.successState}>
              <div className={`${styles.iconWrapper} ${styles.iconSuccess}`}>
                <CheckCircle2 size={40} />
              </div>
              <h1 className={styles.title}>Senha redefinida!</h1>
              <p className={styles.subtitle}>
                Sua senha foi atualizada com sucesso. Você já pode acessar sua conta com a nova senha.
              </p>
              <button
                className={styles.submitButton}
                onClick={() => navigate('/login')}
              >
                Ir para o login
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
