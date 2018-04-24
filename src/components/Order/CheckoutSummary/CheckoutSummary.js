import React from 'react';

import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hoppas det smakar!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <button
        className={classes.CancelButton}
        onClick={props.checkoutCancelled}>Avbryt</button>
      <button
        className={classes.OrderButton}
        onClick={props.checkoutContinued}>Beställ NU!</button>
    </div>
  );
};

export default checkoutSummary;
