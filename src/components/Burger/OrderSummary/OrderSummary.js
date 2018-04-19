import React, { Component } from 'react';

import Aux from '../../../hoc/auxilary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>
              {igKey}</span>: {this.props.ingredients[igKey]}
          </li>);
      });

    return (
      <Aux>
        <h3>Din Beställning</h3>
        <p>Din hamburgare innehåller detta:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Pris totalt: {this.props.price.toFixed(2)}</strong></p>
        <p>Fortsätt till utcheckning?</p>
        <Button
          btnType='Danger'
          clicked={this.props.purchaseCancelled}>Avbryt</Button>
        <Button
          btnType='Success'
          clicked={this.props.purchaseContinued}>Fortsätt</Button>
      </Aux>
    );
  }
}

export default OrderSummary;
