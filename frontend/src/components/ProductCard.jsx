import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: 'spring' }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col h-full transform transition-all duration-300 relative group"
    >
      <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
        <motion.img 
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={product.image_url} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-contain p-4 mix-blend-darken bg-white"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg line-clamp-2 text-gray-800 mb-1">
          {product.title}
        </h3>
        
        <div className="flex items-center space-x-1 text-amazon-orange mb-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(product.rating || 4) ? "currentColor" : "none"} />
            ))}
            <span className="text-blue-600 text-xs ml-1 hover:underline cursor-pointer">
               {Math.floor(Math.random() * 500) + 50}
            </span>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="mt-auto flex justify-between items-center mb-4">
             <span className="text-2xl font-bold text-gray-900">
               <sup className="text-sm font-normal mr-1">₹</sup>
               {Math.floor(product.price).toLocaleString('en-IN')}
               <sup className="text-sm font-normal">{(product.price % 1).toFixed(2).substring(1)}</sup>
             </span>
             {product.stock > 0 ? (
                 <span className="text-green-600 text-xs font-semibold">In Stock</span>
             ) : (
                 <span className="text-red-500 text-xs font-semibold">Out of Stock</span>
             )}
        </div>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          className="w-full bg-amazon-yellow hover:bg-amazon-orange text-amazon py-2 px-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-colors shadow-sm mt-4 cursor-pointer"
        >
            <Plus size={18} />
            <span>Add to Cart</span>
        </motion.button>
      </div>

    </motion.div>
  );
};

export default ProductCard;
