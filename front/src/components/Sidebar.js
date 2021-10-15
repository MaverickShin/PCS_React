import React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";


function Sidebar() {
  const menus = [
    { name: "Dashboard", path: "/" },
    { name: "Sitter", path: "/sit"},
    { name: "Board", path: "/board" }
  ];
  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <SidebarItem
              menu={menu}
            />
          </Link>
        );
      })}
        <div className="side_bottom"></div>
    </div>
  );
}

export default Sidebar;