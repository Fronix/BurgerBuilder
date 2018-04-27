import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false,
  savedOrders: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.PURCHASE_INIT:
    return updateObject(state, { purchased: false });
  case actionTypes.PURCHASE_BURGER_START:
    return updateObject(state, { loading: true });
  case actionTypes.PURCHASE_BURGER_SUCCESS:
    return purchaseBurgerSuccess(state, action);
  case actionTypes.PURCHASE_BURGER_FAILED:
    return updateObject(state, { loading: false });
  case actionTypes.FETCH_ORDERS_START:
    return updateObject(state, { loading: true });
  case actionTypes.FETCH_ORDERS:
    return fetchOrders(state, action);
  case actionTypes.FETCH_ORDERS_FAILED:
    return updateObject(state, { loading: false, error: true });
  default:
    return state;
  }
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const fetchOrders = (state, action) => {
  return updateObject(state, {
    savedOrders: action.savedOrders,
    error: false,
    loading: false
  });
};

export default reducer;
