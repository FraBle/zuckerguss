import React from "react";
import { withRouter, useLocation } from "react-router-dom";
import { Button, Nav, Sidebar } from "grommet";
import _ from "lodash";

import { Routes } from "shared/constants";

const navItems = Object.values(Routes);

const Navbar = ({ gridArea, history }) => {
  const [activeNavItem, setActiveNavItem] = React.useState(
    _.trimStart(useLocation()?.pathname, "/")
  );

  return (
    <Sidebar background="brand" gridArea={gridArea}>
      <Nav gap="small">
        {navItems.map((navItem) => (
          <Button
            key={navItem.id}
            icon={navItem.icon}
            hoverIndicator
            active={activeNavItem === navItem.id}
            focusIndicator={false}
            onClick={() => {
              setActiveNavItem(navItem.id);
              history.push(navItem.route);
            }}
          />
        ))}
      </Nav>
    </Sidebar>
  );
};

export default withRouter(Navbar);
