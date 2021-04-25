import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Nav, Sidebar } from "grommet";

import { Routes } from "shared/constants";

const navItems = Object.values(Routes);

export const Navbar = ({ gridArea, history }) => {
  const [activeNavItem, setActiveNavItem] = React.useState("home");

  return (
    <Sidebar background="brand" gridArea={gridArea}>
      <Nav gap="small">
        {navItems.map((navItem, i) => (
          <Button
            key={i}
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
