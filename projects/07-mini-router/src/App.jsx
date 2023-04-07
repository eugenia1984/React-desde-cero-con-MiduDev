import Router from "./router/Router";
import { routes } from "./router/routes";
import "./App.css";
import Page404 from "./pages/Page404";

function App() {

  return (
    <main>
      <Router routes={routes}  defaultComponent={Page404}/>
    </main>
  );
}

export default App;
