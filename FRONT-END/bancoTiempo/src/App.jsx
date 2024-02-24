import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

//! NO HAREMOS UN COMPONENTE MAIN DADO QUE ENTRA EN CONFLICTO CON OUTLET 
//! DEBIDO A LA ÚLTIMA VERSIÓN NO PUEDE TENER ETIQUETAS POR ENCIMA

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;