import React from 'react';
import PropTypes from 'prop-types';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';
import CheckLabelProgressFood from './CheckLabelProgressFood';

class BoxStepInProgressFood extends React.Component {
  constructor() {
    super();
    this.state = {
      // ingredientDone: false,
    };
  }

  componentDidMount() {
    // this.handleArrayMeasures();
  }

  // const { handleBtnIsDisable } = this.props;
  // handleBtnIsDisable();

  render() {
    const { objRecipeFood, handleBtnIsDisable } = this.props;

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
    // console.log(arrayIngredients);
    const arrayIngredientAndMeasure = arrayIngredients
      .filter((element) => element !== '' && element !== ' ')
      .map((item, index) => (arrayMeasures[index] !== undefined
        ? `${item} - ${arrayMeasures[index]}` : item));
    // console.log(arrayIngredientAndMeasure);

    // arrayCompar.length === arrayIngredientAndMeasure
    // if()
    // {filtra === todos true } arrayIngredientAndMeasure[0]

    return (
      <section className="boxIngredientsFood">
        <h3 className="titleIngredientsFood">Ingredientes</h3>
        <div className="boxListIngredientsFood">
          { arrayIngredientAndMeasure.map((ingredientAndMeasure, index) => (
            <CheckLabelProgressFood
              key={ index }
              index={ index }
              ingredientAndMeasure={ ingredientAndMeasure }
              handleBtnIsDisable={ handleBtnIsDisable }
              objRecipeFood={ objRecipeFood }
            />
          ))}
        </div>
      </section>
    );
  }
}

BoxStepInProgressFood.propTypes = {
  objRecipeFood: PropTypes.objectOf(PropTypes.any).isRequired,
  handleBtnIsDisable: PropTypes.func.isRequired,
};

export default BoxStepInProgressFood;
