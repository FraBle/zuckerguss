import React from "react";
import { Box, Header, Text } from "grommet";
import { System } from "grommet-icons";

const Titlebar = ({ gridArea }) => (
  <Header background="light-4" pad="medium" gridArea={gridArea}>
    <Box direction="row" gap="medium">
      <System color="brand" />
      <Text size="medium" weight="bold">
        Guglhupf Controller
      </Text>
    </Box>
  </Header>
);

export default Titlebar;
