import Router from "./router/Router";
import { routes } from "./router/routes";
import "./App.css";

function App() {

  return (
    <main>
      <Router routes={routes} />
    </main>
  );
}

export default App;
