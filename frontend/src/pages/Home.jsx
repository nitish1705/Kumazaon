import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import importedProducts from '../data/products.json';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a network request for the products list
    setTimeout(() => {
      setProducts(importedProducts.slice(0, 12)); // Display 12 items on home
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="relative px-4 sm:px-6">
      {/* Hero Banner background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-80 bg-gradient-to-r from-blue-600 to-indigo-900 rounded-lg shadow-md mb-12 flex items-center justify-center overflow-hidden relative"
      >
        <motion.div 
           initial={{ x: -100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.5, type: 'spring' }}
           className="text-center text-white z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Welcome to Kumazon</h1>
          <p className="text-xl mb-6">Discover the best products at unbeatable prices.</p>
          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="bg-amazon-yellow text-amazon px-8 py-3 rounded-full font-bold text-lg hover:bg-amazon-orange transition-colors"
          >
             Shop Now
          </motion.button>
        </motion.div>
        
        {/* Animated decorative circles */}
        <motion.div 
           animate={{ 
             scale: [1, 2, 1],
             rotate: [0, 90, 0],
             borderRadius: ["20%", "50%", "20%"]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className="absolute top-10 left-10 w-64 h-64 border-4 border-white/10 pointer-events-none"
        />
      </motion.div>

      {/* Product Grid */}
      <div className="mb-6 flex justify-between items-end">
         <h2 className="text-2xl font-bold text-gray-900 border-b-4 border-amazon-yellow pb-2 inline-block">Featured Products</h2>
      </div>

      <AnimatePresence>
        {loading ? (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
           >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg h-96 p-4 shadow-sm border border-gray-100 flex flex-col justify-end">
                   <div className="bg-gray-200 w-full h-48 mb-4 rounded-md"></div>
                   <div className="bg-gray-200 h-6 w-3/4 mb-2 rounded-sm"></div>
                   <div className="bg-gray-200 h-8 w-1/3 mb-4 rounded-sm"></div>
                   <div className="bg-gray-200 h-10 w-full rounded-full mt-auto"></div>
                </div>
              ))}
           </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
