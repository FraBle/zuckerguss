import React from "react";
import { Box, Card, Heading, List, Grommet } from "grommet";
import numbro from "numbro";

const ListCard = ({ name, data, icon }) => {
  const theme = {
    list: {
      item: {
        pad: { horizontal: "xsmall", vertical: "xsmall" },
        background: ["white"],
      },
    },
  };
  return (
    <Card
      pad="medium"
      direction="column"
      gap="small"
      background="white"
      round
      fill
    >
      <Box direction="row" gap="medium" align="center">
        {icon}
        <Heading level="2" margin="none" size="small">
          {name}
        </Heading>
      </Box>
      <Grommet theme={theme}>
        <List
          data={data}
          primaryKey="label"
          secondaryKey={(datum) =>
            `${
              datum.value
                ? numbro(datum.value).format({
                    thousandSeparated: true,
                    mantissa: 1,
                  })
                : "N/A"
            } ${datum.unit}`
          }
        />
      </Grommet>
    </Card>
  );
};

export default ListCard;
