import React, { useContext } from "react";
import { Box, Tabs, Tab, ResponsiveContext } from "grommet";
import { Car } from "grommet-icons";
import { useWindowHeight } from "@react-hook/window-size/throttled";

import WebRTC from "./WebRTC";

const Stream = () => {
  const windowHeight = useWindowHeight();
  return (
    <Box pad="small" fill>
      <Tabs flex>
        <Tab title="Front" icon={<Car />}>
          <Box justify="center" direction="row" fill>
            <WebRTC
              webrtcurl={`${process.env.REACT_APP_WEBRTC_URL}/front`}
              stream="front"
              height={windowHeight - 200}
            />
          </Box>
        </Tab>
        <Tab title="Back" icon={<Car />}>
          <Box justify="evenly" direction="row" fill>
            <WebRTC
              webrtcurl={`${process.env.REACT_APP_WEBRTC_URL}/back`}
              stream="back"
              height={windowHeight - 200}
            />
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
};

export default Stream;
