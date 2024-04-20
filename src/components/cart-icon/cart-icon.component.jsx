// Dependencies
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

// Logo Asset
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"

//  Styles
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext)

  const toggleisCartOpen = () => setIsCartOpen(!isCartOpen)

  return(
    <div className="cart-icon-container" onClick={toggleisCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  )

}

export default CartIcon;