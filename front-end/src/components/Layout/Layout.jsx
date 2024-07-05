import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { SideBarContext } from "../../context/SideBar";
import { useContext } from "react";

export default function Layout() {
  const { SideBarToggle, setSideBarToggle } = useContext(SideBarContext);
  window.addEventListener("resize", () => {
    window.innerWidth < 1250 ? setSideBarToggle(true) : setSideBarToggle(false);
  });
  return (
    <div className="MainContainer">
      <SideBar />
      <main className={`AppContainer ${SideBarToggle ? "ps-60" : "ps-250"}`}>
        <NavBar />
        <Outlet />
      </main>
    </div>
  );
}
