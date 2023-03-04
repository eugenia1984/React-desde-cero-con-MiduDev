import React from "react";

const BtnFollowMouse = ({ enabled, setEnabled }) => {
  return (
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? "Desactivar" : "Activar"} seguir puntero
    </button>
  );
};

export default BtnFollowMouse;
