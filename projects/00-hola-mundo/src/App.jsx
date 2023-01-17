import { useState } from "react";
import { users } from "./data.js";
import { TwitterFollowCard } from "./components/card/TwitterFollowCard";
import "./App.css";
import { CounterButton } from "./components/buttons/CounterButon.jsx";

export function App() {
  

  return (
    <section className="App">
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
      <CounterButton />
    </section>
  );
}
