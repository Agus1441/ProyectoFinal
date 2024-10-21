import React from "react";
import { useTheme } from "./ModoOscuro";

const CambiarTema = () => {
  const { theme, toggleTheme } = useTheme();

  const styles = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    padding: "200px",
  };

  return (
    <div style={styles}>
      <button onClick={toggleTheme}>
        Cambiar a {theme === "light" ? "Oscuro" : "Claro"}
      </button>
    </div>
  );
};

export default CambiarTema;