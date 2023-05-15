import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import ProfilePhoto from '../../photos/ProfilePhoto.jpg';
import { useHistory } from "react-router-dom";

export default function TopBar(): JSX.Element {
  const { user, dispatch } = useContext(Context);
  const history = useHistory();

  const handleClick = () => {
    if (history.location.pathname === "/") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      history.push('/');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };


const handleLogout = () => {
dispatch({ type: "LOGOUT" });
};

return (
<div className="top">
<div className="topLeft">
<i className="fa-solid fa-meteor"></i>
<i className="blogName">MBRKCL DESIGN</i>
</div>
<div className="topIcon">
<a href="https://github.com/mehmetberkekeceli" target="_blank" rel="noreferrer">
<i className="fa-brands fa-square-github"></i>
</a>
</div>
<div className="topIcon">
<a href="https://tr.linkedin.com/in/mehmet-berke-ke%C3%A7eli-300576177" target="_blank" rel="noreferrer">
<i className="fa-brands fa-linkedin" ></i>
</a>
</div>
<div className="topIcon">
<a href="https://twitter.com/mbrkcl7" target="_blank" rel="noreferrer">
<i className="fa-brands fa-twitter"></i>
</a>
</div>
<div className="topIcon">
<a href="https://t.me/mbrkcl" target="_blank" rel="noreferrer">
<i className="fa-brands fa-telegram"></i>
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
<li className="topListItem">
<Link className="link" to="/News">
Haberler
</Link>
</li>
<i className="fa-solid fa-star"></i>
</ul>
</div>
<div className="topRight">
<li className="topListItem" onClick={handleLogout}>
{user && "Çıkış Yap"}
</li>
{user ? (
<img className="topImg" src={ProfilePhoto} alt="" />
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
<i className="topSearchIcon fas fa-search" onClick={handleClick}></i>
  <Link className="link" to="/posts"></Link>
</div>
</div>
);
}