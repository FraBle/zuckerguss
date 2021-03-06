import React, { useState, useRef, useLayoutEffect } from "react";
import { Box, List, Heading, Text, Grid, Spinner } from "grommet";
import { DocumentCloud, DocumentStore } from "grommet-icons";
import _ from "lodash";
import queryString from "query-string";

import VideoModal from "./VideoModal";
import Filter from "./Filter";

const CAMERA_FILTERS = ["front", "back"];
const STORAGE_FILTERS = ["cloud", "local"];
const ALLFILTERS = [...CAMERA_FILTERS, ...STORAGE_FILTERS];

const Recordings = () => {
  const [recordings, setRecordings] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState();
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const firstRender = useRef(true);

  const [filters, setFilters] = useState({
    cameras: CAMERA_FILTERS,
    storage: STORAGE_FILTERS,
  });
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/recordings?${queryString.stringify(
          {
            ..._.reduce(
              _.concat(..._.values(filters)),
              (obj, filter) => {
                // eslint-disable-next-line no-param-reassign
                obj[filter] = _.includes(ALLFILTERS, filter);
                return obj;
              },
              {}
            ),
          }
        )}`
      )
        .then((response) => response.json())
        .then((json) => setRecordings(json))
        .then(() => setIsLoading(false));
    }
  }, [filters]);

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  return (
    <Box
      pad={{
        left: "medium",
      }}
      overflow="scroll"
      fill
    >
      <Heading level={3}>Recordings</Heading>
      <Grid
        fill
        rows={["flex"]}
        columns={["flex", "small"]}
        areas={[
          { name: "list", start: [0, 0], end: [0, 0] },
          { name: "filter", start: [1, 0], end: [1, 0] },
        ]}
        gap="small"
      >
        <Box gridArea="list" fill>
          {(() => {
            if (isLoading) {
              return (
                <Box fill align="center" justify="center">
                  <Spinner size="large" />
                </Box>
              );
            }
            if (_.isEmpty(recordings?.recordings ?? [])) {
              return (
                <Box fill align="center" justify="center">
                  <Heading level={4}>
                    No recordings available at the moment.
                  </Heading>
                </Box>
              );
            }
            return (
              <List
                data={recordings?.recordings ?? []}
                step={5}
                paginate
                onClickItem={(event) => {
                  setShowVideoModal(true);
                  setSelectedVideo(event.item);
                }}
              >
                {(datum) => (
                  <Box direction="row-responsive" gap="medium" align="center">
                    {datum.uploaded ? (
                      <DocumentCloud size="medium" />
                    ) : (
                      <DocumentStore size="medium" />
                    )}
                    <Text>{datum.fileName}</Text>
                  </Box>
                )}
              </List>
            );
          })()}
        </Box>
        <Filter background="light-5" gridArea="filter" onChange={setFilters} />
      </Grid>

      {showVideoModal && (
        <VideoModal onClose={closeVideoModal} recording={selectedVideo} />
      )}
    </Box>
  );
};

export default Recordings;
