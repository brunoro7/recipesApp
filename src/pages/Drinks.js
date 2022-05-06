import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipeDrinks from '../components/CardRecipeDrinks';
import '../components/CardRecipes.css';
import FiltersCategoryDrink from '../components/FiltersCategoryDrink';

class Drinks extends React.Component {
  constructor() {
    super();
    this.state = {
      titleDrinks: '',
      categoryRecipes: '',
      btnCategoryIsON: false,
      updateBtnName: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;
    const { handleDefaultDataDrink } = this.context;

    let titleName;

    if (match.path === '/drinks') {
      titleName = 'Drinks';
      this.setState({
        titleDrinks: titleName,
      });
    }
    handleDefaultDataDrink();
  };

  filterByCategory = async (btnName) => {
    const { btnCategoryIsON, updateBtnName } = this.state;

    if (btnName === 'All' && btnName !== updateBtnName) {
      const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(urlName);
      const data = await response.json();

      this.setState({
        categoryRecipes: data.drinks,
        btnCategoryIsON: false,
      });
    }

    if (btnName !== 'All') {
      if (btnCategoryIsON === true && updateBtnName === btnName) {
        const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(urlName);
        const data = await response.json();

        this.setState({
          categoryRecipes: data.drinks,
          btnCategoryIsON: false,
          updateBtnName: '',
        });
      } else {
        const urlName = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${btnName}`;
        const response = await fetch(urlName);
        const data = await response.json();

        this.setState({
          categoryRecipes: data.drinks,
          btnCategoryIsON: true,
          updateBtnName: btnName,
        });
      }
    }
  }

  filterArraySearch = () => {
    const { dataName, dataIngredient, filterRadios, dataFirstLetter } = this.context;

    if (filterRadios === 'firstLetter') {
      return dataFirstLetter.drinks;
    }
    if (filterRadios === 'name') {
      return dataName.drinks;
    }
    if (filterRadios === 'ingredient') {
      return dataIngredient.drinks;
    }
  };

  render() {
    const { titleDrinks, categoryRecipes } = this.state;
    const { pathRec, dataName, searchValue, searchOn, defaultDataDrink } = this.context;

    const TWELVE = 12;
    const sectionCardsDrinks = (
      <section className="boxCards">
        {
          this.filterArraySearch()?.map((recipe, index) => (
            <CardRecipeDrinks
              dataTestINDEX={ index }
              source={ recipe.strDrinkThumb }
              recipeCardName={ recipe.strDrink }
              key={ recipe.idDrink }
              idRecipe={ recipe.idDrink }
            />
          )).slice(0, TWELVE)
        }
      </section>
    );

    const comparCategory = (categoryRecipes === null
      || categoryRecipes.length === 0)
      ? defaultDataDrink.drinks : categoryRecipes;

    const defaultCardsDrinks = (
      <section className="boxCards">
        {
          comparCategory?.map((item, index) => (
            <CardRecipeDrinks
              dataTestINDEX={ index }
              source={ item.strDrinkThumb }
              recipeCardName={ item.strDrink }
              key={ item.idDrink }
              idRecipe={ item.idDrink }
            />
          )).slice(0, TWELVE)
        }
      </section>
    );

    const comparSearchON = searchOn ? sectionCardsDrinks : defaultCardsDrinks;
    const alertNoRecipes = 'Sorry, we haven\'t found any recipes for these filters.';

    return (
      <>
        <Header titlePage={ titleDrinks } />
        { pathRec && <Redirect to={ pathRec } /> }
        { (dataName.drinks === null && searchValue !== '')
          && global.alert(alertNoRecipes) }

        <FiltersCategoryDrink filterByCategory={ this.filterByCategory } />

        <section className="boxRecipes">
          { comparSearchON }
        </section>

        <Footer />
      </>
    );
  }
}

Drinks.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Drinks.contextType = MyContext;

export default Drinks;
