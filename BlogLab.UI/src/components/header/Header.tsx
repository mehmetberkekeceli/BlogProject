import "./header.css";
import HomePhoto from '../../photos/HomePhoto.png';

const Header = (): JSX.Element => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & .NET</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src={HomePhoto}
        alt=""
      />
    </div>
  );
}

export default Header;
