import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconSetting from '../icons/IconSetting';
import UserAvatar from '../UserAvatar';
import ProfileSettingsModal from '../ProfileSettingsModal';
import ConfirmDialog from '../ConfirmDialog';
import { getStoredUsername, USER_PROFILE_EVENT } from '../../utils/userProfile';
import { handleUserLogout, requestBackendLogout } from '../../features/auth/services/authService';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [settingActive, setSettingActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [username, setUsername] = useState(getStoredUsername());

  useEffect(() => {
    function syncUsername() {
      setUsername(getStoredUsername());
    }

    window.addEventListener(USER_PROFILE_EVENT, syncUsername);
    window.addEventListener('storage', syncUsername);

    return () => {
      window.removeEventListener(USER_PROFILE_EVENT, syncUsername);
      window.removeEventListener('storage', syncUsername);
    };
  }, []);

  function tanganiSetting() {
    setSettingActive((prev) => !prev);
    setShowSettings(true);
  }

  function closeLogoutDialog() {
    if (!isLoggingOut) setShowLogoutConfirm(false);
  }

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      await requestBackendLogout();
    } catch (error) {
      console.warn('Logout backend gagal, token lokal tetap dihapus:', error);
    } finally {
      handleUserLogout();
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
      navigate('/login', { replace: true });
    }
  }

  return (
    <>
      <header className="header">
        <span className="header-logo">Teman Masak</span>

        <div className="header-actions">
          <button
            className="header-icon-btn"
            aria-label="Pengaturan"
            onClick={tanganiSetting}
            type="button"
          >
            <span className={`header-setting-icon ${settingActive ? 'spinning' : ''}`}>
              <IconSetting color={settingActive ? '#FFA504' : '#006E0A'} />
            </span>
          </button>

          <div className="header-user-profile" title={username}>
            <div className="header-user-text">
              <span>{username}</span>
              <small>Pengguna</small>
            </div>
            <UserAvatar username={username} size="sm" />
          </div>

          <button
            type="button"
            className="header-logout-btn"
            onClick={() => setShowLogoutConfirm(true)}
          >
            Logout
          </button>
        </div>
      </header>

      <ConfirmDialog
  open={showLogoutConfirm}
  type="danger"
  title="Logout dari Akun?"
  message="Kamu akan keluar dari sesi saat ini. Riwayat chat tetap tersimpan dan bisa dibuka lagi setelah login."
  cancelText="Batal"
  confirmText="Logout"
  loadingText="Logout..."
  isLoading={isLoggingOut}
  onCancel={() => setShowLogoutConfirm(false)}
  onConfirm={handleLogout}
/>

      <ProfileSettingsModal
        show={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}

export default Header;
