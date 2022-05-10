import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchNascionalitesFood,
  fetchFoodsByNascionalite,
  setDefaultNameFood } from '../services/apiServicesFoods';
import CardRecipeFoods from '../components/CardRecipeFoods';

class ExploreFoodsNationalities extends React.Component {
  constructor() {
    super();
    this.state = {
      titleFoodsNacionalite: '',
      nacionalitesFood: '',
      nacionaliteValue: '',
      foodsByNacionalite: '',
      defaultDataFood: [],
      dropDownOn: false,
    };
  }

  componentDidMount() {
    this.handlePageName();
    this.callNacionaliteFood();
  }

  callNacionaliteFood = async () => {
    const nacionalitesFood = await fetchNascionalitesFood();
    this.setState({
      nacionalitesFood,
    });
  }

  handleChange = async ({ target }) => {
    this.setState({
      nacionaliteValue: target.value,
      dropDownOn: false,
    });
    if (target.value !== 'All') {
      const foodsByNacionalite = await fetchFoodsByNascionalite(target.value);
      this.setState({
        foodsByNacionalite,
        dropDownOn: true,
      });
    } else {
      const defaultDataFood = await setDefaultNameFood();
      this.setState({
        defaultDataFood,
        dropDownOn: false,
      });
    }
  }

  handlePageName = async () => {
    const { match } = this.props;
    const defaultDataFood = await setDefaultNameFood();
    let titleName;
    if (match.path === '/explore/foods/nationalities') {
      titleName = 'Explore Nationalities';
      this.setState({
        titleFoodsNacionalite: titleName,
        defaultDataFood,
      });
    }
  };

  render() {
    const { titleFoodsNacionalite,
      nacionalitesFood,
      nacionaliteValue,
      foodsByNacionalite,
      defaultDataFood,
      dropDownOn } = this.state;
    const TWELVE = 12;
    const compareDefault = (dropDownOn) ? foodsByNacionalite : defaultDataFood;
    return (
      <>
        <Header titlePage={ titleFoodsNacionalite } />
        <select
          name="nacionalite"
          id="nacionalite"
          value={ nacionaliteValue }
          data-testid="explore-by-nationality-dropdown"
          onChange={ this.handleChange }
        >
          <option value="All" data-testid="All-option">
            All
          </option>
          { nacionalitesFood.meals && nacionalitesFood.meals.map((nacionalite, index) => (
            <option
              key={ index }
              data-testid={ `${nacionalite.strArea}-option` }
              value={ nacionalite.strArea }
            >
              { nacionalite.strArea }
            </option>
          )) }
        </select>
        <div className="boxCards">
          { compareDefault.meals?.map((foodByNac, index) => (
            <CardRecipeFoods
              dataTestINDEX={ index }
              source={ foodByNac.strMealThumb }
              recipeCardName={ foodByNac.strMeal }
              key={ foodByNac.idMeal }
              idRecipe={ foodByNac.idMeal }
            />
          )).slice(0, TWELVE)}
        </div>
        <Footer />
      </>
    );
  }
}

ExploreFoodsNationalities.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

ExploreFoodsNationalities.contextType = MyContext;

export default ExploreFoodsNationalities;
