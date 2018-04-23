import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Bacon', type: 'bacon' },
  { label: 'Ost', type: 'cheese' },
  { label: 'Kött', type: 'meat' },
  { label: 'Salad', type: 'salad' }
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Nuvarande pris <strong>{props.price.toFixed(2)}:-</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />
    ))}
    <div className={classes.ButtonControl}>
      <button
        className={classes.ResetButton}
        onClick={props.reset}
        disabled={!props.purchaseable}>Återställ</button>
      <button
        className={classes.OrderButton}
        onClick={props.ordered}
        disabled={!props.purchaseable}>Beställ</button>
    </div>
  </div>
);

export default buildControls;
