import ArrowLeft from "../../../assets/icons/arrow_left.svg";
import ArrowRight from "../../../assets/icons/arrow_right.svg";

function StepNavigation() {
  return (
    <div className="navigation-buttons">

      <button className="previous-button">
        <img src={ArrowLeft} alt="Previous" className="nav-icon" />
        <span>Langkah Sebelumnya</span>
      </button>

      <button className="next-button">
        <span>Langkah Selanjutnya</span>
        <img src={ArrowRight} alt="Next" className="nav-icon" />
      </button>

    </div>
  );
}

export default StepNavigation;
