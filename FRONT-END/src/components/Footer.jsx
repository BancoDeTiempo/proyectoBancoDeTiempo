import './Footer.css';

import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <footer className="footerContainer">
        <div className="logoContainer"></div>
        <div className="categoriesContainer">
          <h4>ALL CATEGORIES</h4>
          <ul>
            <li>Limpieza</li>
            <li>Mascotas</li>
            <li>Personas</li>
            <li>Recados</li>
            <li>Transporte</li>
            <li>Reparaciones</li>
            <li>Cuidado</li>
            <li>Compra</li>
            <li>Electrónica</li>
            <li>Mecánica</li>
            <li>Eventos</li>
            <li>Otros</li>
          </ul>
        </div>
        <div className="aboutContainer">
          <h4>ABOUT</h4>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>FAQS</li>
            <li>Contact Us</li>
            <li>Condiciones de Uso</li>
            <li>Politica de Privacidad</li>
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
