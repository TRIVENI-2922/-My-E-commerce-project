import React, { useState } from 'react';
import { Plus, ShoppingBag, AlertCircle } from 'lucide-react';
import { Product, Unit } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, user } = useStore();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  
  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const displayPrice = (user?.isWholesale) ? selectedVariant.wholesalePrice : selectedVariant.price;

  const handleAdd = () => {
    addToCart(product, selectedVariantId, 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {product.isDailyDeal && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            Today's Deal
          </div>
        )}
        {!product.inStock && (
           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
             <span className="bg-gray-800 text-white px-3 py-1 text-sm font-bold rounded">Out of Stock</span>
           </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="text-xs text-green-600 font-medium mb-1 uppercase tracking-wide">{product.category}</div>
        <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto">
          {/* Variant Selector */}
          <div className="mb-3">
             <label className="text-xs font-semibold text-gray-500 mb-1 block">Select Quantity:</label>
             <select 
               value={selectedVariantId} 
               onChange={(e) => setSelectedVariantId(e.target.value)}
               className="w-full text-sm border-gray-200 border rounded-md py-1.5 px-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
             >
               {product.variants.map(v => (
                 <option key={v.id} value={v.id}>
                   {v.unit} {v.weightDescription ? `(${v.weightDescription})` : ''} - ₹{(user?.isWholesale ? v.wholesalePrice : v.price)}
                 </option>
               ))}
             </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">₹{displayPrice}</span>
              {user?.isWholesale && <span className="text-[10px] text-green-600 font-medium">Wholesale Price</span>}
            </div>
            
            <button 
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                product.inStock 
                ? 'bg-yellow-400 text-green-900 hover:bg-yellow-500 shadow-sm' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Add to cart"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
