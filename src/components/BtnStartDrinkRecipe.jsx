import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class BtnStartDrinkRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayCocktailsInProgress: [],
      arrayMealsInProgress: [],
    };
  }

  componentDidMount() {
    this.setArraysLocalStorage();
  }

  setArraysLocalStorage = () => {
    const localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (localStorageInProgress !== null) {
      const arrayInProgressRecipes = Array(Object.values(localStorageInProgress));
      this.setState({
        arrayCocktailsInProgress: arrayInProgressRecipes[0][0],
        arrayMealsInProgress: arrayInProgressRecipes[0][1],
      });
    }
  }

  handleSetStorageInProgress = () => {
    const { objRecipeDrink, idDrinkRecipe } = this.props;

    const { arrayCocktailsInProgress, arrayMealsInProgress } = this.state;

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

    if ((arrayMealsInProgress === null && arrayCocktailsInProgress === null)
    || (arrayCocktailsInProgress === {} && arrayMealsInProgress === {})) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { [idDrinkRecipe]: [...ingredientsList] },
        meals: {},
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { ...arrayCocktailsInProgress,
          [idDrinkRecipe]: [...ingredientsList] },
        meals: { ...arrayMealsInProgress },
      }));
    }
  }

  render() {
    // const { arrayMealsInProgress, arrayCocktailsInProgress } = this.state;

    // console.log('cocktails', arrayCocktailsInProgress);
    // console.log('meals', arrayMealsInProgress);

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
