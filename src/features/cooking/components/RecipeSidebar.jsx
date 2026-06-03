import chickenImage from "../../../assets/chicken.png";
import IngredientsIcon from "../../../assets/icons/ingredients.svg";
import CurrentStepIcon from "../../../assets/icons/current.svg";

function RecipeSidebar({ recipeData = {} }) {
  return (
    <aside className="recipe-sidebar">
      <div className="recipe-info">
        <img
          src={chickenImage}
          alt={recipeData.title}
          className="recipe-thumbnail"
        />

        <h2>{recipeData.title}</h2>

        <p>
          {recipeData.duration} • {recipeData.difficulty}
        </p>
      </div>

      <div className="sidebar-menu">
        <button className="menu-item">
          <img
            src={IngredientsIcon}
            alt="Ingredients"
            className="menu-icon"
          />
          <span>Ingredients</span>
        </button>

        <button className="menu-item active">
          <img
            src={CurrentStepIcon}
            alt="Current Step"
            className="menu-icon"
          />
          <span>Current Step</span>
        </button>
      </div>

      <button className="finish-button">
        Selesai Memasak
      </button>
    </aside>
  );
}

export default RecipeSidebar;