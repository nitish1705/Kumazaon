import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ cartItemCount, user, setUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setIsSidebarOpen(false);
    navigate('/');
  };

  const SIDEBAR_LINKS = [
    { title: "Digital Content & Devices", items: ["Kumazon Music", "Kindle E-readers & Books", "Appstore for Android"] },
    { title: "Shop By Department", items: ["Medical Care", "Groceries", "Electronics", "Computers", "Smart Home", "Amazon Basics"] }
  ];

  return (
    <>
      <nav className="bg-amazon text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-amazon">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center space-x-2 border border-transparent hover:border-white p-1 rounded-sm">
                <span className="text-xl font-bold italic text-white flex items-center gap-1">
                   <motion.span 
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                   >
                      Kumazon
                   </motion.span>
                </span>
              </Link>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl px-4 hidden md:flex">
              <div className="flex w-full rounded-md bg-white overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-amazon-yellow">
                  <input type="text" className="w-full text-black px-4 py-2 outline-none" placeholder="Search Kumazon" />
                  <button className="bg-amazon-yellow text-amazon px-4 py-2 hover:bg-amazon-orange transition-colors">
                     <Search size={20} />
                  </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
               {user ? (
                 <div className="hidden md:flex items-center space-x-4">
                   <div className="flex flex-col text-sm cursor-default whitespace-nowrap">
                     <span className="text-gray-300">Hello, {user.name}</span>
                     <span className="font-bold">Account</span>
                   </div>
                   <button 
                     onClick={handleLogout} 
                     className="bg-gray-200 hover:bg-gray-300 text-amazon font-bold py-1 px-3 rounded-sm text-sm transition-colors cursor-pointer border border-gray-400"
                   >
                     Sign Out
                   </button>
                 </div>
               ) : (
                 <Link to="/login" className="hidden md:flex flex-col hover:border-white border border-transparent p-1 rounded-sm text-sm">
                   <span className="text-gray-300">Hello, sign in</span>
                   <span className="font-bold">Account & Lists</span>
                 </Link>
               )}

               <Link to="/cart" className="relative hover:border-white border border-transparent p-2 rounded-sm flex items-center">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                     <ShoppingCart size={28} />
                  </motion.div>
                  {cartItemCount > 0 && (
                     <motion.span 
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-amazon transform translate-x-1/4 -translate-y-1/4 bg-amazon-yellow rounded-full"
                     >
                        {cartItemCount}
                     </motion.span>
                  )}
                  <span className="hidden md:block ml-2 font-bold mt-2">Cart</span>
               </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Nav Bar */}
        <div className="bg-[#232F3E] py-2 px-4 text-sm flex space-x-4 overflow-x-auto relative z-30">
           <button onClick={() => setIsSidebarOpen(true)} className="flex items-center space-x-1 font-bold border border-transparent hover:border-white px-2 rounded-sm transition-colors cursor-pointer">
             <Menu size={20} />
             <span>All</span>
           </button>
           <Link to="/category/medical care" className="border border-transparent hover:border-white px-2 py-1 rounded-sm whitespace-nowrap">Medical Care</Link>
           <Link to="/category/groceries" className="border border-transparent hover:border-white px-2 py-1 rounded-sm whitespace-nowrap">Groceries</Link>
           <Link to="/category/best sellers" className="border border-transparent hover:border-white px-2 py-1 rounded-sm whitespace-nowrap">Best Sellers</Link>
           <Link to="/category/amazon basics" className="border border-transparent hover:border-white px-2 py-1 rounded-sm whitespace-nowrap">Amazon Basics</Link>
           <Link to="/category/prime" className="border border-transparent hover:border-white px-2 py-1 rounded-sm whitespace-nowrap">Prime</Link>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black z-50 cursor-pointer" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50 overflow-y-auto shadow-xl flex flex-col">
              
              <div className="bg-[#232F3E] text-white py-4 px-6 flex items-center justify-between">
                 <div className="flex items-center space-x-3 font-bold text-lg">
                    <User size={28} />
                    <span>Hello, {user ? user.name : "Sign in"}</span>
                 </div>
                 <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
              </div>

              <div className="py-4 flex-grow">
                {SIDEBAR_LINKS.map(sec => (
                  <div className="mb-4" key={sec.title}>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 px-6">{sec.title}</h3>
                    <ul className="space-y-1 text-gray-700">
                       {sec.items.map(item => (
                         <li key={item}>
                           <Link to={`/category/${item.toLowerCase()}`} onClick={() => setIsSidebarOpen(false)} className="flex justify-between items-center py-3 px-6 hover:bg-gray-200 transition-colors">
                              <span>{item}</span><ChevronRight size={18} className="text-gray-400"/>
                           </Link>
                         </li>
                       ))}
                    </ul>
                    <hr className="border-gray-200 my-2" />
                  </div>
                ))}
                
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 px-6">Settings</h3>
                  <ul className="space-y-1 text-gray-700">
                     {user && user.role === 'admin' && (
                       <li><Link to="/admin" onClick={() => setIsSidebarOpen(false)} className="flex justify-between items-center py-3 px-6 hover:bg-gray-200"><span>Admin Panel</span></Link></li>
                     )}
                     <li><Link to={user ? "/" : "/login"} onClick={() => { if(!user) setIsSidebarOpen(false); else handleLogout(); }} className="flex justify-between items-center py-3 px-6 hover:bg-gray-200"><span>{user ? "Sign Out" : "Sign In"}</span></Link></li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
