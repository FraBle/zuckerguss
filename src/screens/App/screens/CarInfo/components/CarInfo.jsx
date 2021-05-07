import React, { useEffect } from "react";
import { Grid, Box, Spinner } from "grommet";
import { Time, BarChart, Dashboard } from "grommet-icons";
import useWebSocket from "react-use-websocket";
import _ from "lodash";

import GaugeCard from "./GaugeCard";
import BarsCard from "./BarsCard";
import ListCard from "./ListCard";

const CarInfo = () => {
  // Establish a shared websocket connection for system stats
  const { lastJsonMessage, getWebSocket } = useWebSocket(
    `${process.env.REACT_APP_WEBSOCKET_URL}/car`,
    {
      // Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: () => true,
    }
  );

  useEffect(
    () => () => {
      getWebSocket().close();
    },
    [getWebSocket]
  );

  return !lastJsonMessage ? (
    <Box fill align="center" justify="center">
      <Spinner size="large" />
    </Box>
  ) : (
    <Grid
      columns={{
        count: 2,
        size: "auto",
      }}
      gap="small"
      pad="small"
    >
      <GaugeCard
        name="Speed"
        icon={<Dashboard size="large" />}
        value={lastJsonMessage?.SPEED.value}
        valuePct={lastJsonMessage?.SPEED.value / 107}
        unit={lastJsonMessage?.SPEED.unit}
      />
      <GaugeCard
        name="RPM"
        icon={<Dashboard size="large" />}
        value={lastJsonMessage?.RPM.value}
        valuePct={lastJsonMessage?.RPM.value / 107}
        unit={lastJsonMessage?.RPM.unit}
      />
      <BarsCard
        name="Load & Fuel"
        icon={<BarChart size="large" />}
        data={_.chain(lastJsonMessage)
          .pickBy((v, k) => ["THROTTLE", "LOAD", "FUEL"].includes(k))
          .toArray()
          .value()}
      />
      <ListCard
        name="Temperatures"
        icon={<Time size="large" />}
        data={_.chain(lastJsonMessage)
          .pickBy((v, k) => ["OIL", "COOLANT", "INTAKE", "OUTSIDE"].includes(k))
          .toArray()
          .value()}
      />
    </Grid>
  );
};

export default CarInfo;
