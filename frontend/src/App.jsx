import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Category from './pages/Category'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if(existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if(item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)} user={user} setUser={setUser} />
        <main className="max-w-7xl mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} user={user} />} />
            <Route path="/category/:categoryName" element={<Category addToCart={addToCart} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
