import React from 'react';

import Aux from '../../../hoc/auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
        </li>);
    });

  return (
    <Aux>
      <h3>Din Beställning</h3>
      <p>Din hamburgare innehåller detta:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Pris totalt: {props.price.toFixed(2)}</strong></p>
      <p>Fortsätt till utcheckning?</p>
      <Button
        btnType='Danger'
        clicked={props.purchaseCancelled}>Avbryt</Button>
      <Button
        btnType='Success'
        clicked={props.purchaseContinued}>Fortsätt</Button>
    </Aux>
  );
};

export default orderSummary;
