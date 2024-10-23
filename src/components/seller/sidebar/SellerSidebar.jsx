import React, { useState } from 'react';
import "./SellerSidebar.css";
import { useNavigate } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText, } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import 'font-awesome/css/font-awesome.min.css';

const SellerSidebar = () => {

  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("userId");
  //   navigate("/");
  // };

  // return (
  //   <div className="sidebar">
  //     <h2>Dashboard</h2>
  //     <ul>
  //       <li>
  //         <Link to="/profile">Profile</Link>
  //       </li>
  //       <li>
  //         <Link to="/get-property-details">List of Properties</Link>
  //       </li>
  //       <li>
  //         <Link to="/property-form">Post Property</Link>
  //       </li>
  //       <li>
  //         <Link to="/hire-agent">Hire Agent</Link>
  //       </li>
  //       <li>
  //         <Link to="/" onClick={handleLogout}>Logout</Link>
  //       </li>
  //     </ul>
  //   </div>
  // );

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
          navigate(`/seller-dashboard/${selected}`);
        }
        else {
          navigate("/seller-dashboard/profile");
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
        <NavItem eventKey="hire-agent">
          <NavIcon><i className='fa fa-fw fa-hire-a-helper' style={{ fontSize: "18px" }}></i></NavIcon>
          {expanded && (
            <NavText style={{ fontSize: "20px", color: "white" }}>
              Hire Agent
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

export default SellerSidebar;
