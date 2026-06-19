import './StepCard.css';
import { getNutritionCards, normalizeNutrition } from '../../../utils/nutrition';

function StepCard({
    recipeData,
    currentStepIndex = 0,
    totalSteps = 0,
    onNextStep = () => {},
    onPrevStep = () => {},
}) {
    const steps = recipeData?.steps || [];
    const safeIndex = Math.min(Math.max(currentStepIndex, 0), steps.length - 1);
    const currentStep = steps[safeIndex] || null;

    const progressPercent =
        totalSteps > 0 ? ((safeIndex + 1) / totalSteps) * 100 : 0;

    const nutrition = normalizeNutrition(recipeData);
    const nutritionCards = getNutritionCards(nutrition);

    if (!currentStep) {
        return (
            <main className="step-card-wrapper">
                <div className="step-card">
                    <p>Langkah memasak belum tersedia.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="step-card-wrapper">
            <div className="step-card">
                <div className="step-progress-track">
                    <div
                        className="step-progress-fill"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                <div className="step-badge">
                    Langkah {safeIndex + 1} dari {totalSteps}
                </div>

                <h1 className="step-title">
                    {currentStep.title || `Langkah ${safeIndex + 1}`}
                </h1>

                <div className="step-image-wrapper">
                    <img
                        src={currentStep.image || recipeData.thumbnail}
                        alt={currentStep.title || recipeData.name}
                        className="step-image"
                    />
                </div>

                <div className="step-description">
                    {currentStep.description}
                </div>

                {nutritionCards.length > 0 && (
                    <div className="step-nutrition-strip">
                        {nutritionCards.map((item) => (
                            <div key={item.key} className="step-nutrition-item">
                                <strong>{item.value}</strong>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="step-actions">
                    <button
                        type="button"
                        className="step-btn step-btn-outline"
                        onClick={onPrevStep}
                        disabled={safeIndex === 0}
                    >
                        ← Langkah Sebelumnya
                    </button>

                    <button
                        type="button"
                        className="step-btn step-btn-primary"
                        onClick={onNextStep}
                    >
                        {safeIndex === totalSteps - 1
                            ? 'Selesai Memasak'
                            : 'Langkah Selanjutnya →'}
                    </button>
                </div>
            </div>
        </main>
    );
}

export default StepCard;