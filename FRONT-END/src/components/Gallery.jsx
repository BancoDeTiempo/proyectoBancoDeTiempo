/**
 * Para crear Gallery vamos a necesitar el componente de carta (CardServicios)
 * y un util que controle la cantidad de servicios que pediremos (createArray)
 */

//import { createArray } from '../utils';
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

  return 
  <>
    {console.log('data', data)
      data !== null && data.slice(0,5)}
  </>;



  /*const array = createArray(5);
  return (
    <div id="servicesGallery">
      {array.map((id) => (
        <CardServicios id={id} key={id} />
      ))}
    </div>
  );*/
};
