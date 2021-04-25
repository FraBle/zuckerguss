import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Box, Grid, Grommet } from "grommet";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

import { RouteWithSubRoutes } from "shared/components";

import { Theme } from "shared/constants";
import Navbar from "./Navbar";
import Titlebar from "./Titlebar";
import routes from "../route";

const theme = deepMerge(grommet, Theme);
const App = () => {
  return (
    <Router>
      <Grommet theme={theme} themeMode="light" full>
        <Grid
          fill
          rows={["auto", "flex"]}
          columns={["auto", "flex"]}
          areas={[
            { name: "titlebar", start: [0, 0], end: [1, 0] },
            { name: "navbar", start: [0, 1], end: [0, 1] },
            { name: "main", start: [1, 1], end: [1, 1] },
          ]}
        >
          <Titlebar gridArea="titlebar" />
          <Navbar gridArea="navbar" />
          <Box gridArea="main" overflow="scroll">
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </Box>
        </Grid>
      </Grommet>
    </Router>
  );
};

export default App;
