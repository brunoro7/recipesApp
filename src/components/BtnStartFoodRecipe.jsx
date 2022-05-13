import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';

class BtnStartFoodRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayCocktailsInProgress: [],
      arrayMealsInProgress: [],
      arrayCocktailsComparProgress: [],
      arrayMealsComparProgress: [],
    };
  }

  componentDidMount() {
    this.setArraysLocalStorage();
  }

  setArraysLocalStorage = () => {
    const localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const localStorageComparProgress = JSON.parse(localStorage.getItem('comparProgress'));

    if (localStorageInProgress !== null) {
      const arrayInProgressRecipes = Array(Object.values(localStorageInProgress));
      this.setState({
        arrayCocktailsInProgress: arrayInProgressRecipes[0][0],
        arrayMealsInProgress: arrayInProgressRecipes[0][1],
      });
    }

    if (localStorageComparProgress !== null) {
      const arrayComparProgress = Array(Object.values(localStorageComparProgress));
      this.setState({
        arrayCocktailsComparProgress: arrayComparProgress[0][0],
        arrayMealsComparProgress: arrayComparProgress[0][1],
      });
    }
  }

  setComparProgressStorage = () => {
    const localStorageComparProgress = JSON.parse(localStorage.getItem('comparProgress'));

    const { idFoodRecipe } = this.props;
    const { arrayCocktailsComparProgress, arrayMealsComparProgress } = this.state;

    if ((localStorageComparProgress === null)
      || (arrayMealsComparProgress === {} && arrayCocktailsComparProgress === {})) {
      localStorage.setItem('comparProgress', JSON.stringify({
        cocktails: {},
        meals: { [idFoodRecipe]: [] },
      }));
    } else {
      localStorage.setItem('comparProgress', JSON.stringify({
        cocktails: { ...arrayCocktailsComparProgress },
        meals: { ...arrayMealsComparProgress,
          [idFoodRecipe]: [...arrayMealsComparProgress] },
      }));
    }
  }

  handleSetStorageInProgress = () => {
    const { objRecipeFood, idFoodRecipe } = this.props;
    const { arrayCocktailsInProgress, arrayMealsInProgress } = this.state;

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

    if ((arrayMealsInProgress === null && arrayCocktailsInProgress === null)
      || (arrayCocktailsInProgress === {} && arrayMealsInProgress === {})) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: { [idFoodRecipe]: [...ingredientsList] },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { ...arrayCocktailsInProgress },
        meals: { ...arrayMealsInProgress,
          [idFoodRecipe]: [...ingredientsList] },
      }));
    }
  }

  handleClickStart = () => {
    this.handleSetStorageInProgress();
    this.setComparProgressStorage();
  }

  render() {
    // const { arrayMealsInProgress, arrayCocktailsInProgress } = this.state;
    const { idFoodRecipe } = this.props;

    // console.log('cocktails', arrayCocktailsInProgress);
    // console.log('meals', arrayMealsInProgress);

    return (
      <Link to={ `/foods/${idFoodRecipe}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btnInitRecipeFood"
          onClick={ this.handleClickStart }
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
