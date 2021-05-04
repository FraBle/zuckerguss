import React, { useState, useEffect } from "react";

import { Card, List, Heading } from "grommet";

const SystemCard = (props) => {
  let [listItems, setListItems] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}${props.endpoint}`)
      .then((response) => response.json())
      .then((json) => setListItems(json));
  }, [props.endpoint]);

  return (
    <Card pad="medium">
      <Heading level={3}>{props?.title ?? "Title Placeholder"}</Heading>
      <List
        data={listItems?.attributes}
        primaryKey="attribute"
        secondaryKey="value"
      />
    </Card>
  );
};

export default SystemCard;
