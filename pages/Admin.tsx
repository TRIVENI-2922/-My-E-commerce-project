import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Save, PlusCircle, AlertCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { user, products, updateProductPrice, toggleProductStock } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  if (user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage daily prices and stock availability.</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-green-700">
            <PlusCircle size={20} /> Add Product
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
             <h2 className="font-semibold text-gray-700">Product Price Manager</h2>
             <span className="text-xs text-gray-500 italic">Prices automatically update on customer side</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retail Price (₹)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wholesale Price (₹)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <React.Fragment key={product.id}>
                    {product.variants.map((variant, index) => (
                      <tr key={variant.id} className={index === 0 ? "bg-white" : "bg-gray-50/50"}>
                        {index === 0 && (
                          <td rowSpan={product.variants.length} className="px-6 py-4 whitespace-nowrap align-top">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-xs text-gray-500">{product.category}</div>
                              </div>
                            </div>
                          </td>
                        )}
                        {index === 0 && (
                          <td rowSpan={product.variants.length} className="px-6 py-4 whitespace-nowrap align-top">
                             <button 
                               onClick={() => toggleProductStock(product.id)}
                               className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                 product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                               }`}
                             >
                               {product.inStock ? 'In Stock' : 'Out of Stock'}
                             </button>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {variant.unit} {variant.weightDescription && <span className="text-xs text-gray-400">({variant.weightDescription})</span>}
                        </td>
                        
                        {/* Price Inputs */}
                        <td className="px-6 py-4 whitespace-nowrap">
                           <input 
                             type="number" 
                             defaultValue={variant.price}
                             onBlur={(e) => updateProductPrice(product.id, variant.id, Number(e.target.value), variant.wholesalePrice)}
                             className="w-20 border-gray-300 rounded-md shadow-sm text-sm focus:ring-green-500 focus:border-green-500 p-1 border"
                           />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           <input 
                             type="number" 
                             defaultValue={variant.wholesalePrice}
                             onBlur={(e) => updateProductPrice(product.id, variant.id, variant.price, Number(e.target.value))}
                             className="w-20 border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500 p-1 border"
                           />
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-green-600 hover:text-green-900" title="Auto-saved on blur">
                              <Save size={16} />
                            </button>
                         </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
