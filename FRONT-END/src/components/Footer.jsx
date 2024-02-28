import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <>
      <footer>
        <div className="logoContainer">LOGO</div>
        <div className="categoriesContainer">
          <h4>ALL CATEGORIES</h4>
          <ul>
            <il>Limpieza</il>
            <il>Mascotas</il>
            <il>Personas</il>
            <il>Recados</il>
            <il>Transporte</il>
            <il>Reparaciones</il>
            <il>Cuidado</il>
            <il>Compra</il>
            <il>Electrónica</il>
            <il>Mecánica</il>
            <il>Eventos</il>
            <il>Otros</il>
          </ul>
        </div>
        <div className="aboutContainer">
          <h4>ABOUT</h4>
          <ul>
            <Link to="/about">
              <il>About Us</il>
            </Link>
            <il>FAQS</il>
            <il>Contact Us</il>
            <il>Condiciones de Uso</il>
            <il>Politica de Privacidad</il>
          </ul>
        </div>
        <div className="socialContainer">
          <h4>FOLLOW US</h4>
          <img
            src="https://res.cloudinary.com/deck6wgqf/image/upload/v1709109754/social-media_qss3qc.png"
            alt="Twitter Icon"
            className="twitterIcon"
          />
          <img
            src="https://res.cloudinary.com/deck6wgqf/image/upload/v1709109754/facebook_bepjjp.png"
            alt="Facebook Icon"
            className="facebookIcon"
          />
          <img
            src="https://res.cloudinary.com/deck6wgqf/image/upload/v1709109753/linkedin_ddog2u.png"
            alt="LinkedIn Icon"
            className="linkedinIcon"
          />
        </div>
      </footer>
    </>
  );
};
