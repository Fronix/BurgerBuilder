import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>Bygg din burgare</NavigationItem>
    <NavigationItem link="/">Checka Ut</NavigationItem>
  </ul>
);

export default navigationItems;
