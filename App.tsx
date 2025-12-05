import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { StoreProvider, useStore } from './context/StoreContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Placeholder pages for routes that share logic or are static text
const PriceList = () => {
    // Reusing Shop for simplicity in this demo, but typically would be a table view
    // Here we redirect or render Shop with a different header? 
    // Let's make a simple table view.
    const { products } = useStore();
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Today's Price List</h1>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-yellow-400">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase">Retail Price</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase">Wholesale Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((p: any) => (
                             p.variants.map((v: any) => (
                                <tr key={v.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name} ({v.unit})</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{v.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{v.wholesalePrice}</td>
                                </tr>
                             ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Wholesale = () => {
     return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
             <h1 className="text-4xl font-bold mb-4 text-green-900">Bulk & Wholesale</h1>
             <p className="text-lg text-gray-600 mb-8">We supply to major hotels, catering services, and retail shops in Khammam.</p>
             <div className="grid md:grid-cols-2 gap-8 mb-12">
                 <div className="bg-white p-6 rounded-lg shadow border-t-4 border-yellow-400">
                     <h2 className="text-xl font-bold mb-2">For Retailers</h2>
                     <p className="text-gray-600">Daily delivery of fresh stock before 7 AM. Credit facility available for regular partners.</p>
                 </div>
                 <div className="bg-white p-6 rounded-lg shadow border-t-4 border-green-600">
                     <h2 className="text-xl font-bold mb-2">For Events & Functions</h2>
                     <p className="text-gray-600">Bulk fruit baskets and cut-fruit orders for marriages and functions.</p>
                 </div>
             </div>
             <a href="/#/login" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700">Login as Wholesale Partner</a>
        </div>
     );
};

const About = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
             <h1 className="text-3xl font-bold mb-6">About Triveni Renuka Fruits</h1>
             <div className="prose text-gray-600">
                 <p className="mb-4">Established in 2010, Triveni Renuka Wholesale Fruit Shop has been the backbone of fruit supply in Khammam.</p>
                 <p className="mb-4">We source directly from farmers in Kashmir, Nagpur, and local Telangana orchards to ensure minimum transit time and maximum freshness.</p>
                 <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
                 <ul className="list-disc pl-5 space-y-2">
                     <li>0% Preservatives</li>
                     <li>Fair pricing for farmers and customers</li>
                     <li>Hygiene first packaging</li>
                 </ul>
             </div>
        </div>
    );
};


const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/prices" element={<PriceList />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

const App = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <ScrollToTop />
        <AppContent />
      </HashRouter>
    </StoreProvider>
  );
};

export default App;