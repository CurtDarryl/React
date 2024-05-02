import styled from "styled-components";
import Sidebarlogo from "../../assets/images/knowles.png";
import {
  SidebarData,
  SidebarDataApp,
  SidebarDataReq,
  SidebarDataRev,
} from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import PropTypes from "prop-types";
import "../../assets/css/sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SidebarNav = styled.nav`
  background: #34495e;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  overflow: auto;
  top: 0;
  scroll-behavior: smooth;
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = ({ children }) => {
  Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [showmenu, showmenuupdate] = useState(false);
  const usenavigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      showmenuupdate(false);
    } else {
      showmenuupdate(true);
      let username = sessionStorage.getItem("username");

      if (username === "" || username === null) {
        usenavigate("/login");
      }
    }
  }, [location, usenavigate]);

  const role = sessionStorage.getItem("rolename");
  // console.log(role);

  if (role === "requestor") {
    return (
      <div>
        {showmenu && (
          <IconContext.Provider value={{ color: "#fff" }}>
            <SidebarNav>
              <SidebarWrap>
                <img
                  src={Sidebarlogo}
                  alt="OnEKEP.SMS"
                  className="navbar-logo"
                />

                {SidebarDataReq.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </SidebarWrap>
            </SidebarNav>
            <main>{children}</main>
          </IconContext.Provider>
        )}
      </div>
    );
  } else if (role === "reviewer") {
    return (
      <div>
        {showmenu && (
          <IconContext.Provider value={{ color: "#fff" }}>
            <SidebarNav>
              <SidebarWrap>
                <img
                  src={Sidebarlogo}
                  alt="OnEKEP.SMS"
                  className="navbar-logo"
                />

                {SidebarDataRev.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </SidebarWrap>
            </SidebarNav>
            <main>{children}</main>
          </IconContext.Provider>
        )}
      </div>
    );
  } else if (role === "approver") {
    return (
      <div>
        {showmenu && (
          <IconContext.Provider value={{ color: "#fff" }}>
            <SidebarNav>
              <SidebarWrap>
                <img
                  src={Sidebarlogo}
                  alt="OnEKEP.SMS"
                  className="navbar-logo"
                />

                {SidebarDataApp.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </SidebarWrap>
            </SidebarNav>
            <main>{children}</main>
          </IconContext.Provider>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {showmenu && (
          <IconContext.Provider value={{ color: "#fff" }}>
            <SidebarNav>
              <SidebarWrap>
                <img
                  src={Sidebarlogo}
                  alt="OnEKEP.SMS"
                  className="navbar-logo"
                />

                {SidebarData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </SidebarWrap>
            </SidebarNav>
            <main>{children}</main>
          </IconContext.Provider>
        )}
      </div>
    );
  }
};

export default Sidebar;
