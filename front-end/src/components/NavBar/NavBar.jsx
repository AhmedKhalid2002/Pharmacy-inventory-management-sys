import { useContext } from "react";
import { SideBarContext } from "../../context/SideBar";
import Style from "./navBar.module.css";
import { setUserToken } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function NavBar() {
  const { SideBarToggle, setSideBarToggle } = useContext(SideBarContext);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const signOut = () =>{
    localStorage.removeItem('userToken')
    dispatch(setUserToken(null));
    navigate('/login');
  }

  const toggleSideBar = () => {
    SideBarToggle ? setSideBarToggle(false) : setSideBarToggle(true);
  };

  return <>
    <nav className={`${Style.navBar} navBar d-flex justify-content-between align-items-center`}>
      <button onClick={toggleSideBar}>
        <i className="bi bi-grid-3x3-gap"></i>
      </button>
      <a data-bs-toggle="modal" data-bs-target="#exampleModal" className="me-md-5 me-2 cursor-pointer"><i className="fa-solid fa-user fs-6 me-1"></i> Sign out</a>
    </nav>
    
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" style={{marginTop:'9rem'}}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Logout</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Do You Want to Logout Really?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={signOut}>Logout</button>
          </div>
        </div>
      </div>
    </div>

  </>
}
