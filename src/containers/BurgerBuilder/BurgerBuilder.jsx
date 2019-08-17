import React, { Component } from 'react';
import Aux from 'react-aux';
// import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import ModalSummary from '../../components/Burger/BurgerIngredient/OrderSummary/OrderSummary';

const INGRENDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    purchaseHandler = () => {
      this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {
        alert('orderd !!!');
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
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredient = {
        ...this.state.ingredients
      };
      updatedIngredient[type] = updatedCount;
      const priceAddition = INGRENDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({
        totalPrice: newPrice,
        ingredients: updatedIngredient
      });
      this.updatePurchaseState(updatedIngredient)
    }

    removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      if(oldCount <= 0) {
        return
      }
      const updatedCount = oldCount - 1;
      const updatedIngredient = {
        ...this.state.ingredients
      };
      updatedIngredient[type] = updatedCount;
      const priceDeduction = INGRENDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({
        totalPrice: newPrice,
        ingredients: updatedIngredient
      });
      this.updatePurchaseState(updatedIngredient)
    }

    render () {
        const disabledInfo = {
          ...this.state.ingredients
        };
        for (let key in disabledInfo) {
          disabledInfo[key] = disabledInfo[key] <= 0 //return true or false
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClicked={this.purchaseCancelHandler}>
                  <ModalSummary 
                  price={this.state.totalPrice}
                  ingredients={this.state.ingredients}
                  buttonCanceled={this.purchaseCancelHandler}
                  buttonContinued={this.purchaseContinuedHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                  ingredientAdded={this.addIngredientHandler}
                  ingredientRemoved={this.removeIngredientHandler}
                  disabled={disabledInfo}
                  price={this.state.totalPrice}
                  purchasable={this.state.purchasable}
                  ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;