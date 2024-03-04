import { Gallery } from '../components';
import './Home.css';

export const Home = () => {
  return (
    <>
      <div id="homeContainter">
        <section className="darumaEntry">
          <img id="Daruma" src="./DarumaVector.png" alt="daruma" />
        </section>
        <section className="sloganLogin">
          <div className="slogan">
            <h1>Conecta, comparte, completa</h1>
            <div>
              <h2>
                Busca servicios de profesionales o amateurs en tu zona, negocia los
                términos directamente, y ofrece los tuyos a cambio.
              </h2>
            </div>
          </div>
        </section>
        {/*<Gallery />*/}
        <section id="CercaDeTi">
          <img className="formasFondo" id="formaFondo1" src="./Forma1Fondo.png" alt="" />
          <img id="darumasCerca" src="./cercaDeTiFondo.png" alt="darumas enfrentados" />
          <img id="circuloAmarillo" src="./circuloAmarillo.png" alt="círculo amarillo" />
          <h3>Cerca de ti...</h3>
          <p>
            ...hay alguien que te necesita, ¡y tú a ellos! Explora usuarios que ofrecen
            los servicios que buscas en tu zona … ¡o donde quieras!
          </p>
          <img id="ojoXOjo" src="./OjoPorOjo.png" alt="ojo por ojo" />
        </section>
        <section id="OjoPorOjo">
          <div>
            {/*<img className="formasFondo"
          src="./Forma1Fondo.png"
          alt=""
          />*/}
            <h3>¡Ojo por ojo!</h3>
            <p>
              En DARUMA no existe la moneda. Haz un servicio a otra persona y este te
              devolverá el favor. Abre el chat y acuerda los detalles de tu compromiso con
              otro usuario
            </p>
          </div>
        </section>
        <section id="Visibilidad">
          <img
            className="formasFondo"
            id="formaFondo2"
            src="./Forma2fondo.png"
            alt="forma del fondo número dos"
          />
          <img id="grupoDarumas" src="./grupoDarumas.png" alt="grupo de darumas" />
          <h3>Date a conocer</h3>
          <p>
            Seas novato, jubilado, profesional, manitas o empresario, tienes mucho que
            dar. DARUMA te ayuda a darte a conocer y compartir tus talentos, y ¡conocer
            los de otros!
          </p>
        </section>
        <section id="export">
          <img id="badge" src="./badgeHome.png" alt="badge" />
          <h3>¡Expórtate!</h3>
          <p>
            “Sin trabajo por falta de experiencia… y sin experiencia por falta de
            trabajo?” En DARUMA hagas lo que hagas, todos tus servicios serán reconocidos
            y contabilizados. Podrás exportarlos a tu perfil profesional de LinkedIn o
            utilizarlos para engrosar tu portfolio.
          </p>
        </section>
      </div>
    </>
  );
};
