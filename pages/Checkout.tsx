import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle } from 'lucide-react';
import { BUSINESS_PHONE } from '../constants';

const Checkout = () => {
  const { cart, removeFromCart, addToCart, cartTotal, clearCart, products, user } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    slot: 'morning', // morning or evening
    payment: 'cod'
  });

  const handleQuantityChange = (item: any, delta: number) => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      if (item.quantity + delta <= 0) {
        removeFromCart(item.variantId);
      } else {
        addToCart(product, item.variantId, delta);
      }
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
    // Here we would ideally send data to backend
  };

  const sendToWhatsApp = () => {
    const itemsList = cart.map(i => `${i.name} (${i.unit}) x ${i.quantity} = ₹${i.price * i.quantity}`).join('%0a');
    const total = cartTotal;
    const msg = `*New Order from Website*%0a---------------------------%0a${itemsList}%0a---------------------------%0a*Total: ₹${total}*%0a%0aName: ${formData.name}%0aAddress: ${formData.address}%0aPayment: ${formData.payment}%0aSlot: ${formData.slot}`;
    window.open(`https://wa.me/91${BUSINESS_PHONE}?text=${msg}`, '_blank');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-8">Thank you for shopping with Triveni Renuka Fruits. We will confirm your order shortly.</p>
          
          <button 
            onClick={sendToWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-4 transition"
          >
             Track on WhatsApp
          </button>
          
          <button onClick={() => navigate('/')} className="text-green-600 font-medium hover:underline">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center">
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
           <Link to="/shop" className="text-green-600 font-medium hover:underline flex items-center justify-center gap-2">
             <ArrowLeft size={16}/> Start Shopping
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Cart Items or Form */}
          <div className="lg:w-2/3">
             {step === 'cart' ? (
               <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                 <div className="p-6 border-b border-gray-100">
                   <h2 className="text-lg font-semibold text-gray-800">Review Cart Items</h2>
                 </div>
                 <ul className="divide-y divide-gray-100">
                   {cart.map((item) => (
                     <li key={item.variantId} className="p-6 flex items-center">
                       <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md border border-gray-200" />
                       <div className="ml-4 flex-1">
                         <h3 className="font-semibold text-gray-900">{item.name}</h3>
                         <p className="text-sm text-gray-500">{item.unit} - ₹{item.price}</p>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="flex items-center border border-gray-300 rounded-md">
                           <button onClick={() => handleQuantityChange(item, -1)} className="p-2 text-gray-500 hover:text-red-600"><Minus size={16}/></button>
                           <span className="px-2 font-medium text-gray-900 min-w-[24px] text-center">{item.quantity}</span>
                           <button onClick={() => handleQuantityChange(item, 1)} className="p-2 text-gray-500 hover:text-green-600"><Plus size={16}/></button>
                         </div>
                         <button onClick={() => removeFromCart(item.variantId)} className="p-2 text-gray-400 hover:text-red-500 ml-2">
                           <Trash2 size={20} />
                         </button>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>
             ) : (
               <div className="bg-white rounded-lg shadow-sm p-6">
                 <h2 className="text-lg font-semibold text-gray-800 mb-6">Delivery Details</h2>
                 <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 border p-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 border p-2" />
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                      <textarea required rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 border p-2"></textarea>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Slot</label>
                       <select value={formData.slot} onChange={e => setFormData({...formData, slot: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 border p-2">
                         <option value="morning">Morning (7 AM - 11 AM)</option>
                         <option value="evening">Evening (4 PM - 8 PM)</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                       <select value={formData.payment} onChange={e => setFormData({...formData, payment: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 border p-2">
                         <option value="cod">Cash on Delivery</option>
                         <option value="upi">UPI (GPay/PhonePe)</option>
                       </select>
                     </div>
                   </div>
                 </form>
               </div>
             )}
          </div>

          {/* Right Column: Summary */}
          <div className="lg:w-1/3">
             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
               <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
               <div className="space-y-3 mb-6">
                 <div className="flex justify-between text-gray-600">
                   <span>Subtotal</span>
                   <span>₹{cartTotal}</span>
                 </div>
                 <div className="flex justify-between text-gray-600">
                   <span>Delivery Charges</span>
                   <span className="text-green-600 font-medium">Free</span>
                 </div>
                 <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                   <span>Total</span>
                   <span>₹{cartTotal}</span>
                 </div>
               </div>

               {step === 'cart' ? (
                 <button 
                   onClick={() => setStep('details')}
                   className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
                 >
                   Proceed to Checkout
                 </button>
               ) : (
                  <div className="space-y-3">
                    <button 
                      form="checkout-form"
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Confirm Order
                    </button>
                    <button 
                      type="button"
                      onClick={() => setStep('cart')}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                      Back to Cart
                    </button>
                  </div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
