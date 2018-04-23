import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
      name: '',
      email: '',
      adress: {
        stree: '',
        postalCode: ''
      },
      loading: false
    }

    orderHandler = (event) => {
      event.preventDefault();

      this.setState({loading: true});
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
          name: 'Oscar Martin',
          address: {
            street: 'Lulgatan 12',
            zipCode: '1337',
            countery: 'Sweden'
          },
          email: 'fronix@fronix.se'
        },
        deliveryMethod: 'fastest'
      };
      axios.post('/orders.json', order)
        .then(response => {
          this.setState({loading: false});
          this.props.history.push('/');
        })
        .catch(error => {
          this.setState({loading: false});
        });
    }

    render() {
      let form = (
        <form>
          <input className={classes.Input}
            type="text" name="name" placeholder="Ditt fulla namn" />
          <input className={classes.Input}
            type="email" name="email" placeholder="Din Email Adress" />
          <input className={classes.Input}
            type="text" name="street" placeholder="Gata + nr" />
          <input className={classes.Input}
            type="text" name="postal" placeholder="Post Nummer" />
          <Button btnType="Success" clicked={this.orderHandler}>Lägg din beställning</Button>
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

export default ContactData;
