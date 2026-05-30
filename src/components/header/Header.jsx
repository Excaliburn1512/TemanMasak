import { useState } from 'react'
import IconNotifikasi from '../icons/IconNotifikasi'
import IconSetting from '../icons/IconSetting'
import './Header.css'

function Header() {
  const [notifActive, setNotifActive] = useState(false)
  const [notifBounce, setNotifBounce] = useState(false)
  const [settingActive, setSettingActive] = useState(false)

  function tanganiNotif() {
    setNotifActive((prev) => !prev)
    setNotifBounce(true)
    setTimeout(() => setNotifBounce(false), 400)
  }

  function tanganiSetting() {
    setSettingActive((prev) => !prev)
  }

  return (
    <header className="header">
      <span className="header-logo">Teman Masak</span>
      <div className="header-actions">

        <button
          className={`header-icon-btn ${notifBounce ? 'bounce' : ''}`}
          aria-label="Notifikasi"
          onClick={tanganiNotif}
        >
          <IconNotifikasi color={notifActive ? '#E53935' : '#006E0A'} />
          {notifActive && <span className="header-notif-dot" />}
        </button>

        <button
          className="header-icon-btn"
          aria-label="Pengaturan"
          onClick={tanganiSetting}
        >
          <span className={`header-setting-icon ${settingActive ? 'spinning' : ''}`}>
            <IconSetting color={settingActive ? '#FFA504' : '#006E0A'} />
          </span>
        </button>

        <div className="header-avatar">
          <span className="header-avatar-initials">TM</span>
        </div>

      </div>
    </header>
  )
}

export default Header