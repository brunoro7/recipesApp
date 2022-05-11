import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class BtnFinishedRecipeFood extends React.Component {
  render() {
    return (
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="btnInitRecipeDrink"
        >
          Finish Recipe
        </button>
      </Link>
    );
  }
}

export default BtnFinishedRecipeFood;
