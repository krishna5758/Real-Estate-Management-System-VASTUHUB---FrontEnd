import React, { useState } from 'react';
import "./AgentSidebar.css";
import { useNavigate } from 'react-router-dom';
import SideNav, { Toggle, NavItem, NavIcon, NavText, } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import 'font-awesome/css/font-awesome.min.css';

const AgentSidebar = () => {
  const [expanded, setExpanded] = useState(false); 
  const navigate = useNavigate();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (

    <SideNav
      onSelect={selected => {
        console.log(selected);
        if (selected === "logout") {
          localStorage.removeItem("userId");
          navigate("/");
        }
        else if (selected && selected !== 'undefined') {
          navigate(`/agent-dashboard/${selected}`);
        }
        else {
          navigate("/agent-dashboard/profile");
        }
      }}
      className="mysidenav"
      style={{
        backgroundColor: '#b0099f',
        position: 'fixed',
        width: expanded ? '300px' : '70px',
        transition: 'width 0.3s',

      }}
    >
      <SideNav.Toggle onClick={handleToggle} />
      <SideNav.Nav defaultSelected="profile">
        <NavItem eventKey="profile">
          <NavIcon><i className='fa fa-fw fa-user' style={{ fontSize: "18px" }}></i></NavIcon>
          {expanded && (
          <NavText style={{ fontSize: "20px", color: "white" }}>
            Profile
          </NavText>
          )}
        </NavItem>
        <NavItem eventKey="get-property-details">
          <NavIcon><i className='fa fa-fw fa-list' style={{ fontSize: "18px" }}></i></NavIcon>
          {expanded && (
          <NavText style={{ fontSize: "20px", color: "white" }}>
            List of Properties
          </NavText>
          )}
        </NavItem>
        <NavItem eventKey="property-form">
          <NavIcon><i className='fa fa-fw fa-registered' style={{ fontSize: "18px" }}></i></NavIcon>
          {expanded && (
          <NavText style={{ fontSize: "20px", color: "white" }}>
            Post Property
          </NavText>
          )}
        </NavItem>
        <NavItem eventKey="send-request-to-admin">
          <NavIcon><i className='fa fa-fw fa-send' style={{ fontSize: "18px" }}></i></NavIcon>
          {expanded && (
          <NavText style={{ fontSize: "20px", color: "white" }}>
            Send Request To Admin
          </NavText>
          )}
        </NavItem>
        <NavItem eventKey="get-approve-property-list">
          <NavIcon><i className='fa fa-fw fa-list' style={{ fontSize: "18px" }}></i></NavIcon>
          {expanded && (
          <NavText style={{ fontSize: "20px", color: "white" }}>
            Approved Property List
          </NavText>
          )}
        </NavItem>
        <NavItem eventKey="logout">
          <NavIcon><i className='fa fa-fw fa-sign-out' style={{ fontSize: "18px" }}></i></NavIcon>
          {expanded && (
          <NavText style={{ fontSize: "20px", color: "white" }}
          >Logout</NavText>
          )}
        </NavItem>
      </SideNav.Nav>

    </SideNav>


  );
};

export default AgentSidebar;
