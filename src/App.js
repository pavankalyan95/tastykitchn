import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import CartContext from './context/CartContext'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    foodItemsList: [],
  }

  componentDidMount() {
    this.fetchingLocalData()
  }

  updateState = () => {
    const localData = JSON.parse(localStorage.getItem('cartData'))
    if (localData !== null) {
      this.setState({
        foodItemsList: localData,
      })
    }
  }

  storeData = () => {
    const {foodItemsList} = this.state
    localStorage.setItem('cartData', JSON.stringify(foodItemsList))
  }

  addFoodItemToCart = foodItem => {
    const {foodItemsList} = this.state
    const foodItemObject = foodItemsList.find(
      eachCartItem => eachCartItem.id === foodItem.id,
    )
    if (foodItemObject) {
      this.setState(prevState => ({
        foodItemsList: prevState.foodItemsList.map(eachCartItem => {
          if (foodItemObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + foodItem.quantity
            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...foodItemsList, foodItem]
      this.setState({foodItemsList: updatedCartList})
    }
  }

  changeActiveBtnStatus = id => {
    this.setState(prevState => ({
      foodItemsList: prevState.foodItemsList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          return {...eachCartItem, isBtnActive: false}
        }
        return eachCartItem
      }),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      foodItemsList: prevState.foodItemsList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {foodItemsList} = this.state
    const localData = JSON.parse(localStorage.getItem('cartData'))
    if (localData.length === 1) {
      localStorage.removeItem('cartData')
    }
    const foodItemObject = foodItemsList.find(
      eachCartItem => eachCartItem.id === id,
    )
    if (foodItemObject.quantity > 1) {
      this.setState(prevState => ({
        foodItemsList: prevState.foodItemsList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {foodItemsList} = this.state
    const updatedCartList = foodItemsList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({foodItemsList: updatedCartList})
  }

  fetchingLocalData = () => {
    const {foodItemsList} = this.state
    if (foodItemsList.length === 0) {
      this.updateState()
    }
  }

  render() {
    const {foodItemsList} = this.state
    if (foodItemsList.length !== 0) {
      this.storeData()
    }
    return (
      <CartContext.Provider
        value={{
          changeActiveBtnStatus: this.changeActiveBtnStatus,
          addFoodItemToCart: this.addFoodItemToCart,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
