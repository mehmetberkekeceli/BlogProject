import "./sidebar.css";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">Hakkımda</span>
        <img className="ImgSide"
          src="https://avatars.githubusercontent.com/u/108813428?v=4"
          alt=""
        />
        <p>
          Merhaba👋
          💻Şu anda .NET ve JavaScript React üzerinde çalışıyorum
          📚Kendimi geliştirmek için eğitimime devam ediyorum.
        </p>
      </div>
    </div>
  );
}
