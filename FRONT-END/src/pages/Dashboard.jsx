import './Dashboard.css';

import { Gallery } from '../components';

export const Dashboard = () => {
  return (
    <div id="dashContainter">
      <input
        className="input__search"
        type="text"
        placeholder="Busca un servicio"
        onChange={(e) => e.preventDefault}
      />
      <h3 className="intento">GALERÍA A FUTURO</h3>
      <Gallery />
    </div>
  );
};
