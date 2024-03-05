/**
 * Para crear Gallery vamos a necesitar el componente de carta (CardServicios)
 * y un util que controle la cantidad de servicios que pediremos (createArray)
 */

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

  /*const array = createArray(5);
  return (
    <div id="servicesGallery">
      {array.map((id) => (
        <CardServicios id={id} key={id} />
      ))}
    </div>
  );*/
};
