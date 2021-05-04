import React, { useContext } from "react";

import { Box, Grid, ResponsiveContext } from "grommet";

import IntroCard from "./IntroCard";
import SystemCard from "./SystemCard";

const Home = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box pad="medium">
      <Grid columns={size !== "small" ? "medium" : "100%"} gap="small">
        <IntroCard />
        <SystemCard endpoint="/stats/video" title="Recordings" />
        <SystemCard endpoint="/stats/system" title="System" />
        <SystemCard endpoint="/stats/software" title="Software" />
      </Grid>
    </Box>
  );
};

export default Home;
