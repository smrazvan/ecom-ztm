import "./CartItem.scss";

function CartItem({ product }) {
  const { name, imageUrl, price, quantity } = product;
  return (
    <div className="cart-item-container">
      <img alt={name} src={imageUrl} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
