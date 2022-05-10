// import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class BtnFinishedRecipeFood extends React.Component {
  render() {
    // const { idDrinkRecipe } = this.props;
    return (
      // <Link to={ `/drinks/${idDrinkRecipe}/in-progress` }>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="btnInitRecipeDrink"
      >
        Finish Recipe
      </button>
      // </Link>
    );
  }
}

BtnFinishedRecipeFood.propTypes = {
  // idDrinkRecipe: PropTypes.string.isRequired,
};

export default BtnFinishedRecipeFood;
