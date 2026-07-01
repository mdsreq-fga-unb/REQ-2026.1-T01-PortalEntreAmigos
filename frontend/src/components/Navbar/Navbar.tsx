import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { eventoService } from '../../services/api';
import logoImg from '../../assets/logo.png';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [campanhaAtivaId, setCampanhaAtivaId] = useState<number | null>(null);

  useEffect(() => {
    eventoService.listar()
      .then(data => {
        const ativa = data.find((e: any) => e.status === 'EM_ANDAMENTO');
        if (ativa) setCampanhaAtivaId(ativa.id);
      })
      .catch(() => {}); 
  }, []);

  const handleDoar = () => {
    if (campanhaAtivaId) {
      navigate(`/doar/${campanhaAtivaId}`);
    } else {
      navigate('/campanhas'); // fallback se não tiver campanha ativa
    }
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src={logoImg} alt="Ação Entre Amigos BSB" className={styles.logoImage} />
          </Link>
        </div>

        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>INÍCIO</Link></li>
          <li><Link to="/sobre" onClick={() => setIsOpen(false)}>QUEM SOMOS</Link></li>
          <li><Link to="/campanhas" onClick={() => setIsOpen(false)}>CAMPANHA</Link></li>
          <li><Link to="/transparencia" onClick={() => setIsOpen(false)}>TRANSPARÊNCIA</Link></li>
          <li className={styles.mobileOnly}>
            <Link to="/minha-conta" className={styles.accountLink} onClick={() => setIsOpen(false)}>
              MINHA CONTA <FiUser size={20} />
            </Link>
          </li>
          <li className={styles.mobileOnly}>
            {isAdmin ? (
              <Link to="/gerenciar-campanhas" className={styles.actionButton} onClick={() => setIsOpen(false)}>
                GERENCIAR CAMPANHAS
              </Link>
            ) : (
              <button className={styles.actionButton} onClick={handleDoar}>  {/* button em vez de Link */}
                DOAR
              </button>
            )}
          </li>
        </ul>

        <div className={styles.desktopActions}>
          <Link to="/minha-conta" className={styles.accountLink}>
            MINHA CONTA <FiUser size={20} />
          </Link>
          {isAdmin ? (
            <Link to="/gerenciar-campanhas" className={styles.actionButton}>GERENCIAR CAMPANHAS</Link>
          ) : (
            <button className={styles.actionButton} onClick={handleDoar}>  {/* button em vez de Link */}
              DOAR
            </button>
          )}
        </div>

        <button className={styles.hamburger} onClick={toggleMenu} aria-label={isOpen ? "Fechar menu" : "Abrir menu"}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
    </header>
  );
}