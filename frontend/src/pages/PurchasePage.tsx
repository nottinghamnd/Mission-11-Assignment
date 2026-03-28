import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function PurchasePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { title, bookId } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const price = Number(searchParams.get('price') ?? 0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title ? decodeURIComponent(title) : 'Unknown Book',
      price,
      quantity,
    };

    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <div className="container">
        <h2>Add {title ? decodeURIComponent(title) : 'this book'} to Cart</h2>

        <div className="mb-3">
          <p>
            <strong>Price:</strong> ${price.toFixed(2)}
          </p>
          <input
            type="number"
            min="1"
            className="form-control w-auto"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
          />
        </div>

        <button className="btn btn-success me-2" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </>
  );
}

export default PurchasePage;
