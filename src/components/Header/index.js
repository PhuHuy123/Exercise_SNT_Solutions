import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getListType } from "../../config/apiService";
import { userLogOut } from "../../redux/login/actions";

import "./Header.scss";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogout = useCallback(() => dispatch(userLogOut()), [dispatch]);

  const [listType, setListType] = useState([]);
  const [showNavBar, setShowNavbar] = useState(false);
  const [animal, setAnimal] = useState("");

  const handleLogOut = () => {
    userLogout();
    localStorage.removeItem("access_token");
    // localStorage.removeItem("isLoggedIn");
    navigate("/auth/login");
  };

  useEffect(() => {
    listDataType();
  }, []);
  const listDataType = async () => {
    let res = await getListType();
    if (res.types && res.types.length > 0) {
      setListType(res.types);
    }
  };
  return (
    <>
      <header>
        <div className="col l-12">
          <div className="row">
            <div className="col l-1 m-10 c-8">
              <h1>
                <Link to="/animal">Animal</Link>
              </h1>
            </div>
            <div
              className="col l-10 navbar"
              style={showNavBar ? { display: "block" } : { display: "none" }}
            >
              <ul>
                {listType.length > 0 &&
                  listType.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => setAnimal(item.name)}
                      className={animal === item.name ? "clickMe" : ""}
                    >
                      <Link to={item?._links?.self?.href.slice(10, 27)}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                <li onClick={() => handleLogOut()} className="l_logout">
                  <img
                    src="https://i.imgur.com/HijAMNT.png"
                    alt="icon-logout"
                  />
                </li>
              </ul>
            </div>
            <div className="col l-1">
              <button onClick={() => handleLogOut()} className="logout">
                Logout
                <img src="https://i.imgur.com/HijAMNT.png" alt="icon-logout" />
              </button>

              <button
                onClick={() => setShowNavbar(!showNavBar)}
                className="nav"
              >
                <img
                  src="https://i.imgur.com/w0OIKbx_d.webp?maxwidth=760&fidelity=grand"
                  alt="icon-nav"
                />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
