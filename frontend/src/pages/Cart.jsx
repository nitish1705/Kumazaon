import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart, user }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = async () => {
      if (!user) {
         alert("Please sign in or create an account to proceed to checkout.");
         navigate('/login');
         return;
      }

      try {
         const totalAmount = calculateTotal();
         const res = await axios.post(`${backendUrl}/api/orders/checkout`, {
             userId: user.id,
             totalAmount: parseFloat(totalAmount),
             items: cart
         });
         
         alert("Success! Your Kumazon order has been placed!");
         clearCart();
         navigate('/');
      } catch (err) {
         console.error('Checkout error:', err);
         alert(err.response?.data?.error || "Failed to place order");
      }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center bg-white rounded-lg shadow-sm border border-gray-100 p-12">
        <motion.div
           initial={{ scale: 0, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ type: 'spring', damping: 10, stiffness: 100 }}
        >
          <ShoppingBag size={80} className="text-gray-300 mb-6" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Kumazon Cart is empty.</h2>
        <p className="text-gray-500 mb-8 max-w-md">Check today's deals or find something in your browsing history.</p>
        <Link to="/">
          <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="bg-amazon-yellow text-amazon px-8 py-3 rounded-full font-bold shadow-md hover:bg-amazon-orange transition-colors"
          >
             Continue Shopping
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-6">
      {/* Cart Items List */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-end border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <span className="text-sm font-medium text-gray-500">Price</span>
          </div>

          <ul className="space-y-6">
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.li
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  className="flex py-6 border-b border-gray-100 last:border-0 items-start md:items-center space-x-6"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-32 h-32 object-contain bg-gray-50 p-2 rounded-md border"
                  />
                  <div className="flex flex-1 flex-col space-y-2">
                    <div className="flex justify-between text-base font-semibold text-gray-900">
                      <h3 className="line-clamp-2 md:line-clamp-1">{item.title}</h3>
                      <p className="ml-4 font-bold text-lg">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <p className="text-sm text-green-600 font-medium">In Stock</p>
                    <p className="mt-1 text-sm text-gray-500 italic max-w-sm line-clamp-2">
                      Eligible for FREE Prime Shipping.
                    </p>
                    <div className="flex flex-1 items-end justify-between text-sm mt-4">
                      
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-100">
                         <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 font-bold text-gray-600 hover:bg-gray-200 transition-colors">-</button>
                         <span className="font-bold px-4 py-1 bg-white border-l border-r">{item.quantity}</span>
                         <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 font-bold text-gray-600 hover:bg-gray-200 transition-colors">+</button>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-red-500 hover:text-red-700 flex items-center space-x-1"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
         <motion.div
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="bg-white rounded-lg shadow-md border border-gray-100 p-6 sticky top-24"
         >
           <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
           <div className="space-y-4">
             <div className="flex justify-between text-sm text-gray-600">
                <p>Items ({cart.reduce((a,c) => a + c.quantity, 0)}):</p>
                <p>₹{calculateTotal()}</p>
             </div>
             <div className="flex justify-between text-sm text-gray-600 pb-4 border-b border-gray-200">
                <p>Shipping & handling:</p>
                <p>₹0.00</p>
             </div>
             
             <div className="flex justify-between text-xl font-bold text-amazon pt-2">
                 <p>Order Total</p>
                 <p>₹{calculateTotal()}</p>
             </div>
           </div>

           <motion.button 
             onClick={handleCheckout}
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             className="mt-8 w-full bg-amazon-yellow text-amazon py-3 rounded-full font-bold hover:bg-amazon-orange transition-colors shadow-sm cursor-pointer"
           >
              Proceed to checkout
           </motion.button>

         </motion.div>
      </div>
    </div>
  );
};

export default Cart;
