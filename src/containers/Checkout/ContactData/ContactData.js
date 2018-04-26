import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
            maxLength: 5
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
            required: true
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
      formIsValid: false,
      loading: false
    }

    componentWillMount = () => {
      if (this.props.price < 21) {
        this.props.history.push('/');
      }
    };

    orderHandler = (event) => {
      event.preventDefault();

      this.setState({loading: true});
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
        orderData: formData

      };
      axios.post('/orders.json', order)
        .then(response => {
          this.setState({loading: false});
          window.location.href = '/';
        })
        .catch(error => {
          this.setState({loading: false});
        });
    }

    checkValidity(value, rules) {
      let isValid = true;
      if (!rules) {
        return true;
      }

      if (rules.required) {
        isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }

      return isValid;
    }

    orderCancelHandler = () => {
      this.props.history.goBack();
    }

    inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
        ...this.state.orderForm
      };
      const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value,
        updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;

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

      if (this.state.loading) {
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
    ings: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(mapStateToProps)(ContactData);
