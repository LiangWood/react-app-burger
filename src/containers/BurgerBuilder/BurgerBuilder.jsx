import React, { Component, Fragment } from 'react';
// import Aux from 'react-aux';
// import axios from '../../axios-orders'
// import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import ModalSummary from '../../components/Burger/BurgerIngredient/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props)
        // axios.get('/ingredient')
        //     .then( res => {
        //         this.setState({ ingredients : res.data })
        //     })
        //     .catch( err => {
        //         this.setState({ error: true })
        //     })
    }

    purchaseHandler = () => {
      this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {
      this.props.history.push('/checkout')
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
        .map(igKeys => {
            return ingredients[igKeys];
        })
        .reduce((sum, el) => {
            return sum + el;
        })
        return sum > 0;
    }

    render () {
        const disabledInfo = {
          ...this.props.ings
        };
        for (let key in disabledInfo) {
          disabledInfo[key] = disabledInfo[key] <= 0 //return true or false
        }
        let orderSummary = <ModalSummary 
                            price={this.props.price}
                            ingredients={this.props.ings}
                            buttonCanceled={this.purchaseCancelHandler}
                            buttonContinued={this.purchaseContinuedHandler}/>

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClicked={this.purchaseCancelHandler}>
                  {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                  ingredientAdded={this.props.onIngredientAdded}
                  ingredientRemoved={this.props.onIngredientRemoved}
                  disabled={disabledInfo}
                  price={this.props.price}
                  purchasable={this.updatePurchaseState(this.props.ings)}
                  ordered={this.purchaseHandler} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);