import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Tag, ShieldCheck, PhoneCall } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { BUSINESS_PHONE } from '../constants';

const Home = () => {
  const { products } = useStore();
  const popularProducts = products.filter(p => p.category === 'Popular').slice(0, 4);
  const dealProducts = products.filter(p => p.isDailyDeal).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop" alt="Fruits Pattern" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left text-white z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Fresh Fruits at <br/> <span className="text-yellow-400">Wholesale Prices</span>
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-lg mx-auto md:mx-0">
              Khammam's most trusted supplier for hotels, shops, and homes. Direct from farmers, delivered fresh daily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/shop" className="bg-yellow-400 text-green-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-lg flex items-center justify-center gap-2">
                Order Now <ArrowRight size={20} />
              </Link>
              <Link to="/prices" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition flex items-center justify-center">
                Today's Prices
              </Link>
            </div>
          </div>
          {/* Hero Image / Illustration could go here on the right side */}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                <Tag size={24} />
              </div>
              <h3 className="font-bold text-gray-900">Best Price</h3>
              <p className="text-sm text-gray-500">Wholesale rates for everyone</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-3">
                <Truck size={24} />
              </div>
              <h3 className="font-bold text-gray-900">Fast Delivery</h3>
              <p className="text-sm text-gray-500">Morning & Evening Slots</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-gray-900">Quality Check</h3>
              <p className="text-sm text-gray-500">Hand-picked fresh stock</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
                <PhoneCall size={24} />
              </div>
              <h3 className="font-bold text-gray-900">Support</h3>
              <p className="text-sm text-gray-500">Call {BUSINESS_PHONE}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Deals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
               <h2 className="text-3xl font-bold text-gray-900">Today's Deals</h2>
               <p className="text-gray-600 mt-2">Best prices available just for today</p>
            </div>
            <Link to="/shop" className="text-green-600 font-semibold hover:text-green-700 hidden sm:block">View All Products &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

       {/* Wholesale Banner */}
       <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-400 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-lg">
             <div className="z-10 md:w-2/3">
               <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-4">Are you a Hotel or Shop Owner?</h2>
               <p className="text-lg text-green-800 mb-6 font-medium">Get exclusive wholesale pricing for bulk orders. Crates, tons, and daily supplies available.</p>
               <Link to="/wholesale" className="inline-block bg-green-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition">
                 View Bulk Pricing
               </Link>
             </div>
             <div className="hidden md:block absolute right-0 bottom-0 h-full w-1/3 opacity-20 bg-no-repeat bg-contain bg-right-bottom" style={{ backgroundImage: 'url(https://cdn-icons-png.flaticon.com/512/1625/1625048.png)' }}></div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular in Khammam</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="mt-12 text-center">
            <Link to="/shop" className="inline-block border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition">
              Browse Full Catalog
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
