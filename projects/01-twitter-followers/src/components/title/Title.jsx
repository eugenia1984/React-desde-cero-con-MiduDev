import React from "react";
import "./Title.css";

const Title = ({ text }) => {
  return (
    <header>
      <h1>{text}</h1>
    </header>
  );
};

export default Title;
