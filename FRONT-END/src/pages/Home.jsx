import './Home.css';

import { Gallery } from '../components';

export const Home = () => {
  return (
    <>
      <div id="homeContainter">
        <Gallery />
        <figure id="darumaStart">
          {/**<img />*/}
          <h3>Daruma</h3>
          <p>Daruma baby 😉</p>
        </figure>
        <figure id="exchangeServices">
          {/**<img />*/}
          <h3>Intercambio de servicios</h3>
          <p>
            En esta app no existe la moneda. Haz un servicio a otra persona y este te
            devolverá el favor 😁
          </p>
        </figure>
        <figure id="nearYou">
          {/**<img />*/}
          <h3>Cerca de ti</h3>
          <p>
            Tus vecinos son tu mejor aliado! Escoge tu zona y mira los servicios que se
            ofrecen. Seguro que hay uno que se ajusta a tus necesidades
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
