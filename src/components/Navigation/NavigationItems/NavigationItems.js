import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Bygg din burgare</NavigationItem>
    <NavigationItem link="/orders">Beställningar</NavigationItem>
  </ul>
);

export default navigationItems;
