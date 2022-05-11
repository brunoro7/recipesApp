import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Recomendation.css';

class BtnContinueDrinkRecipe extends React.Component {
  render() {
    const { idDrinkRecipe } = this.props;
    return (
      <Link to={ `/foods/${idDrinkRecipe}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btnInitRecipeFood"
        >
          Continue Recipe
        </button>
      </Link>
    );
  }
}

BtnContinueDrinkRecipe.propTypes = {
  idDrinkRecipe: PropTypes.string.isRequired,
};

export default BtnContinueDrinkRecipe;
