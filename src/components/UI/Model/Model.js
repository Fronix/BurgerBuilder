import React from 'react';

import classes from './Model.css';
import Aux from '../../../hoc/auxilary';
import Backdrop from '../Backdrop/Backdrop';

const model = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
      className={classes.Model}>
      {props.children}
    </div>
  </Aux>
);

export default model;