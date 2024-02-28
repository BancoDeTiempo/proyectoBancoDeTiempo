/**
 * Para crear Gallery vamos a necesitar el componente de carta (CardServicios)
 * y un util que controle la cantidad de servicios que pediremos (createArray)
 */

import { createArray } from "../utils"
import { CardServicios } from "./CardServicios"


const Gallery = () => {
    const array = createArray(5)
  return (
    <div id="servicesGallery">
        {array.map((id) => (
            <CardServicios id={id}/>


        ))}
      
    </div>
  )
}

export default Gallery
