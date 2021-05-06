import React from "react";
import { Box, Card, Text, Meter, Heading, Grid } from "grommet";
import _ from "lodash";

const BarsCard = ({ icon, name, data }) => {
  return (
    <Card
      pad="medium"
      direction="column"
      background="white"
      gap="small"
      round
      fill
    >
      <Box direction="row" gap="medium" align="center">
        {icon}
        <Heading level="2" margin="none" size="small">
          {name}
        </Heading>
      </Box>
      <Grid gap="small" columns={["auto", "flex", "auto"]} align="center">
        {_.map(data, (datum) => {
          return (
            <React.Fragment>
              <Text size="medium" weight="bold">
                {datum.label}
              </Text>
              <Meter
                round
                type="bar"
                size="large"
                background="light-2"
                color="focus"
                value={datum.value}
                thickness="small"
              />
              <Text size="medium" weight="bold">
                {datum.unit}
              </Text>
            </React.Fragment>
          );
        })}
      </Grid>
    </Card>
  );
};

export default BarsCard;
