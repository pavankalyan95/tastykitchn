import {Component} from 'react'
import NavHeader from '../NavHeader'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import PlaceOrder from '../PlaceOrder'
import Footer from '../Footer'

import './index.css'

class Cart extends Component {
  state = {
    isOrderPlaced: false,
  }

  updateOrderStatus = val => {
    this.setState({isOrderPlaced: val})
  }

  render() {
    const {isOrderPlaced} = this.state
    const reUpdateOrderStatus = val => {
      this.updateOrderStatus(val)
    }
    const getLocalData = localStorage.getItem('cartData')
    const parsedLocalData = JSON.parse(getLocalData)
    let showEmptyView = 0
    if (parsedLocalData === null) {
      showEmptyView = 0
    } else {
      showEmptyView = parsedLocalData.length
    }

    return (
      <>
        <NavHeader />
        {isOrderPlaced ? (
          <PlaceOrder reUpdateOrderStatus={reUpdateOrderStatus} />
        ) : (
          <>
            {showEmptyView === 0 ? (
              <EmptyCartView />
            ) : (
              <div className="cart-container">
                <div className="cart-conn">
                  <div className="cart-content-container" testid="cartItem">
                    <div className="cart-titles-con">
                      <h1 className="cart-hea-1">Item</h1>
                      <h1 className="cart-hea-2">Quantity</h1>
                      <h1 className="cart-hea-3">Price</h1>
                    </div>
                    <CartListView />
                    <hr className="hr-line" />
                    <CartSummary updateOrderStatus={this.updateOrderStatus} />
                  </div>
                </div>
                <Footer />
              </div>
            )}
          </>
        )}
      </>
    )
  }
}

export default Cart
