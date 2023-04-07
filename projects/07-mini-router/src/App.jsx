import Router, { routes } from "./router/Router";
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
