import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

const AdminPanel = ({ user }) => {
  const [data, setData] = useState({ users: [], orders: [], orderItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/admin/tables`);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-xl">Loading admin data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  const renderTable = (title, headers, rows) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-amazon">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((header, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 px-4 py-2">
                    {row[header.toLowerCase().replace(' ', '_')] || row[header.toLowerCase()] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-amazon mb-4">Admin Panel</h1>
        <p className="text-gray-600">Welcome, {user.name}. Here you can view all database tables.</p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        {['users', 'orders', 'orderItems'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-amazon text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tables */}
      {activeTab === 'users' && renderTable(
        'Users',
        ['ID', 'Name', 'Email', 'Role', 'Created At'],
        data.users
      )}

      {activeTab === 'orders' && renderTable(
        'Orders',
        ['ID', 'User ID', 'Total Amount', 'Status', 'Created At'],
        data.orders
      )}

      {activeTab === 'orderItems' && renderTable(
        'Order Items',
        ['ID', 'Order ID', 'Product ID', 'Product Title', 'Price', 'Quantity', 'Created At'],
        data.orderItems
      )}
    </div>
  );
};

export default AdminPanel;