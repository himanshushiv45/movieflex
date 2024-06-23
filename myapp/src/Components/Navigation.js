import { useState, useEffect } from "react";
import logo from "../Assets/img/logo-d-plus.svg";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  let [userName, setUserName] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("token"));
    setUserName(userInfo.user_name);
    // console.log(userInfo.user_name);
  }, []);

  function logOut() {
    localStorage.removeItem("token")
    navigate("/login")
}
  return (
    <>
      {/* Fixed Navigation */}

      <div className="fix-nav">
        <div className="nav-container">
          <div className="logo">
            <Link to="/home">
              <img src={logo} />
            </Link>
            <button className="sub-btn">Subscribe</button>
          </div>
          <div className="nav-icons">
            <i title="My Space" className="fa-regular fa-circle-user"></i>
            <i title="Search" className="fa-solid fa-magnifying-glass"></i>
            <i title="Home" className="fa-solid fa-house"></i>
            <i title="TV" className="fa-solid fa-tv"></i>
            <i title="Movie" className="fa-solid fa-film"></i>
            <i
              title="Sports"
              className="fa-solid fa-table-tennis-paddle-ball"
            ></i>
            <i title="Categories" className="fa-solid fa-icons"></i>
          </div>
        </div>

        <div className="name-container">
      
            <h3 onClick={logOut}>Log out</h3>
          
        </div>
        <div className="name-container">
          <h3>{userName}</h3>
        </div>
      </div>
    </>
  );
}
export default Navigation;
