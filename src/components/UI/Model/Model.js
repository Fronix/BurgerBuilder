import React from 'react';

import classes from './Model.css';

const model = (props) => (
  <div className={classes.ModelBackdrop}>
    <div className={classes.Model}>
      {props.childen}
    </div>
  </div>
);

export default model;
