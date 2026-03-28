import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import SiteNavbar from './components/SiteNavbar';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import PurchasePage from './pages/PurchasePage';

function App() {
  return (
    <CartProvider>
      <Router>
        <SiteNavbar />
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/purchase/:title/:bookId" element={<PurchasePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;