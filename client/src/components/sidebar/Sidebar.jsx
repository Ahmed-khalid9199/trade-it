import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import sidebar_items from "../../assets/JsonData/sidebar_routes.json";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        {/* <img className="logo" src={logo} alt="company logo" /> */}
      </div>
      <center>
        <div className="sidebar__department">Admin Portal</div>
      </center>
      {sidebar_items.map((item, index) => (
        <NavLink activeClassName="active__sidebar" to={item.route} key={index}>
          <SidebarItem title={item.display_name} icon={item.icon} />
        </NavLink>
      ))}
      <div className="copyright">@made by inside brackets</div>
    </div>
  );
};

export default Sidebar;
