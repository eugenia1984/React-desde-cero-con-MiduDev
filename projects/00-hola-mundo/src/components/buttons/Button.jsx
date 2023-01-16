import React from "react";

const Button = ({ svg, text }) => {
  return (
    <button>
      <img src={svg} width={50} height={50} alt={text} />
      <p>{text}</p>
    </button>
  );
};

export default Button;
