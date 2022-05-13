import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import MyContext from '../context/MyContext';
import HeaderDetailsFood from '../components/HeaderDetailsFood';
import shareIcon from '../images/shareIcon.svg';
import BoxInstructionsFood from '../components/BoxInstructionsFood';
import { fetchIdFoodRecipe } from '../services/apiServicesFoods';
import BtnFinishedRecipeFood from '../components/BtnFinishedRecipeFood';
import BoxStepInProgressFood from '../components/BoxStepInProgressFood';

class FoodsDetailsProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      // idFoodRecipe: '',
      objRecipeFood: {},
      linkCopy: false,
      favoriteIsOn: false,
      // btnIsDisable: true,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const { idFoodRecipe } = params;
    this.fetchRecipeById(idFoodRecipe);
    this.handleStorageFavoriteFood(idFoodRecipe);
  }

  fetchRecipeById = async (idFoodRecipe) => {
    const objRecipeFood = await fetchIdFoodRecipe(idFoodRecipe);

    this.setState({
      objRecipeFood,
      // idFoodRecipe,
    });
  }

  handleShareRecipe = () => {
    const { match } = this.props;
    const urlRecipeFood = match.params.idFoodRecipe;
    console.log(urlRecipeFood);

    const urlBase = `http://localhost:3000/foods/${urlRecipeFood}`;

    const copyUrlRecipe = clipboardCopy(urlBase);
    console.log(copyUrlRecipe);

    if (copyUrlRecipe) {
      this.setState({
        linkCopy: true,
      });
    }
  }

  handleStorageFavoriteFood = (idFoodRecipe) => {
    const storageFavoriteFood = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // const favoriteRecipe = await objRecipeFood;

    if (storageFavoriteFood === null) {
      this.setState({
        favoriteIsOn: false,
      });
      // console.log('setou na montagem pra false, sem filtro');
    }

    if (storageFavoriteFood !== null) {
      const arrayFavoriteFoods = Array.from(Object(storageFavoriteFood));
      const filterInFavoriteRecipes = arrayFavoriteFoods?.some(
        (favoriteFood) => favoriteFood.id === idFoodRecipe
        && favoriteFood.type === 'food',
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
      console.log(idFoodRecipe);
    }
  };

  setFavoriteFalseToTrue = (objRecipeFood) => {
    // console.log('setou no click pra true');
    const storageFavoriteFood = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const favoriteRecipeFood = {
      id: objRecipeFood.idMeal,
      type: 'food',
      nationality: objRecipeFood.strArea,
      category: objRecipeFood.strCategory,
      alcoholicOrNot: '',
      name: objRecipeFood.strMeal,
      image: objRecipeFood.strMealThumb,
    };

    if (storageFavoriteFood === null) {
      // console.log('setou, de null p/ array, o primeiro obj, criando a chave');
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipeFood]));
    } else {
      // console.log('setou, o array, usando prevState e incluindo mais um obj');
      const arrayFavoriteFoods = Array.from(Object(storageFavoriteFood));
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...arrayFavoriteFoods, favoriteRecipeFood]));
    }
  }

  setFavoriteTrueToFalse = (objRecipeFood) => {
    console.log('setou no click pra false');
    const storageFavoriteFood = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const arrayFavoriteFoods = Array.from(Object(storageFavoriteFood));

    const filterInFavoriteRecipes = arrayFavoriteFoods?.filter(
      (favoriteFood) => favoriteFood.id !== objRecipeFood.idMeal
        && favoriteFood.type === 'food',
    );
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...filterInFavoriteRecipes]));

    // console.log('oi', objRecipeFood);
    // console.log([...filterInFavoriteRecipes]);
  }

  handleFavoriteBtn = async () => {
    const { favoriteIsOn, objRecipeFood } = this.state;
    if (!favoriteIsOn) {
      this.setState({
        favoriteIsOn: true,
      }, () => this.setFavoriteFalseToTrue(objRecipeFood));
    }
    if (favoriteIsOn) {
      this.setState({
        favoriteIsOn: false,
      }, () => this.setFavoriteTrueToFalse(objRecipeFood));
    }
  }

  // handleBtnIsDisable = () => {
  //   console.log('preciso setar o Botao');
  // }

  render() {
    const { objRecipeFood, linkCopy, favoriteIsOn } = this.state;
    // console.log(objRecipeFood);

    return (
      <>
        <HeaderDetailsFood
          shareIcon={ shareIcon }
          handleShareRecipe={ this.handleShareRecipe }
          favoriteIcon={ favoriteIsOn }
          handleFavoriteBtn={ this.handleFavoriteBtn }
          objRecipeFood={ objRecipeFood }
          linkCopy={ linkCopy }
        />
        <BoxStepInProgressFood
          objRecipeFood={ objRecipeFood }
        />

        <BoxInstructionsFood
          objRecipeFood={ objRecipeFood }
          handleBtnIsDisable={ this.handleBtnIsDisable }
        />

        <BtnFinishedRecipeFood />
      </>
    );
  }
}

FoodsDetailsProgress.contextType = MyContext;

FoodsDetailsProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodsDetailsProgress;
