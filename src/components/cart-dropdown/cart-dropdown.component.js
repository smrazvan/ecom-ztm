import Button from "../button/Button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.js";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import { Link } from "react-router-dom";

function CartDropdown() {
  const { cartItems } = useContext(CartContext);

  console.log("rerender");
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((product, id) => (
            <CartItem key={id} product={product} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Link to="/checkout">
        <Button>Go to checkout</Button>
      </Link>
    </CartDropdownContainer>
  );
}
export default CartDropdown;
