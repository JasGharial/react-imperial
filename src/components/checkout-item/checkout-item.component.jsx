// Dependencies
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

// Styles
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, price, quantity, imageUrl } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

  const removeCartItem = () => clearItemFromCart(cartItem);
  const incrementProductQuantity = () => addItemToCart(cartItem);
  const decrementProductQuantity = () => removeItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <span className="arrow" onClick={decrementProductQuantity}>&lt;</span>
        <div className="value">{quantity}</div>
        <span className="arrow" onClick={incrementProductQuantity}>&gt;</span>
      </div>
      <div className="price">{price}</div>
      <div onClick={removeCartItem} className="remove-button">
      &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem;