import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import Drinks from './pages/Drinks';
import FoodsDetailsProgress from './pages/FoodsDetailsProgress';
import DrinkDetailsProgress from './pages/DrinkDetailsProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';
import MyProvider from './context/MyProvider';

class App extends React.Component {
  render() {
    return (
      <MyProvider>
        <Switch>
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreFoodsNationalities }
          />
          <Route
            exact
            path="/foods/:idFoodRecipe/in-progress"
            component={ FoodsDetailsProgress }
          />
          <Route
            exact
            path="/drinks/:IdDrinkRecipe/in-progress"
            component={ DrinkDetailsProgress }
          />
          <Route exact path="/foods/:idFood" component={ FoodDetails } />
          <Route exact path="/drinks/:idDrink" component={ DrinkDetails } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodsIngredients }
          />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksIngredients }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </MyProvider>
    );
  }
}

export default App;
