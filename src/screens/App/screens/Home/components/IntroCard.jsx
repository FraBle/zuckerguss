import React from "react";

import { Card, Heading, Text } from "grommet";

const IntroCard = () => {
  return (
    <Card pad="medium">
      <Heading level={3}>Welcome to your Guglhupf!</Heading>
      <Text>
        Watch the live feed of the connected cameras, review past recordings,
        and check out stats on your vehicle in real-time.
      </Text>
    </Card>
  );
};

export default IntroCard;
