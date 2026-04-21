const fs = require('fs');
const categories = ['Electronics', 'Computers', 'Smart Home', 'Medical Care', 'Groceries', 'Amazon Basics'];
const adjectives = ['Pro', 'Ultra', 'Essential', 'Wireless', 'Smart', 'Advanced', 'Compact', 'Heavy Duty', 'Premium', 'Eco-friendly'];
const nouns = ['Device', 'Gadget', 'Tool', 'Accessory', 'Kit', 'Bundle', 'System', 'Pack', 'Monitor', 'Cleaner'];
const images = [
  'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1584447128309-b66b7a4d1b63?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=500&q=80'
];

const products = [];
for (let i = 1; i <= 50; i++) {
  const category = categories[i % categories.length];
  const title = `Kumazon ${adjectives[i % adjectives.length]} ${category} ${nouns[i % nouns.length]}`;
  const price = Math.floor(Math.random() * 5000) + 199; // 199 to 5198 INR
  const image = images[i % images.length];
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0
  const stock = Math.floor(Math.random() * 200) + 0;

  products.push({
    id: i,
    category: category,
    title: title,
    description: `High-quality ${title.toLowerCase()} perfect for your everyday needs. Exclusive to Kumazon, trusted by thousands of customers worldwide.`,
    price: price,
    image_url: image,
    stock: stock,
    rating: parseFloat(rating)
  });
}

fs.writeFileSync('/Users/nitishm/Desktop/FILES/BYTEXL/Project/frontend/src/data/products.json', JSON.stringify(products, null, 2));
console.log('Generated 50 products!');
