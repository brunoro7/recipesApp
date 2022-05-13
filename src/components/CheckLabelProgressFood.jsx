import PropTypes from 'prop-types';
import React from 'react';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';

class BoxStepInProgressFood extends React.Component {
  constructor() {
    super();
    this.state = {
      inputCheck: false,
      classIngredient: 'ingredientLineFood',
      arrayCocktailsComparProgress: [],
      arrayMealsComparProgress: [],
    };
  }

  componentDidMount() {
    this.setComparProgressStorage();
  }

  setComparProgressStorage = () => {
    const localStorageComparProgress = JSON
      .parse(localStorage.getItem('comparProgress'));

    const { objRecipeFood: { idMeal } } = this.props;
    const { arrayCocktailsComparProgress, arrayMealsComparProgress } = this.state;

    if ((localStorageComparProgress === null)
      || (arrayMealsComparProgress === {} && arrayCocktailsComparProgress === {})) {
      localStorage.setItem('comparProgress', JSON.stringify({
        cocktails: {},
        meals: { [idMeal]: [] },
      }));
    } else {
      localStorage.setItem('comparProgress', JSON.stringify({
        cocktails: { ...arrayCocktailsComparProgress },
        meals: { ...arrayMealsComparProgress },
      }));
    }
  };

  handleChangeChecked = (event) => {
    const clickEvent = event.target.value;

    this.setState((prevState) => ({
      inputCheck: !prevState.inputCheck,
    }), () => this.callCheckClassName());

    console.log('target', clickEvent);
  }

  callCheckClassName = () => {
    const { inputCheck } = this.state;
    // const { arrayMealsComparProgress } = this.state;

    if (inputCheck === true) {
      this.setState({
        classIngredient: 'ingredientLineFoodComplete',
      });
    } else {
      this.setState({
        classIngredient: 'ingredientLineFood',
      });
    }
  }

  //   const storageIngredientsProgress = JSON
  //   .parse(localStorage.getItem('inProgressRecipes'));
  // console.log(storageIngredientsProgress);

  render() {
    const { index, ingredientAndMeasure } = this.props;
    const { inputCheck, classIngredient } = this.state;

    return (
      <section className="boxIngredientsFood">
        <label
          key={ index }
          htmlFor="checkBoxProgress"
          data-testid={ `${index}-ingredient-step` }
          className={ classIngredient }
        >
          <input
            type="checkbox"
            name="checkBoxProgress"
            checked={ inputCheck }
            onChange={ this.handleChangeChecked }
            value={ ingredientAndMeasure }
          />
          { ingredientAndMeasure }
        </label>
      </section>
    );
  }
}

// obs: ajuda do Sugano! Serve p/ casos em que os valores primeiro chegam vazios;
BoxStepInProgressFood.defaultProps = {
  index: 0,
  ingredientAndMeasure: 'ingredient',
};

BoxStepInProgressFood.propTypes = {
  index: PropTypes.number,
  ingredientAndMeasure: PropTypes.string,
  objRecipeFood: PropTypes.objectOf(PropTypes.any).isRequired,
  // handleBtnIsDisable: PropTypes.func.isRequired,
};

export default BoxStepInProgressFood;
