import React, { useEffect, useRef } from "react";
import WebRtcStreamer from "webrtc-streamer/html/webrtcstreamer";

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
    <video
      ref={videoElement}
      muted
      playsInline
      height={height}
      width={width}
      style={{ objectFit: "cover" }}
      poster="/loading.gif"
    ></video>
  );
};

export default WebRTC;
