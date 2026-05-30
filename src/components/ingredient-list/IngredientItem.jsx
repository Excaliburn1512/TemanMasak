import {useRef} from 'react'
import './IngredientItem.css'

function IngredientItem({ label, checked, onToggle }) {
  const itemRef = useRef(null)

  function handleClick(e) {
    const element = itemRef.current
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`
    element.appendChild(ripple)
    setTimeout(() => ripple.remove(), 500)

    onToggle()
  }

  return (
    <div
      ref={itemRef}
      className={`ingredient-item ${checked ? 'checked' : ''}`}
      onClick={handleClick}
    >
      <div className={`ingredient-checkbox ${checked ? 'checked' : ''}`}>
        {checked && <span className="ingredient-checkmark">✓</span>}
      </div>
      <span className="ingredient-label">{label}</span>
    </div>
  )
}

export default IngredientItem