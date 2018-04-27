import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Model from '../../components/UI/Model/Model';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
      this.props.history.push('/');
    }

    checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data');
    }

    render() {
      let summary = <Redirect to="/"/>;
      if (this.props.ings) {
        const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
        summary = (
          <div>
            {purchasedRedirect}
            <CheckoutSummary
              ingredients={this.props.ings}
              checkoutCancelled={this.checkoutCancelledHandler}
              checkoutContinued={this.checkoutContinuedHandler}/>
            <Route path={this.props.match.path + '/contact-data'}
            // eslint-disable-next-line
              render={(props) => (<Model show={this.props.match.path + '/contact-data'} modalClosed={() => true}><ContactData {...props}/></Model>)}/>
          </div>
        );
      }
      return summary;
    }
}

const mapStateToProps = state => {
  return {
    ings: state.bb.ingredients,
    purchased: state.or.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
