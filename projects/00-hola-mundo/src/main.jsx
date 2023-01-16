import React from "react";
import ReactDOM from "react-dom/client";
import Button from "./components/buttons/Button";
import  LikeIt  from "./assets/like.svg";
import  NotLikeIt  from "./assets/no-like.svg";
import "./main.css";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Fragment>
    <Button svg={LikeIt} text="Me gusta" />
    <Button svg={NotLikeIt} text="No me gusta" />
  </React.Fragment>
);
