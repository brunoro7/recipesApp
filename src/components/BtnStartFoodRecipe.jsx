import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';

class BtnStartFoodRecipe extends React.Component {
  handleSetStorageInProgress = () => {
    const { objRecipeFood, idFoodRecipe } = this.props;

    const localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const arrayInProgressRecipes = Array(Object(localStorageInProgress));

    // console.log(arrayInProgressRecipes);

    const arrayIngredients = [];
    const arrayMeasures = [];
    const FIFTEEN = 15;
    for (let index = 1; index <= FIFTEEN; index += 1) {
      const strIngredient = `strIngredient${index}`;
      if ((objRecipeFood)[strIngredient] !== null) {
        arrayIngredients.push(objRecipeFood[strIngredient]);
        arrayMeasures.push(objRecipeFood[`strMeasure${index}`]);
      }
    }
    const arrayIngredientAndMeasure = arrayIngredients
      .filter((element) => element !== '' && element !== ' ')
      .map((item, index) => (arrayMeasures[index] !== undefined
        ? `${item} - ${arrayMeasures[index]}` : item));
    const ingredientsList = arrayIngredientAndMeasure?.map((ingredient) => ingredient);

    if (arrayInProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...arrayInProgressRecipes[0],
        meals: { [idFoodRecipe]: [...ingredientsList] },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...arrayInProgressRecipes[0],
        meals: { ...arrayInProgressRecipes[0].meals,
          [idFoodRecipe]: [...ingredientsList] },
      }));
    }
  }

  render() {
    const { idFoodRecipe } = this.props;
    return (
      <Link to={ `/foods/${idFoodRecipe}/in-progress` }>
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

BtnStartFoodRecipe.propTypes = {
  idFoodRecipe: PropTypes.string.isRequired,
  objRecipeFood: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BtnStartFoodRecipe;
