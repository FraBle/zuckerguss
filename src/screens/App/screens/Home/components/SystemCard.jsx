import React, { useState, useEffect } from "react";

import { Card, List, Heading } from "grommet";

const SystemCard = (props) => {
  const [listItems, setListItems] = useState([]);
  const { endpoint, title } = props;
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}${endpoint}`)
      .then((response) => response.json())
      .then((json) => setListItems(json));
  }, [endpoint]);

  return (
    <Card pad="medium">
      <Heading level={3}>{title ?? "Title Placeholder"}</Heading>
      <List
        data={listItems?.attributes}
        primaryKey="attribute"
        secondaryKey="value"
      />
    </Card>
  );
};

export default SystemCard;
