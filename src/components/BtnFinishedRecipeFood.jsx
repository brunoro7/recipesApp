import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class BtnFinishedRecipeFood extends React.Component {
  render() {
    const { btnIsDisable } = this.props;

    const buttonFinish = (
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="btnInitRecipeFood"
          disabled={ btnIsDisable }
        >
          Finish Recipe
        </button>
      </Link>
    );

    const comparIsDisable = (btnIsDisable) ? '' : buttonFinish;

    return comparIsDisable;
  }
}

BtnFinishedRecipeFood.propTypes = {
  btnIsDisable: PropTypes.bool.isRequired,
};

export default BtnFinishedRecipeFood;
