import React from "react";
import { Box, Card, Text, Meter, Stack, Heading } from "grommet";
import numbro from "numbro";

const GaugeCard = ({ name, value, valuePct, unit, icon }) => (
  <Card pad="medium" direction="column" gap="small" background="white" round>
    <Box direction="row" gap="medium" align="center">
      {icon}
      <Heading level="2" margin="none" size="small">
        {name}
      </Heading>
    </Box>
    <Box align="center">
      <Stack anchor="center">
        <Meter
          round
          type="circle"
          size="small"
          background="light-2"
          color="focus"
          value={valuePct}
          thickness="small"
        />
        <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
          <Text size="xlarge" weight="bold">
            {value
              ? numbro(value).format({
                  thousandSeparated: true,
                  mantissa: 0,
                })
              : "N/A"}
          </Text>
          <Text size="small">{unit}</Text>
        </Box>
      </Stack>
    </Box>
  </Card>
);

export default GaugeCard;
