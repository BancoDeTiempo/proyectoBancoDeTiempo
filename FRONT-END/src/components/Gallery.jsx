import './Gallery.css';

import { useEffect, useState } from 'react';

import { CardServicios } from './CardServicios';

import { getAll } from '../services/Servicio.service';

export const Gallery = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getAll();
      res.status === 200 && setData(res.data);
    })();
  }, []);

  return (
    <>
      <div id="servicesGallery">
        {data !== null &&
          data.splice(0, 3).map((item) => <CardServicios data={item} key={item._id} />)}
      </div>
      ,
    </>
  );
};
