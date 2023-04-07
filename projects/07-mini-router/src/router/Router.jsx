import { useState, useEffect } from "react";
import { match } from "path-to-regexp";
import { EVENTS } from "../utils/const";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import SearchPage from "../pages/SearchPage";

export const routes = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/search/:query",
    Component: SearchPage
  },
];

const Router = ({
  routes = [],
  defaultComponent: DefaultComponent = () => null,
}) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  const Page = routes.find(({ path }) => {
    if (path === currentPath) return true;

    // path-to-regexp for dinamic routes
    // eg: /search/:query
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) return false;

    // save the dinamic params of the URL
    //eg route: /serach/javascript
    // matched.params.query === "javascript"
    routeParams = matched.params;
    return true;
  })?.Component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
};

export default Router;
