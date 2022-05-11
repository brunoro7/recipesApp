import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class BtnStartDrinkRecipe extends React.Component {
  handleSetStorageInProgress = () => {
    const { objRecipeDrink, idDrinkRecipe } = this.props;

    const localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const arrayInProgressRecipes = Array(Object(localStorageInProgress));

    // console.log(arrayInProgressRecipes);

    const arrayIngredients = [];
    const arrayMeasures = [];
    const FIFTEEN = 15;
    for (let index = 1; index <= FIFTEEN; index += 1) {
      const strIngredient = `strIngredient${index}`;
      if ((objRecipeDrink)[strIngredient] !== null) {
        arrayIngredients.push(objRecipeDrink[strIngredient]);
        arrayMeasures.push(objRecipeDrink[`strMeasure${index}`]);
      }
    }
    const arrayIngredientAndMeasure = arrayIngredients
      .filter((element) => element !== '' && element !== ' ')
      .map((item, index) => (arrayMeasures[index] !== undefined
        ? `${item} - ${arrayMeasures[index]}` : item));
    const ingredientsList = arrayIngredientAndMeasure?.map((ingredient) => ingredient);

    if (arrayInProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { [idDrinkRecipe]: [...ingredientsList] },
        ...arrayInProgressRecipes[0],
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { ...arrayInProgressRecipes[0].drinks,
          [idDrinkRecipe]: [...ingredientsList] },
        ...arrayInProgressRecipes[0],
      }));
    }
  }

  render() {
    const { idDrinkRecipe } = this.props;
    return (
      <Link to={ `/drinks/${idDrinkRecipe}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btnInitRecipeFood"
          onClick={ this.handleSetStorageInProgress }
        >
          Start Recipe
        </button>
      </Link>
    );
  }
}

BtnStartDrinkRecipe.propTypes = {
  idDrinkRecipe: PropTypes.string.isRequired,
  objRecipeDrink: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BtnStartDrinkRecipe;
