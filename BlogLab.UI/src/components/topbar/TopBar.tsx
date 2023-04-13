import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";


export default function TopBar(): JSX.Element {
const { user, dispatch } = useContext(Context);
//const PF = "http://localhost:5000/images/";

const handleLogout = () => {
dispatch({ type: "LOGOUT" });
};

return (
<div className="top">
<div className="topLeft">
<i className="fa-solid fa-meteor"></i>
<i className="MBRKCL BLOG">MBRKCL BLOG</i>
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
<i className="fa-solid fa-star"></i>
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
<Link className="link" to="/posts"></Link>
</div>
</div>
);
}