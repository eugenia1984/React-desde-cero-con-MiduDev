import { useState } from "react";
import { users }  from "./data.js";
import { TwitterFollowCard } from "./components/card/TwitterFollowCard";
import "./App.css";

export function App() {
  const [state, setState] = useState(0);

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
      <button onClick={() => setState(state + 1)}>count</button>
    </section>
  );
}
