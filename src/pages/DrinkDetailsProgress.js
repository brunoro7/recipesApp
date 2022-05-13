import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import MyContext from '../context/MyContext';
import HeaderDetailsDrink from '../components/HeaderDetailsDrink';
import shareIcon from '../images/shareIcon.svg';
import BoxInstructionsDrink from '../components/BoxInstructionsDrink';
import { fetchIdDrinkRecipe } from '../services/apiServicesDrinks';
import BtnFinishedRecipeDrink from '../components/BtnFinishedRecipeDrink';
import BoxStepInProgressDrinks from '../components/BoxStepInProgressDrink';

class DrinkDetailsProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      // idFoodRecipe: '',
      objRecipeDrink: {},
      linkCopy: false,
      favoriteIsOn: false,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const idRecipeDrink = params.IdDrinkRecipe;
    // console.log(idRecipeDrink);
    this.fetchRecipeById(idRecipeDrink);
    this.handleStorageFavoriteDrink(idRecipeDrink);
  }

  fetchRecipeById = async (idRecipeDrink) => {
    const objRecipeDrink = await fetchIdDrinkRecipe(idRecipeDrink);

    this.setState({
      objRecipeDrink,
      // idFoodRecipe,
    });
  }

  handleShareRecipe = () => {
    const { match: { params } } = this.props;
    const idRecipeDrink = params.IdDrinkRecipe;

    const urlBase = `http://localhost:3000/drinks/${idRecipeDrink}`;
    console.log(urlBase);

    const copyUrlRecipe = clipboardCopy(urlBase);

    if (copyUrlRecipe) {
      this.setState({
        linkCopy: true,
      });
    }
  }

  handleStorageFavoriteDrink = (idDrinkRecipe) => {
    const storageFavoriteDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // const favoriteRecipe = await objRecipeFood;

    if (storageFavoriteDrink === null) {
      this.setState({
        favoriteIsOn: false,
      });
      // console.log('setou na montagem pra false, sem filtro');
    }

    if (storageFavoriteDrink !== null) {
      const arrayFavoriteDrinks = Array.from(Object(storageFavoriteDrink));
      const filterInFavoriteRecipes = arrayFavoriteDrinks?.some(
        (favoriteDrink) => favoriteDrink.id === idDrinkRecipe
        && favoriteDrink.type === 'drink',
      );

      if (filterInFavoriteRecipes) {
        this.setState({
          favoriteIsOn: true,
        });
        console.log('setou pra true, depois do filtro na montagem');
      }
      if (!filterInFavoriteRecipes) {
        this.setState({
          favoriteIsOn: false,
        });
      }
      // console.log('setou pra false, depois do filtro na montagem');
      console.log(filterInFavoriteRecipes);
      console.log(idDrinkRecipe);
    }
  };

  setFavoriteFalseToTrue = (objRecipeDrink) => {
    // console.log('setou no click pra true');
    const storageFavoriteDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const favoriteRecipeDrink = {
      id: objRecipeDrink.idDrink,
      type: 'drink',
      nationality: '',
      category: objRecipeDrink.strCategory,
      alcoholicOrNot: objRecipeDrink.strAlcoholic,
      name: objRecipeDrink.strDrink,
      image: objRecipeDrink.strDrinkThumb,
    };
    // console.log(favoriteRecipeDrink);

    if (storageFavoriteDrink === null) {
      // console.log('setou, de null p/ array, o primeiro obj, criando a chave');
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([favoriteRecipeDrink]));
    } else {
      // console.log('setou, o array, usando prevState e incluindo mais um obj');
      const arrayFavoriteDrinks = Array.from(Object(storageFavoriteDrink));
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...arrayFavoriteDrinks, favoriteRecipeDrink]));
    }
  }

  setFavoriteTrueToFalse = (objRecipeDrink) => {
    console.log('setou no click pra false');
    const storageFavoriteDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const arrayFavoriteDrinks = Array.from(Object(storageFavoriteDrink));

    const filterInFavoriteRecipes = arrayFavoriteDrinks?.filter(
      (favoriteDrink) => favoriteDrink.id !== objRecipeDrink.idDrink
        && favoriteDrink.type === 'drink',
    );
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...filterInFavoriteRecipes]));

    // console.log('oi', objRecipeDrink);
    // console.log([...filterInFavoriteRecipes]);
  }

  handleFavoriteBtn = async () => {
    const { favoriteIsOn, objRecipeDrink } = this.state;
    if (!favoriteIsOn) {
      this.setState({
        favoriteIsOn: true,
      }, () => this.setFavoriteFalseToTrue(objRecipeDrink));
    }
    if (favoriteIsOn) {
      this.setState({
        favoriteIsOn: false,
      }, () => this.setFavoriteTrueToFalse(objRecipeDrink));
    }
  }

  render() {
    const { objRecipeDrink, linkCopy, favoriteIsOn } = this.state;
    // console.log(objRecipeDrink);

    return (
      <>
        <HeaderDetailsDrink
          shareIcon={ shareIcon }
          handleShareRecipe={ this.handleShareRecipe }
          favoriteIcon={ favoriteIsOn }
          handleFavoriteBtn={ this.handleFavoriteBtn }
          objRecipeDrink={ objRecipeDrink }
          linkCopy={ linkCopy }
        />

        <BoxStepInProgressDrinks
          objRecipeDrink={ objRecipeDrink }
        />

        <BoxInstructionsDrink objRecipeDrink={ objRecipeDrink } />

        <BtnFinishedRecipeDrink />
      </>
    );
  }
}

DrinkDetailsProgress.contextType = MyContext;

DrinkDetailsProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrinkDetailsProgress;
