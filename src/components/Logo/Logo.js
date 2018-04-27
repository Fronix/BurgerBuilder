import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height, backgroundColor: props.bgColor}}>
    <img src={burgerLogo} alt="Hamburgare"/>
  </div>
);

export default logo;
