import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "Çıkış Yap!" });
  };
  return (
    <div className="top">
      <div className="topLeft">
      <i class="fa-solid fa-meteor"></i>
        <i className="MBRKCL BLOG">MBRKCL BLOG</i>
      </div>
      <div className="topIcon">
        <a href="https://github.com/mehmetberkekeceli" target="_blank">
        <i class="fa-brands fa-square-github"></i>
        </a>
      </div>
      <div className="topIcon">
        <a href="https://tr.linkedin.com/in/mehmet-berke-ke%C3%A7eli-300576177" target="_blank">
      <i class="fa-brands fa-linkedin" ></i>
      </a>
      </div>
      <div className="topIcon">
        <a href="https://twitter.com/mbrkcl7" target="_blank">
        <i class="fa-brands fa-twitter"></i>
          </a>
      </div>
      <div className="topIcon">
        <a href="https://t.me/mbrkcl" target="_blank">
        <i class="fa-brands fa-telegram"></i>
        </a>
      </div>
      
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              AnaSayfa
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              Hakkımda
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              Gönderi Yayınla !
            </Link>
          </li>
          <i class="fa-solid fa-star"></i>
          <li className="topListItem" onClick={handleLogout}>
            {user && "Çıkış Yap"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src="https://avatars.githubusercontent.com/u/108813428?v=4" alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                Giriş Yap
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                Kayıt Ol
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
