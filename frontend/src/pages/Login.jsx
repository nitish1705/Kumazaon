import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[70vh] justify-center px-4">
      <motion.div 
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         className="w-full max-w-sm"
      >
        <div className="flex justify-center mb-6">
            <span className="text-4xl font-bold italic text-amazon">Kumazon</span>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
          <h2 className="text-3xl font-normal mb-4 text-gray-900">Sign in</h2>
          {error && <div className="text-red-600 bg-red-50 p-2 mb-4 rounded border border-red-200 text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="font-bold text-sm mb-1">Email or mobile phone number</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border border-gray-400 p-2 rounded focus:ring-2 focus:ring-amazon-yellow focus:border-amazon-yellow outline-none" 
                required 
              />
            </div>
            
            <div className="flex flex-col">
              <label className="font-bold text-sm mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border border-gray-400 p-2 rounded focus:ring-2 focus:ring-amazon-yellow focus:border-amazon-yellow outline-none" 
                required 
              />
            </div>

            <button type="submit" className="w-full bg-amazon-yellow hover:bg-amazon-orange text-amazon font-normal py-2 rounded-lg border border-yellow-500 shadow-sm transition-colors mt-2 cursor-pointer">
              Continue
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-4 leading-relaxed">
            By continuing, you agree to Kumazon's <span className="text-blue-600 hover:text-amazon-orange cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:text-amazon-orange cursor-pointer">Privacy Notice</span>.
          </p>
        </div>

        <div className="mt-8 relative">
           <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-gray-300"></div>
           </div>
           <div className="relative flex justify-center text-sm">
             <span className="px-2 bg-gray-50 text-gray-500">New to Kumazon?</span>
           </div>
        </div>

        <Link to="/signup">
          <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 border border-gray-400 text-gray-800 font-normal py-2 rounded-lg shadow-sm transition-colors cursor-pointer text-sm">
            Create your Kumazon account
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;
