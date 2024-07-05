import { NavLink } from "react-router-dom";
import Styles from "./sideBar.module.css";
import { useContext } from "react";
import Logo from '../../assets/logo.png'
import { SideBarContext } from "../../context/SideBar";
import { useSelector } from "react-redux";
export default function SideBar() {
  const { SideBarToggle } = useContext(SideBarContext);
  const { userToken } = useSelector((state)=> state.user);

  return <>
    <ul className={`${Styles.sideBar} sideBar ${SideBarToggle ? "w-60" : "w-250"}`}>
      <li className="user text-center mt-3 mb-0 pb-3" style={{borderBottom:'1px solid #ffffff30'}}>
        <img src={Logo} alt="Logo" style={{width:'40px'}} />
        {!SideBarToggle?<div className="text">
          <h3 className="h5 text-center main-color mb-1 mt-2">{userToken.user_name}</h3>
          <p className="online mb-0">online</p>
        </div>:''}
        
      </li>
      <li>
        <NavLink to={"/"}>
          <i className="me-2 fa-solid fa-gauge-high"></i>
          {SideBarToggle ? "" : "DashBoard"}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/Medicine"}>
          <i className="me-2 fa-solid fa-suitcase-medical"></i>
          {SideBarToggle ? "" : "Medicine"}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/Inventory"}>
          <i className="me-2 fa-solid fa-database"></i>
          {SideBarToggle ? "" : "Inventory"}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/Expired_Products"}>
        <i className="me-2 fa-solid fa-circle-exclamation"></i>
          {SideBarToggle ? "" : "Expired Products"}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/EmptyProducts"}>
        <i className="me-2 fa-solid fa-hourglass-end"></i>
          {SideBarToggle ? "" : "Empty Products"}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/Purchase"}>
          <i className="me-2 fa-solid fa-cart-shopping"></i>
          {SideBarToggle ? "" : "Purchase"}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/Invoice"}>
          <i className="me-2 fa-solid fa-scale-balanced"></i>
          {SideBarToggle ? "" : "Invoices"}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/Suppliers"}>
          <i className="me-2 fa-solid fa-truck-medical"></i>
          {SideBarToggle ? "" : "Suppliers"}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/Users"}>
          <i className="me-2 fa-solid fa-users"></i>
          {SideBarToggle ? "" : "Users"}
        </NavLink>
      </li>
    </ul>
  </>;
}
