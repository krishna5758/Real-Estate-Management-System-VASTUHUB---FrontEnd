import { Link } from "react-router-dom";
import './NavbarTop.css';
import { navItems } from "./NavItems";
import BuyerDropDown from "./dropdowns/BuyerDropDown";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import SellerDropDown from "./dropdowns/SellerDropDown";
import AgentDropDown from "./dropdowns/AgentDropDown";

function NavbarTop() {
  const [buyer_drop_down, setBuyerDropDown] = useState(false);
  const [seller_drop_down, setSellerDropDown] = useState(false);
  const [agent_drop_down, setAgentDropDown] = useState(false);

  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/login");
  }
  return (
    <>
      <header className="navbar-top">
        <input type="checkbox" name="" id="chk1" />
        <div className="navbar-logo"><h1>VASTUHUB</h1></div>
        <ul className="navbar-nav-items">
          {
            navItems.map(item => {
              if (item.title === "Buyer") {
                return (

                  <li
                    id="item-id"
                    key={item.id}
                    className={item.cName}
                    onMouseEnter={() => setBuyerDropDown(true)}
                    onMouseLeave={() => setBuyerDropDown(false)}
                  >
                    <Link to={item.path}>{item.title}</Link>
                    {buyer_drop_down && <BuyerDropDown />}
                  </li>

                );
              }
              if (item.title === "Seller") {
                return (

                  <li
                    id="item-id"
                    key={item.id}
                    className={item.cName}
                    onMouseEnter={() => setSellerDropDown(true)}
                    onMouseLeave={() => setSellerDropDown(false)}
                  >
                    <Link to={item.path}>{item.title}</Link>
                    {seller_drop_down && <SellerDropDown />}
                  </li>

                );
              }
              if (item.title === "Agent") {
                return (

                  <li
                    id="item-id"
                    key={item.id}
                    className={item.cName}
                    onMouseEnter={() => setAgentDropDown(true)}
                    onMouseLeave={() => setAgentDropDown(false)}
                  >
                    <Link to={item.path}>{item.title}</Link>
                    {agent_drop_down && <AgentDropDown />}
                  </li>

                );
              }
              return (
                <li id="item-id" key={item.id} className={item.cName}>
                  <Link to={item.path}>{item.title}</Link>
                </li>
              );
            })
          }
          {/* <Button className= "signin_btn" onClick={routeChange}>SIGN IN</Button> */}
          <Button size="sm" onClick={routeChange}>SIGN IN</Button>
        </ul>
        <div className="menu-post-property">
          <label htmlFor="chk1">
            <img src="./images/menu1.png" />
          </label>
        </div>

      </header>
    </>
  );
}
export default NavbarTop;