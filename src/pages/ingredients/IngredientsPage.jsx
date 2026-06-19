import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import IngredientList from '../../components/ingredient-list/IngredientList';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { normalizeRecipe, safeParseJson } from '../../utils/recipe';
import { getNutritionCards, getNutritionMatchText, normalizeNutrition } from '../../utils/nutrition';
import './IngredientsPage.css';

function IngredientsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('ingredients');

    const returnSessionId = useMemo(() => (
        location.state?.returnSessionId ||
        localStorage.getItem(STORAGE_KEYS.activeCookingSessionId) ||
        null
    ), [location.state]);

    const recipeData = useMemo(() => {
        const recipeFromChat =
            location.state?.recipe ||
            safeParseJson(localStorage.getItem(STORAGE_KEYS.selectedRecipe));

        return normalizeRecipe(recipeFromChat);
    }, [location.state]);

    const nutrition = normalizeNutrition(recipeData);
    const nutritionCards = getNutritionCards(nutrition);
    const nutritionMatchText = getNutritionMatchText(nutrition);

    function handleTabChange(tab) {
        setActiveTab(tab);

        if (tab === 'current-step') {
            navigate('/cooking', {
                state: {
                    recipe: recipeData,
                    returnSessionId,
                },
            });
        }
    }

    function handleStartCooking() {
        localStorage.setItem(STORAGE_KEYS.selectedRecipe, JSON.stringify(recipeData));

        if (returnSessionId) {
            localStorage.setItem(STORAGE_KEYS.activeCookingSessionId, String(returnSessionId));
        }

        navigate('/cooking', {
            state: {
                recipe: recipeData,
                returnSessionId,
            },
        });
    }

    function handleFinishCooking() {
        navigate('/chat', {
            state: {
                returnSessionId,
                startNewChat: false,
            },
        });
    }

    return (
        <div className="ingredients-page">
            <Header />

            <div className="ingredients-body">
                <Sidebar
                    recipe={recipeData}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    onSelesai={handleFinishCooking}
                />

                <main className="ingredients-main">
                    <div className="ingredients-content">
                        <section className="ingredients-hero-wrapper">
                            <img
                                src={recipeData.thumbnail}
                                alt={recipeData.name}
                                className="ingredients-hero-img"
                            />

                            <div className="ingredients-hero-overlay">
                                <span className="ingredients-hero-badge">{recipeData.category}</span>
                                <h1 className="ingredients-hero-title">{recipeData.name}</h1>
                            </div>
                        </section>

                        {nutritionCards.length > 0 && (
                            <section className="ingredients-nutrition-card">
                                <div className="ingredients-nutrition-heading">
                                    <div>
                                        <span>Estimasi Nutrisi</span>
                                        <h2>Kandungan Nutrisi Resep</h2>
                                    </div>
                                    <p>{nutrition.basis}</p>
                                </div>

                                <div className="ingredients-nutrition-grid">
                                    {nutritionCards.map((item) => (
                                        <div key={item.key} className="ingredients-nutrition-item">
                                            <strong>{item.value}</strong>
                                            <span>{item.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {nutritionMatchText && (
                                    <p className="ingredients-nutrition-match">
                                        {nutritionMatchText}
                                    </p>
                                )}
                            </section>
                        )}

                        <IngredientList
                            ingredients={recipeData.ingredients}
                            servesText={recipeData.servesText}
                            onMulaiMasak={handleStartCooking}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default IngredientsPage;
