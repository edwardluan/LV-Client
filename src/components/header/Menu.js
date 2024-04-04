import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";

const Menu = () => {
  const auth = useSelector((state) => state.auth?.user);
  const theme = useSelector((state) => state.mode);
  const notify = useSelector((state) => state.notifyUser)

  const dispatch = useDispatch();
  const { pathName } = useLocation();

  const isActive = (pn) => {
    if (pn === pathName) return "active";
  };

  const navLinks = [
    { label: "Nổi bật", icon: "feed", path: "/news" },
    { label: "Trang chủ", icon: "home", path: "/" },
    { label: "Chợ", icon: "shopping_bag", path: "/market"},
    { label: "Tin nhắn", icon: "send", path: "/message" },
  ];
  
  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {/* Icons  */}
        {navLinks.map((link, index) => (
          <li className="nav-item" key={index}>
            <Link className={`nav-link ${isActive(link.path)}`} to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}

        {/* Notify */}
        <li className="nav-item dropdown align-items-center d-flex" style={{padding: "0 15px"}}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="material-icons p-0" style={{color: notify.data.length > 0 ? "#004225" : ""}}>notifications</span>
            <span className="notify_length">{notify.data.length}</span>
          </span>
          <div
            className="dropdown-menu position-absolute dropdown-menu-end"
            aria-labelledby="navbarDropdown"
            style={{transform: "translateX(60px)"}}
          >
            <NotifyModal />
          </div>
        </li>
        {/* User dropdown  */}
        <li className="nav-item dropdown" style={{paddingLeft: "15px"}}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <Avatar src={auth.profilePicture} size="medium-avatar" />
          </span>
          <ul
            className="dropdown-menu position-absolute dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to={`/user/${auth._id}`}>
                Trang cá nhân
              </Link>
            </li>
            <li>
              <label
                className="dropdown-item"
                htmlFor="theme"
                onClick={() =>
                  dispatch({ type: GLOBALTYPES.MODE, payload: !theme })
                }
              >
                {theme ? "Chế độ tối" : "Chế độ sáng"}
              </label>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => dispatch(logout())}
              >
                Đăng xuất
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
