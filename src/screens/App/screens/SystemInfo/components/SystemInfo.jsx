import React, { useEffect, useContext } from "react";
import { Grid, Box, Spinner, ResponsiveContext } from "grommet";
import { Cpu, Host, AppsRounded, Wifi, Memory } from "grommet-icons";
import useWebSocket from "react-use-websocket";
import _ from "lodash";

import SystemCard from "./SystemCard";

const SystemInfo = () => {
  // Establish a shared websocket connection for system stats
  const { lastJsonMessage, getWebSocket } = useWebSocket(
    `${process.env.REACT_APP_WEBSOCKET_URL}/system`,
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

  const size = useContext(ResponsiveContext);

  return !lastJsonMessage ? (
    <Box fill align="center" justify="center">
      <Spinner size="large" />
    </Box>
  ) : (
    <Grid
      columns={size !== "small" ? "medium" : "100%"}
      gap="small"
      pad="small"
    >
      <SystemCard
        name="CPU"
        icon={<Cpu size="large" />}
        facts={[
          lastJsonMessage?.cpu.arch,
          lastJsonMessage?.cpu.soc,
          `${lastJsonMessage?.cpu.cores} x ${lastJsonMessage?.cpu.clockSpeed}`,
        ]}
        value={lastJsonMessage?.cpu.temp}
        meterValue={(lastJsonMessage?.cpu.temp / 85) * 100}
        unit="°C"
        label="temp"
      />
      <SystemCard
        name="GPU"
        icon={<Cpu size="large" />}
        facts={[lastJsonMessage?.gpu.clockSpeed, lastJsonMessage?.gpu.volts]}
        value={lastJsonMessage?.gpu.temp}
        meterValue={(lastJsonMessage?.gpu.temp / 85) * 100}
        unit="°C"
        label="temp"
      />
      <SystemCard
        name="Memory"
        icon={<Memory size="large" />}
        facts={[`${lastJsonMessage?.memory.totalGiB} GiB`]}
        value={lastJsonMessage?.memory.percent}
        meterValue={lastJsonMessage?.memory.percent}
        unit="%"
        label="used"
      />
      <SystemCard
        name="OS"
        icon={<Host size="large" />}
        facts={[
          lastJsonMessage?.system.platform,
          lastJsonMessage?.system.kernel,
          `started ${lastJsonMessage?.system.started}`,
        ]}
        value={lastJsonMessage?.system.load}
        meterValue={lastJsonMessage?.system.load}
        unit="%"
        label="load"
      />
      <SystemCard
        name="Software"
        icon={<AppsRounded size="large" />}
        facts={[
          `v${lastJsonMessage?.software.version}`,
          `Git ${lastJsonMessage?.software.git}`,
          `Python ${lastJsonMessage?.software.python}`,
        ]}
      />
      <SystemCard
        name="Network"
        icon={<Wifi size="large" />}
        facts={[
          lastJsonMessage?.network.hostname,
          _.join(lastJsonMessage?.network.addresses, ", "),
          `Sent ${lastJsonMessage?.network.bytesSentMB} MB`,
          `Recv ${lastJsonMessage?.network.bytesReceivedMB} MB`,
        ]}
      />
    </Grid>
  );
};

export default SystemInfo;
