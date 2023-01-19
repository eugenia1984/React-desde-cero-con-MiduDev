import React from "react";
import { users } from "./data.js";
import { TwitterFollowCard } from "./components/card/TwitterFollowCard";
import "./App.css";
import Title from "./components/title/Title.jsx";

export function App() {
  

  return (
    <section className="App">
      <Title text="A quién seguir" />
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
