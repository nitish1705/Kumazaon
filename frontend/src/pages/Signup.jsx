import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const Signup = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/signup`, { name, email, password });
      alert(data.message);
      setUser({ id: data.userId, name: data.name, email: data.email });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create account');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[70vh] justify-center px-4">
      <motion.div 
         initial={{ scale: 0.95, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         className="w-full max-w-sm"
      >
        <div className="flex justify-center mb-6 text-4xl font-bold italic text-amazon">Kumazon</div>

        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
          <h2 className="text-3xl font-normal mb-4 text-gray-900">Create account</h2>
          {error && <div className="text-red-600 bg-red-50 p-2 mb-4 rounded text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="font-bold text-sm mb-1">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="border border-gray-400 p-2 rounded focus:ring-2 focus:ring-amazon-yellow outline-none" 
                required 
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold text-sm mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border border-gray-400 p-2 rounded focus:ring-2 focus:ring-amazon-yellow outline-none" 
                required 
              />
            </div>
            
            <div className="flex flex-col">
              <label className="font-bold text-sm mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                placeholder="At least 6 characters"
                onChange={e => setPassword(e.target.value)}
                className="border border-gray-400 p-2 rounded focus:ring-2 focus:ring-amazon-yellow outline-none" 
                required 
              />
            </div>

            <button type="submit" className="w-full bg-amazon-yellow hover:bg-amazon-orange text-amazon font-normal py-2 rounded-lg border border-yellow-500 shadow-sm transition-colors mt-2 cursor-pointer">
              Continue
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-6 leading-relaxed">
            By continuing, you agree to Kumazon's <span className="text-blue-600 hover:underline">Conditions of Use</span> and <span className="text-blue-600 hover:underline">Privacy Notice</span>.
          </p>

          <hr className="my-6 border-gray-200" />
          <p className="text-sm">Already have an account? <Link to="/login" className="text-blue-600 hover:text-amazon-orange">Sign in &gt;</Link></p>
        </div>

      </motion.div>
    </div>
  );
};

export default Signup;
