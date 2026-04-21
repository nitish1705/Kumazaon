import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import importedProducts from '../data/products.json';

const Category = ({ addToCart }) => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Decoding and matching our category string
    const decodedCategory = decodeURIComponent(categoryName);
    const filtered = importedProducts.filter(
      p => p.category.toLowerCase() === decodedCategory.toLowerCase()
    );
    // Standardize to showing all matches or everything if "all"
    if (decodedCategory.toLowerCase() === 'all') {
      setProducts(importedProducts);
    } else {
      setProducts(filtered);
    }
  }, [categoryName]);

  return (
    <div className="px-4 sm:px-6">
      <div className="mb-6 flex justify-between items-end mt-4">
         <h2 className="text-2xl font-bold text-gray-900 border-b-4 border-amazon-yellow pb-2 inline-block capitalize">
            {decodeURIComponent(categoryName)} Products
         </h2>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
           <h3 className="text-xl font-bold mb-2">No products found in this category.</h3>
           <p>Try searching another department!</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Category;
