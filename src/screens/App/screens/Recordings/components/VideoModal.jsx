import React from "react";

import { Text, Layer, Button, Box, Video } from "grommet";
import { FormClose } from "grommet-icons";

const VideoModal = ({ onClose, recording }) => {
  return (
    <Layer
      position="center"
      onClickOutside={() => onClose()}
      onEsc={() => onClose()}
      full
      margin="medium"
    >
      <Box pad="medium" gap="small" width="large" fill>
        <Button alignSelf="end" icon={<FormClose />} onClick={onClose} />
        <Video controls="over" fit="contain" autoPlay mute>
          <source
            src={`${process.env.REACT_APP_SERVER_URL}/recordings/${recording?.fileName}`}
            type="video/mp4"
          />
        </Video>
        <Text size="xsmall" textAlign="center">
          {recording?.fileName ?? "Placeolder"}
        </Text>
      </Box>
    </Layer>
  );
};

export default VideoModal;
