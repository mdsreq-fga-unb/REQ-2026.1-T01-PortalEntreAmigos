import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link to="/" onClick={() => setIsOpen(false)}>Início</Link>
          </li>
          <li>
            <Link to="/sobre" onClick={() => setIsOpen(false)}>Sobre Nós</Link>
          </li>
          <li>
            <Link to="/campanhas" onClick={() => setIsOpen(false)}>Campanhas</Link>
          </li>
          <li>
            <Link to="/transparencia" onClick={() => setIsOpen(false)}>Transparência</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link to="/doar" className={styles.actionButton} onClick={() => setIsOpen(false)}>Doar</Link>
          </li>
        </ul>

        {/* Action Button (Desktop) */}
        <div className={styles.desktopAction}>
          <Link to="/doar" className={styles.actionButton}>Doar</Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          className={styles.hamburger} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
    </header>
  );
}
