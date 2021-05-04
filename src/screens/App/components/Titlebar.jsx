import React from "react";
import { Box, Header, Text } from "grommet";
import { System as SystemIcon, Wifi as WifiIcon } from "grommet-icons";

export const Titlebar = ({ gridArea }) => {
  return (
    <Header background="light-4" pad="medium" gridArea={gridArea}>
      <Box direction="row" gap="medium">
        <SystemIcon color="brand" />
        <Text size="medium" weight="bold">
          Guglhupf Controller
        </Text>
      </Box>
      <WifiIcon color="status-ok" />
    </Header>
  );
};

export default Titlebar;
