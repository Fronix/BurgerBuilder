import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Aux from '../../hoc/auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
      purchasing: false
    }

    componentDidMount = () => {
      this.props.onInitIngredients();
    };


    updatePurchaseState(ingredients) {
      const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey];
        })
        // eslint-disable-next-line
        .reduce((sum, el) => {
          return sum + el;
        }, 0);
      return sum > 0;
    }

    resetBurgerHandler = () => {
      this.props.onInitIngredients();
    }

    purchaseHandler = () => {
      if (this.props.isAuthenticated) {
        this.setState({purchasing: true});
      } else {
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/login');
      }
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
      this.props.onInitPurchased();
      this.props.history.push('/checkout');
    }

    render() {
      const disabledInfo = {
        ...this.props.ings
      };
      for (let key in disabledInfo) {
        if (disabledInfo.hasOwnProperty(key)) {
          disabledInfo[key] = disabledInfo[key] <= 0;
        }
      }
      let orderSummary = null;
      let burger = this.props.error ? <p style={{textAlign: 'center'}}>
      Ingredienserna kan inte laddas!</p> : <Spinner />;
      if (this.props.ings) {
        burger = (
          <Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchaseable={this.updatePurchaseState(this.props.ings)}
              ordered={this.purchaseHandler}
              price={this.props.price}
              reset={this.resetBurgerHandler}
              isAuth={this.props.isAuthenticated}
            /></Aux>
        );

        orderSummary = <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.props.price}/>;
      }
      return (
        <Aux>
          <Model show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Model>
          {burger}
        </Aux>
      );
    }
}

const mapStateToProps = state => {
  return {
    ings: state.bb.ingredients,
    price: state.bb.totalPrice,
    error: state.bb.error,
    isAuthenticated: state.auth.token !== null,
    building: state.bb.building
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchased: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
