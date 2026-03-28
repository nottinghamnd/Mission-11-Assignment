import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, clearCart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item: CartItem) => (
              <li
                key={item.bookId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                  <button
                    className="btn btn-sm btn-danger ms-3"
                    onClick={() => removeFromCart(item.bookId)}
                  >
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
      <button className="btn btn-primary me-2" onClick={() => navigate('/books')}>
        Continue Browsing
      </button>
      <button className="btn btn-success" onClick={clearCart}>
        Checkout
      </button>
    </div>
  );
}

export default CartPage;
