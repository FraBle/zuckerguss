import React from "react";
import { Box, Card, Text, Heading, Meter, List, Stack, Grommet } from "grommet";

const SystemCard = ({ name, facts, value, meterValue, unit, label, icon }) => {
  const theme = {
    list: {
      item: {
        pad: { horizontal: "xsmall", vertical: "xsmall" },
        background: ["white"],
      },
    },
  };
  return (
    <Card
      pad="medium"
      direction="row"
      // justify="between"
      gap="large"
      background="white"
      round
    >
      {meterValue && (
        <Box direction="column" gap="none">
          <Stack anchor="center">
            <Meter
              round
              type="circle"
              size="small"
              background="light-2"
              color="focus"
              value={meterValue}
              thickness="small"
            />
            <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
              <Text size="xlarge" weight="bold">
                {value}
              </Text>
              <Text size="small">{unit}</Text>
            </Box>
          </Stack>
          <Text size="small" alignSelf="center">
            {label}
          </Text>
        </Box>
      )}
      <Box gap="small" fill>
        <Box direction="row" gap="medium" align="center">
          {icon}
          <Heading level="2" margin="none" size="small">
            {name}
          </Heading>
        </Box>
        <Grommet theme={theme}>
          <List data={facts} />
        </Grommet>
      </Box>
    </Card>
  );
};

export default SystemCard;
