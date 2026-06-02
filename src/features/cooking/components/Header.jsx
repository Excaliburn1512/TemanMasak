import ProfileImage from "../../../assets/user_profile.png";
import BellIcon from "../../../assets/icons/bell.svg";
import SettingIcon from "../../../assets/icons/setting.svg";
import { FiMenu } from "react-icons/fi";

function Header() {
  return (
    <header className="page-header">
      <h1 className="logo-title">
        Teman Masak
      </h1>

      <div className="header-actions">
        <button className="header-icon-btn">
            <img src={BellIcon} alt="Notification" />
        </button>

        <button className="header-icon-btn">
            <img src={SettingIcon} alt="Setting" />
        </button>

        <img
            src={ProfileImage}
            alt="User"
            className="user-avatar"
            />
      </div>
    </header>
  );
}

export default Header;