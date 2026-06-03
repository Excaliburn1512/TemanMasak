import { useState } from 'react'
import IngredientItem from './IngredientItem'
import Button from '../ui/Button'
import IconStartCooking from '../icons/IconStartCooking'
import './IngredientList.css'

function IngredientList({ ingredients = [], servesText = '', onMulaiMasak }) {
  const [checkedItems, setCheckedItems] = useState({})
  const [loading, setLoading] = useState(false)

  const allChecked =
    ingredients.length > 0 && ingredients.every((_, i) => checkedItems[i])

  function tanganiToggleItem(index) {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  function tanganiPilihSemua() {
    if (allChecked) {
      setCheckedItems({})
    } else {
      const all = {}
      ingredients.forEach((_, i) => { all[i] = true })
      setCheckedItems(all)
    }
  }

  function tanganiMulaiMasak() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onMulaiMasak?.()
    }, 1200)
  }

  return (
    <div className="ingredient-list-card">
      <div className="ingredient-list-header">
        <div>
          <h2 className="ingredient-list-title">Ingredients</h2>
          <p className="ingredient-list-serves">{servesText}</p>
        </div>
        <Button
          variant="accent"
          className={allChecked ? 'selected' : ''}
          onClick={tanganiPilihSemua}
        >
          Select All
        </Button>
      </div>

      <hr className="ingredient-divider" />

      <div className="ingredient-list-items">
        {ingredients.map((item, index) => (
          <IngredientItem
            key={index}
            label={item}
            checked={!!checkedItems[index]}
            onToggle={() => tanganiToggleItem(index)}
          />
        ))}
      </div>

      <div className="ingredient-list-action">
        <button
          className={`start-cooking-btn ${loading ? 'loading' : ''}`}
          onClick={tanganiMulaiMasak}
          disabled={loading}
        >
          <span className="start-cooking-icon">
            {loading
              ? <span className="start-cooking-spinner" />
              : <IconStartCooking size={18} />
            }
          </span>
          <span>{loading ? 'Starting...' : 'Start Cooking'}</span>
        </button>
      </div>
    </div>
  )
}

export default IngredientList