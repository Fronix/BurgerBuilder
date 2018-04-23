import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const ingredients = [];
  const ing = props.ingredients;
  for (let ingredientName in ing) {
    if (ing.hasOwnProperty(ingredientName)) {
      ingredients.push(
        {
          name: ingredientName,
          amount: props.ingredients[ingredientName]
        }
      );
    }
  }
  const ingredientOutput = ingredients.map(ig => {
    return <span
      style={{textDecoration: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'}}
      key={ig.name}>{ig.name} ({ig.amount})</span>;
  });
  return (
    <div className={classes.Order}>
      <p>Ingredienser: {ingredientOutput}</p>
      <p>Pris: <strong>SEK {props.price}</strong></p>
    </div>);
};

export default order;
