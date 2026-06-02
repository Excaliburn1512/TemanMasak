function NavItem({ id, label, icon, isActive, onClick }) {
  return (
    <button
      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
      onClick={() => onClick(id)}
    >
      <div className="sidebar-nav-bg" />
      <span className="sidebar-nav-icon">{icon(isActive)}</span>
      <span>{label}</span>
    </button>
  )
}

export default NavItem