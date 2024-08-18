import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Body from "./components/Body.jsx";

function App() {
  const [toogleNav, setNav] = useState(false);

  const toogleNavBar = (toogleNav) => {
    setNav(!toogleNav);
  };

  return (
    <>
      <Header showMenu={toogleNavBar} toogle={toogleNav} />
      <Body toogleNav={toogleNav}>
        <Outlet />
      </Body>
      <Footer />
    </>
  );
}

export default App;
