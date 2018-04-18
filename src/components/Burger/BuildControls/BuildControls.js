import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Sallad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Ost', type: 'cheese' },
  { label: 'Kött', type: 'meat' }
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
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}>Beställ</button>
  </div>
);

export default buildControls;
