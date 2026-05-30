import './IngredientItem.css'

function IngredientItem({ label, checked, onToggle }) {
  return (
    <div
      className={`ingredient-item ${checked ? 'checked' : ''}`}
      onClick={onToggle}
    >
      <div className={`ingredient-checkbox ${checked ? 'checked' : ''}`}>
        {checked && <span className="ingredient-checkmark">✓</span>}
      </div>
      <span className="ingredient-label">{label}</span>
    </div>
  )
}

export default IngredientItem