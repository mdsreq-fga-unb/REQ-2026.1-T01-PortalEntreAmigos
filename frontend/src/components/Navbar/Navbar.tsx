import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img 
              src="/src/assets/logo.png" 
              alt="Ação Entre Amigos BSB" 
              className={styles.logoImage} 
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>INÍCIO</Link>
          </li>
          <li>
            <Link to="/sobre" onClick={() => setIsOpen(false)}>QUEM SOMOS</Link>
          </li>
          <li>
            <Link to="/campanhas" onClick={() => setIsOpen(false)}>CAMPANHA</Link>
          </li>
          <li>
            <Link to="/transparencia" onClick={() => setIsOpen(false)}>TRANSPARÊNCIA</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link to="/minha-conta" className={styles.accountLink} onClick={() => setIsOpen(false)}>
              MINHA CONTA <FiUser size={20} />
            </Link>
          </li>
          <li className={styles.mobileOnly}>
            {isAdmin ? (
              <Link to="/gerenciar-campanhas" className={styles.actionButton} onClick={() => setIsOpen(false)}>GERENCIAR CAMPANHAS</Link>
            ) : (
              <Link to="/doar" className={styles.actionButton} onClick={() => setIsOpen(false)}>DOAR</Link>
            )}
          </li>
        </ul>

        {/* Action Button (Desktop) */}
        <div className={styles.desktopActions}>
          <Link to="/minha-conta" className={styles.accountLink}>
            MINHA CONTA <FiUser size={20} />
          </Link>
          {isAdmin ? (
            <Link to="/gerenciar-campanhas" className={styles.actionButton}>GERENCIAR CAMPANHAS</Link>
          ) : (
            <Link to="/doar" className={styles.actionButton}>DOAR</Link>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          className={styles.hamburger} 
          onClick={toggleMenu}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
    </header>
  );
}
