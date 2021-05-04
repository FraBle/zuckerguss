import React from "react";
import { Box, Tabs, Tab } from "grommet";
import { Car } from "grommet-icons";

import WebRTC from "./WebRTC";

const Stream = () => {
  return (
    <Box pad="small" fill>
      <Tabs flex>
        <Tab title="Front" icon={<Car />}>
          <Box justify="center" direction="row" fill>
            <WebRTC
              webrtcurl={`${process.env.REACT_APP_WEBRTC_URL}/front`}
              stream="front"
            />
          </Box>
        </Tab>
        <Tab title="Back" icon={<Car />}>
          <Box justify="center" direction="row" fill>
            <WebRTC
              webrtcurl={`${process.env.REACT_APP_WEBRTC_URL}/back`}
              stream="back"
            />
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
};

export default Stream;
