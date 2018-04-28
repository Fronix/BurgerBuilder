import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    this.props.onOrderInit(this.props.token, this.props.userId);
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
              price={order.price}
              email={order.orderData.email}
              deliveryMethod={order.orderData.deliveryMethod}
              name={order.orderData.name}
              street={order.orderData.street}
              zipCode={order.orderData.zipCode}/>
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
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderInit: (token, userId) => dispatch(actions.orderInit(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
