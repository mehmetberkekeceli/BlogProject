import "./header.css";

const Header = (): JSX.Element => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & .NET</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://wallpaper.dog/large/834571.png"
        alt=""
      />
    </div>
  );
}

export default Header;
