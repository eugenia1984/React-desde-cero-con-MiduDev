import React, { useState } from "react";
import FollowMouse from "./components/FollowMouse";
import BtnToggleFollowMouse from "./components/BtnToggleFollowMouse";

function App() {
  const [mounted, setMounted] = useState(false);
  
  return (
    <main>
      {mounted && <FollowMouse />}
      <BtnToggleFollowMouse mounted={mounted} setMounted={setMounted} />
    </main>
  );
}

export default App;
