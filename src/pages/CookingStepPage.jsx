import { useEffect, useState } from "react";
import Header from "../features/cooking/components/Header";
import RecipeSidebar from "../features/cooking/components/RecipeSidebar";
import StepCard from "../features/cooking/components/StepCard";
import { fetchRecipeData } from "../features/cooking/services/cookingService";
import "../styles/cooking-step-page.css";

function CookingStepPage() {
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const loadRecipeData = async () => {
      const response = await fetchRecipeData();
      setRecipeData(response);
    };

    loadRecipeData();
  }, []);

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />

      <div className="cooking-page">
        <RecipeSidebar recipeData={recipeData} />

        <StepCard recipeData={recipeData} />
      </div>
    </>
  );
}

export default CookingStepPage;