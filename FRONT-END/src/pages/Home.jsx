import { Gallery } from '../components';
import './Home.css';

export const Home = () => {
  return (
    <>
      <div id="homeContainter">
        <Gallery />
        <figure id="exchangeServices">
          {/**<img />*/}
          <h3>Intercambio de servicios</h3>
          <p>
            En esta app no existe la moneda. Haz un servicio a otra persona y este te
            devolverá el favor. Abre el chat y acuerda los detalles de tu compromiso con
            otro usuario
          </p>
        </figure>
        <figure id="nearYou">
          {/**<img />*/}
          <h3>Cerca de ti</h3>
          <p>
            ¡Tus vecinos son tu mejor aliado! Escoge tu zona y mira los servicios que se
            ofrecen. Seguro que hay uno que se ajusta a tus necesidades
          </p>
        </figure>
        <figure id="you">
          {/**<img />*/}
          <h3>Date a conocer</h3>
          <p>
            Seas novato, jubilado, profesional, manitas o empresario, tienes mucho que
            ofrecer. DARUMA te ayuda a darte a conocer y compartir tus talentos, y
            ¡conocer los de otros!
          </p>
        </figure>
        <figure id="you">
          {/**<img />*/}
          <h3>¡Expórtate!</h3>
          <p>
            “Sin trabajo por falta de experiencia… y sin experiencia por falta de
            trabajo?” En DARUMA hagas lo que hagas, todos tus servicios serán reconocidos
            y contabilizados. Podrás exportarlos a tu perfil profesional de LinkedIn o
            utilizarlos para engrosar tu portfolio.
          </p>
        </figure>
        <h3>Algunas de las ciudades en las que estamos</h3>
        <ul>
          <li>Madrid</li>
          <li>Barcelona</li>
          <li>Ciudad Real</li>
          <li>Guadalajara</li>
          <li>Sevilla</li>
        </ul>
      </div>
    </>
  );
};
