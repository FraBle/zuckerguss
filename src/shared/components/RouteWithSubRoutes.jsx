import React from "react";
import { Route } from "react-router-dom";

export const RouteWithSubRoutes = (route) => {
  const { path } = route;
  return (
    <Route
      path={path}
      // eslint-disable-next-line react/jsx-props-no-spreading
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

export { RouteWithSubRoutes as default };
