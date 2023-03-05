import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:3000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="MBRKCL BLOG">MBRKCL BLOG</i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              AnaSayfa
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              Hakkımda
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/post/api">
              Gönderi
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
          
          <li className="topListItem">
            <Link className="link" to="/write">
            Gönderi Yayınla!
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF+user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                Giriş Yap!
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                Kayıt Ol!
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
        <link className="link" to="/posts">
          
        </link>
      </div>
    </div>
  );
}
