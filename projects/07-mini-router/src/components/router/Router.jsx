import { EVENTS } from "../../utils/consts.js";
import { useState, useEffect, Children } from "react";
import { match } from "path-to-regexp";
import { getCurrentPath } from "../../utils/utils.js";

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  // add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === "Route";
    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    // Using usado path-to-regexp to detect dinamics routes
    // eg: /search/:query <- :query is a dynamic route
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) return false;

    // Store the params or de dynamic URL that we extract with path-to-regexp
    // eg: if the route is   /search/:query
    // and the url is: /search/javascript
    // matched.params.query === 'javascript'
    routeParams = matched.params;
    return true;
  })?.Component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
