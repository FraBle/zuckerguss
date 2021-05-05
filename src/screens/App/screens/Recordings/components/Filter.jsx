import React, { useEffect, useState } from "react";
import { Box, CheckBoxGroup, Text } from "grommet";
import _ from "lodash";

const Filter = ({ onChange, ...props }) => {
  const [cameras, setCameras] = useState(["Front", "Back"]);
  const [storage, setStorage] = useState(["Local", "Cloud"]);

  useEffect(
    () =>
      onChange({
        cameras: _.map(cameras, _.toLower),
        storage: _.map(storage, _.toLower),
      }),
    [onChange, cameras, storage]
  );

  return (
    <Box pad="medium" gap="xsmall" {...props}>
      <Text weight="bold" margin={{ vertical: "small" }}>
        Camera
      </Text>
      <CheckBoxGroup
        gap="xsmall"
        value={cameras}
        onChange={(event) => {
          setCameras(event.value);
        }}
        options={["Front", "Back"]}
      />
      <Text weight="bold" margin={{ vertical: "small" }}>
        Storage
      </Text>
      <CheckBoxGroup
        gap="xsmall"
        value={storage}
        onChange={(event) => {
          setStorage(event.value);
        }}
        options={["Local", "Cloud"]}
      />
    </Box>
  );
};

export default Filter;
