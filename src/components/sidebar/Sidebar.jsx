import { useState } from 'react'
import IconIngredients from '../icons/IconIngredients'
import IconCurrentStep from '../icons/IconCurrentStep'
import NavItem from '../ui/NavItem'
import './Sidebar.css'

const NAV_ITEMS = [
  {
    id: 'ingredients',
    label: 'Ingredients',
    icon: (isActive) => (
      <IconIngredients color={isActive ? 'var(--color-primary)' : '#888'} size={16} />
    ),
  },
  {
    id: 'current-step',
    label: 'Current Step',
    icon: (isActive) => (
      <IconCurrentStep color={isActive ? 'var(--color-primary)' : '#3D4A39'} size={18} />
    ),
  },
]

function Sidebar({ recipe, activeTab, onTabChange, onSelesai }) {
  const { thumbnail = '', name = '', duration = '', difficulty = '' } = recipe ?? {}
  const [selesaiConfirm, setSelesaiConfirm] = useState(false)

  function tanganiSelesai() {
    if (selesaiConfirm) {
      onSelesai?.()
      setSelesaiConfirm(false)
    } else {
      setSelesaiConfirm(true)
      setTimeout(() => setSelesaiConfirm(false), 3000)
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-recipe-info">
        <div className="sidebar-thumbnail-wrapper">
          <img
            src={thumbnail || 'https://placehold.co/90x90'}
            alt={name}
            className="sidebar-thumbnail"
          />
        </div>
        <h2 className="sidebar-recipe-name">{name}</h2>
        <p className="sidebar-recipe-meta">{duration} • {difficulty}</p>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeTab === item.id}
            onClick={onTabChange}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className={`sidebar-selesai-btn ${selesaiConfirm ? 'confirm' : ''}`}
          onClick={tanganiSelesai}
        >
          {selesaiConfirm ? 'Yakin Selesai?' : 'Selesai Memasak'}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar