import React, { useEffect } from "react";
import { Text, Box, Spinner, Clock } from "grommet";
import { MapLocation, Clock as ClockIcon } from "grommet-icons";
import useWebSocket from "react-use-websocket";

const Gps = () => {
  // Establish a shared websocket connection for system stats
  const { lastMessage, getWebSocket } = useWebSocket(
    `${process.env.REACT_APP_WEBSOCKET_URL}/gps`,
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

  return !lastMessage ? (
    <Box fill align="center" justify="center">
      <Spinner size="small" />
    </Box>
  ) : (
    <Box direction="row" fill align="center" justify="center" gap="large">
      <Box direction="row" gap="small" align="center">
        <MapLocation size="small" />
        <Text size="small">{lastMessage.data}</Text>
      </Box>
      <Box direction="row" gap="small" align="center">
        <ClockIcon size="small" />
        <Clock size="small" type="digital" />
      </Box>
    </Box>
  );
};

export default Gps;
