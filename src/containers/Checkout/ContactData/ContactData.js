import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../store/utility';

class ContactData extends Component {
    state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Ditt Namn'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Gata + nr'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Post Nummer'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
            isNumeric: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Din E-Mail Adress'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Snabbast'},
              {value: 'cheapest', displayValue: 'Billigast'}
            ]
          },
          value: 'fastest',
          validation: {},
          valid: true
        }
      },
      formIsValid: false
    }

    orderHandler = (event) => {
      event.preventDefault();

      const formData = {};
      let orderState = this.state.orderForm;
      for (let formElementIdentifier in orderState) {
        if (orderState.hasOwnProperty(formElementIdentifier)) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
      }
      const order = {
        ingredients: this.props.ings,
        price: this.props.price,
        orderData: formData,
        userId: this.props.userId

      };
      this.props.onOrderBurger(order, this.props.token);
    }

    orderCancelHandler = () => {
      this.props.history.goBack();
    }

    inputChangedHandler = (event, inputIdentifier) => {
      const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
        touched: true
      });
      const updatedOrderForm = updateObject(this.state.orderForm, {
        [inputIdentifier]: updatedFormElement
      });
      let formIsValid = true;
      // eslint-disable-next-line
      for (let inputIdentifiers in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
      }
      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
      const formElementsArray = [];
      // eslint-disable-next-line
      for (let key in this.state.orderForm) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }

      let form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)} />
          ))}
          <Button
            btnType="Danger"
            clicked={this.orderCancelHandler}>AVBRYT</Button>
          <Button
            btnType="Success_2"
            clicked={this.orderHandler}
            disabled={!this.state.formIsValid}>BESTÄLL</Button>
        </form>
      );

      if (this.props.loading) {
        form = <Spinner />;
      }

      return (
        <div className={classes.ContactData}>
          <h4>Fyll i dina kontakt uppgifter</h4>
          {form}
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    ings: state.bb.ingredients,
    price: state.bb.totalPrice,
    loading: state.or.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    userEmail: state.auth.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
