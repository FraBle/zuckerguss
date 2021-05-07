import React, { useEffect, useRef } from "react";
import { Box } from "grommet";
import WebRtcStreamer from "webrtc-streamer/html/webrtcstreamer";
import Gps from "./Gps";

const WebRTC = ({ webrtcurl, stream, height, width }) => {
  const videoElement = useRef(null);
  const webRtcServer = useRef(null);
  useEffect(() => {
    webRtcServer.current = new WebRtcStreamer(videoElement.current, webrtcurl);
    webRtcServer.current.connect(stream);
    return () => {
      webRtcServer.current.disconnect();
    };
  }, [webrtcurl, stream]);

  return (
    <Box>
      <video
        ref={videoElement}
        muted
        playsInline
        height={height}
        width={width}
        style={{ objectFit: "cover" }}
        poster="/loading.gif"
      />
      <Gps />
    </Box>
  );
};

export default WebRTC;
