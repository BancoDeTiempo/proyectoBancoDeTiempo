import App from "../App";
import { About, Home, Login, NotFound, User } from "../pages";
import { createBrowserRouter } from "react-router-dom";
//!----> HE METIDO DE MOMENTO ESTAS 5 HASTA QUE LO DEFINAMOS MEJOR 

//!----> EN UN FUTURO TRABAJAREMOS CON PROTECTED

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/user",
                element: <User />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
])