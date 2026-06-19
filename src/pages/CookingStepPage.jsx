import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import StepCard from '../features/cooking/components/StepCard';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { normalizeCookingSteps, safeParseJson } from '../utils/recipe';
import '../styles/cooking-step-page.css';

function CookingStepPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('current-step');

    const returnSessionId = useMemo(() => (
        location.state?.returnSessionId ||
        localStorage.getItem(STORAGE_KEYS.activeCookingSessionId) ||
        null
    ), [location.state]);

    const recipeData = useMemo(() => {
        const recipeFromState =
            location.state?.recipe ||
            safeParseJson(localStorage.getItem(STORAGE_KEYS.selectedRecipe));

        return normalizeCookingSteps(recipeFromState);
    }, [location.state]);

    const totalSteps = recipeData.steps.length;

    function handleNextStep() {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex((prevIndex) => prevIndex + 1);
            return;
        }

        handleFinishCooking();
    }

    function handlePrevStep() {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prevIndex) => prevIndex - 1);
        }
    }

    function handleFinishCooking() {
        navigate('/chat', {
            state: {
                cookingFinished: true,
                startNewChat: true,
                returnSessionId,
                finishedRecipeTitle: recipeData.name || recipeData.title || 'Masakan',
            },
        });
    }

    function handleTabChange(tab) {
        setActiveTab(tab);

        if (tab === 'ingredients') {
            navigate('/ingredients', {
                state: {
                    recipe: recipeData,
                    returnSessionId,
                },
            });
        }
    }

    return (
        <div className="cooking-step-page">
            <Header />

            <div className="cooking-page">
                <Sidebar
                    recipe={recipeData}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    onSelesai={handleFinishCooking}
                />

                <StepCard
                    recipeData={recipeData}
                    currentStepIndex={currentStepIndex}
                    totalSteps={totalSteps}
                    onNextStep={handleNextStep}
                    onPrevStep={handlePrevStep}
                />
            </div>
        </div>
    );
}

export default CookingStepPage;
