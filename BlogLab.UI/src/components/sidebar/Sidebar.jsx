import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../config/env";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(config.APP_URL+"/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">Hakkımda</span>
        <img
          src="https://avatars.githubusercontent.com/u/108813428?v=4"
          alt=""
        />
        <p>

        Merhaba👋
💻Şu anda .NET ve JavaScript React üzerinde çalışıyorum
📚Kendimi geliştirmek için eğitimime devam ediyorum.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Kategoriler</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      
      </div>
  );
}