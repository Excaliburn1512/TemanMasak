import { useState } from 'react'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import IngredientList from '../../components/ingredient-list/IngredientList'
import heroImg from '../../assets/hero.png'
import './IngredientsPage.css'

const recipeData = {
  thumbnail: heroImg,
  name: 'Ayam Lemon Bawang & Bayam',
  duration: '25 mins',
  difficulty: 'Sedang',
  category: 'Main Course',
  servesText: 'Serves 2–3 people',
  ingredients: [
    '500g Paha Ayam Fillet',
    '3 siung Bawang Putih (cincang)',
    '1 buah Lemon (peras)',
    '1 ikat Bayam',
    '2 sdm Minyak Zaitun',
    'Garam & Merica secukupnya',
  ],
}

function IngredientsPage() {
  const [activeTab, setActiveTab] = useState('ingredients')

  function tanganiGantiTab(tab) {
    setActiveTab(tab)
  }

  function tanganiSelesaiMemasak() {}

  return (
    <div className="ingredients-page">
      <Header />

      <div className="ingredients-body">
        <Sidebar
          recipe={recipeData}
          activeTab={activeTab}
          onTabChange={tanganiGantiTab}
          onSelesai={tanganiSelesaiMemasak}
        />

        <div className="ingredients-main">
          <div className="ingredients-content">
            <div className="ingredients-hero-wrapper">
              <img
                src={heroImg}
                alt={recipeData.name}
                className="ingredients-hero-img"
              />
              <div className="ingredients-hero-overlay">
                <span className="ingredients-hero-badge">{recipeData.category}</span>
                <h1 className="ingredients-hero-title">{recipeData.name}</h1>
              </div>
            </div>

            <IngredientList
              ingredients={recipeData.ingredients}
              servesText={recipeData.servesText}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IngredientsPage