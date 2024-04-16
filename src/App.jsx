import "aos/dist/aos.css";
import AOS from "aos";
import { ToastContainer } from "react-toastify";
import { RoutesComponent } from "./components/RoutesComponent";
import { ShopProvider } from "./context/shopContext";
import { useEffect } from "react";

function App() {
  // Inicializar AOS
  useEffect(() => {
    AOS.init({
      // Configuraciones opcionales aquí
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <ShopProvider>
        <RoutesComponent />
      </ShopProvider>
    </>
  );
}

export default App;
