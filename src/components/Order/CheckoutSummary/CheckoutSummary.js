import React from 'react';

import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Här är din burgare!</h1>
      <h2>Hoppas det smakar!</h2>
      <div className={classes.CheckoutBurger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <button
        className={classes.CancelButton}
        onClick={props.checkoutCancelled}>Avbryt</button>
      <button
        className={classes.OrderButton}
        onClick={props.checkoutContinued}>Fortsätt</button>
    </div>
  );
};

export default checkoutSummary;
