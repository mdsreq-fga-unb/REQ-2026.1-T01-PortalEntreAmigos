import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import styles from './ConfirmacaoEmail.module.css';

type Status = 'loading' | 'success' | 'error';

export function ConfirmacaoEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [status, setStatus] = useState<Status>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  // Evita disparar a confirmação duas vezes (StrictMode roda o effect 2x em dev)
  const jaConfirmou = useRef(false);

  useEffect(() => {
    if (jaConfirmou.current) return;
    jaConfirmou.current = true;

    const confirmarEmail = async () => {
      if (!uid || !token) {
        setStatus('error');
        setErrorMessage('Link de confirmação inválido ou incompleto.');
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${API_URL}/ativar-conta/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid, token }),
        });

        if (!response.ok) {
          throw new Error('Este link já foi usado ou expirou.');
        }

        setStatus('success');
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'Não foi possível confirmar seu e-mail.');
      }
    };

    confirmarEmail();
  }, [uid, token]);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          {status === 'loading' && (
            <div className={styles.statusBlock}>
              <div className={`${styles.iconWrapper} ${styles.iconLoading}`}>
                <Loader2 size={40} className={styles.spinnerIcon} />
              </div>
              <h1 className={styles.title}>Confirmando seu e-mail</h1>
              <p className={styles.subtitle}>
                Aguarde um instante enquanto validamos seu cadastro.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className={styles.statusBlock}>
              <div className={`${styles.iconWrapper} ${styles.iconSuccess}`}>
                <CheckCircle2 size={40} />
              </div>
              <h1 className={styles.title}>E-mail confirmado!</h1>
              <p className={styles.subtitle}>
                Sua conta foi ativada com sucesso. Agora você já pode acessar
                a plataforma com seu e-mail e senha.
              </p>
              <button
                type="button"
                className={styles.submitButton}
                onClick={() => navigate('/login')}
              >
                Acessar Conta
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className={styles.statusBlock}>
              <div className={`${styles.iconWrapper} ${styles.iconError}`}>
                <XCircle size={40} />
              </div>
              <h1 className={styles.title}>Não foi possível confirmar</h1>
              <p className={styles.subtitle}>{errorMessage}</p>
              <Link to="/login" className={styles.secondaryLink}>
                Voltar para o login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}