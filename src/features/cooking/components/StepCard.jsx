import chickenImage from "../../../assets/searing_chicken.png";
import StepNavigation from "./StepNavigation";

function StepCard({ recipeData = {} }) {
  return (
    <main className="step-content">
      <div className="step-card">
        <div className="progress-bar">
        <div
            className="progress-fill"
            style={{
                width: `${
                (recipeData.currentStep / recipeData.totalSteps) * 100
                }%`,
            }}
            ></div>
        </div>
        <span className="step-badge">
          Langkah {recipeData.currentStep} dari {recipeData.totalSteps}
        </span>

        <h1 className="step-title">
          {recipeData.stepTitle}
        </h1>

        <img
        src={chickenImage}
        alt={recipeData.stepTitle}
        className="recipe-image"
        />

        <div className="instruction-box">
          {recipeData.description}
        </div>

        <StepNavigation />
        </div>
    </main>
  );
}

export default StepCard;

