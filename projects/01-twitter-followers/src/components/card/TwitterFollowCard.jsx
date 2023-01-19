import React from "react";
import ButtonsCard from "./ButtonsCard";
import HeaderCard from "./HeaderCard";
import "./TwitterFollowCard.css";

export function TwitterFollowCard({userName }) {

  return (
    <article className="tw-followCard">
      <HeaderCard userName={userName} />
      <ButtonsCard />
    </article>
  );
}
