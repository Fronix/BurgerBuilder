import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Aux from '../../hoc/auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
      purchasing: false,
      loading: false,
      error: false
    }

    componentDidMount() {
      // axios.get('ingredients.json')
      //   .then(response => {
      //     this.setState({ings: response.data});
      //   })
      //   .catch(error =>{
      //     this.setState({error: true});
      //   });
    }

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
      window.location.reload();
    }

    purchaseHandler = () => {
      this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
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
      let burger = this.state.error ? <p style={{textAlign: 'center'}}>
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
            /></Aux>
        );

        orderSummary = <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.props.price}/>;
      }
      if (this.state.loading) {
        orderSummary = <Spinner />;
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
    ings: state.ingredients,
    price: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
