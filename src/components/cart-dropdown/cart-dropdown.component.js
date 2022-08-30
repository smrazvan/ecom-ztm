import Button from "../button/Button.component";
import CartItem from "../cart-item/cart-item.component";
import "./CartDropdown.scss";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import { Link } from "react-router-dom";

function CartDropdown() {
  const { cartItems } = useContext(CartContext);

  console.log("rerender");
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((product, id) => (
          <CartItem key={id} product={product} />
        ))}
      </div>
      <Link to="/checkout">
        <Button>Go to checkout</Button>
      </Link>
    </div>
  );
}
export default CartDropdown;
