import styles from './Footer.module.css';
import { FiFacebook, FiInstagram, FiPhone } from 'react-icons/fi';
import logoImg from '../../assets/logo.png'; // Assuming logo is available here, let's verify if logo.png exists

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Column 1: Logo and CNPJ */}
        <div className={styles.column}>
          <div className={styles.logoContainer}>
            <img src={logoImg} alt="Logo Ação Entre Amigos BSB" className={styles.logo} />
            <p className={styles.cnpj}>CNPJ: 25.234.425/0001-96</p>
          </div>
        </div>

        {/* Column 2: Endereço */}
        <div className={styles.column}>
          <h3 className={styles.title}>Endereço</h3>
          <p className={styles.text}>
            SHCES 1401 BLOCO C 304,<br />
            SHCES,<br />
            Brasília - DF,<br />
            70658-413
          </p>
        </div>

        {/* Column 3: Horário */}
        <div className={styles.column}>
          <h3 className={styles.title}>Horário de Funcionamento</h3>
          <p className={styles.text}>
            De Segunda à Sexta<br />
            Das 8:00 às 17:00
          </p>
        </div>

        {/* Column 4: Redes Sociais */}
        <div className={styles.column}>
          <h3 className={styles.title}>Nossas Redes Sociais</h3>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/acaoentreamigosbsb" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FiFacebook size={20} className={styles.icon} />
              <span>@acaoentreamigosbsb</span>
            </a>
            <a href="https://www.instagram.com/acaoentreamigosbsb" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FiInstagram size={20} className={styles.icon} />
              <span>@acaoentreamigosbsb</span>
            </a>
            <a href="https://wa.me/5561981200295" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FiPhone size={20} className={styles.icon} />
              <span>+55 (61) 98120 - 0295</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
