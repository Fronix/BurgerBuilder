import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import { Redirect } from 'react-router-dom';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    this.props.onOrderInit(this.props.token);
  }

  render() {
    let form = this.props.error && !this.props.loading ? <p style={{textAlign: 'center'}}>Kan inte ladda beställningar!</p> : <Spinner />;
    if (!this.props.loading && !this.props.error) {
      form = (
        <div>
          {this.props.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}/>
          ))}
        </div>
      );
    }

    return form;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.or.savedOrders,
    loading: state.or.loading,
    error: state.or.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderInit: (token) => dispatch(actions.orderInit(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
