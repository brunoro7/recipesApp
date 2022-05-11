import React from 'react';
import PropTypes from 'prop-types';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class BoxStepInProgressDrinks extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultCheckState: false,
    };
  }

  handleChangeCheck = (event) => {
    const inputCheckClick = event.target.checked;

    this.setState((prevState) => ({
      defaultCheckState: !prevState.defaultCheckState,
    }));
    console.log(inputCheckClick);
    console.log('oi');
  }

  render() {
    const { objRecipeDrink } = this.props;
    const { defaultCheckState } = this.state;

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
    // console.log(arrayIngredients);
    const arrayIngredientAndMeasure = arrayIngredients
      .filter((element) => element !== '' && element !== ' ')
      .map((item, index) => (arrayMeasures[index] !== undefined
        ? `${item} - ${arrayMeasures[index]}` : item));
    // console.log(arrayIngredientAndMeasure);

    return (
      <section className="boxIngredientsDrink">
        <h3 className="titleIngredientsDrink">Ingredientes</h3>
        <div className="boxListIngredientsDrink">
          {
            arrayIngredientAndMeasure.map((ingredientAndMeasure, index) => (
              <label
                htmlFor="checkBoxProgress"
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  name="checkBoxProgress"
                  className="ingredientLineDrink"
                  checked={ defaultCheckState }
                  onChange={ this.handleChangeCheck }
                />
                { ingredientAndMeasure }
              </label>
            ))
          }
        </div>
      </section>
    );
  }
}

BoxStepInProgressDrinks.propTypes = {
  objRecipeDrink: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BoxStepInProgressDrinks;
