import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Bygg din burgare</NavigationItem>
    { props.isAuthenticated ? <NavigationItem link="/orders">Beställningar</NavigationItem> : null }
    { !props.isAuthenticated
      ? <NavigationItem link="/login">Logga In</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem> }
  </ul>
);

export default navigationItems;
