import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 20,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 5,
  cheese: 8,
  meat: 15,
  bacon: 10
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.ADD_INGREDIENT:
    return addIngredient(state, action);
  case actionTypes.REMOVE_INGREDIENTS:
    return removeIngredient(state, action);
  case actionTypes.SET_INGREDIENTS:
    return setIngredients(state, action);
  case actionTypes.FETCH_INGREDIENTS_FAILED:
    return updateObject(state, { error: true });
  default:
    return state;
  }
};

const addIngredient = (state, action) => {
  const addUpdatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const addUpdatedIngredients = updateObject(state.ingredients, addUpdatedIngredient);
  const addUpdatedState = {
    ingredients: addUpdatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, addUpdatedState);
};

const removeIngredient = (state, action) => {
  const remUpdatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const remUpdatedIngredients = updateObject(state.ingredients, remUpdatedIngredient);
  const remUpdatedState = {
    ingredients: remUpdatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, remUpdatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 20,
    error: false
  });
};

export default reducer;
