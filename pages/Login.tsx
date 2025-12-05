import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP send
    if(phone.length >= 10) setStep(2);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if(otp === '1234') {
        login(phone, role);
        navigate(role === 'admin' ? '/admin' : '/');
    } else {
        alert("Invalid OTP (Use 1234)");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold text-xl">
             TR
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
             {step === 1 ? 'Sign in to your account' : 'Enter verification code'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
             {step === 1 ? 'Or access wholesale pricing' : `Sent to +91 ${phone}`}
          </p>
        </div>

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
            <div>
               <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
               <input
                 id="phone"
                 name="phone"
                 type="tel"
                 required
                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                 placeholder="Enter 10 digit number"
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
               />
            </div>
            
            <div className="flex items-center gap-4">
               <label className="flex items-center gap-2 text-sm text-gray-600">
                   <input type="radio" name="role" checked={role === 'customer'} onChange={() => setRole('customer')} className="text-green-600 focus:ring-green-500" />
                   Customer
               </label>
               <label className="flex items-center gap-2 text-sm text-gray-600">
                   <input type="radio" name="role" checked={role === 'admin'} onChange={() => setRole('admin')} className="text-green-600 focus:ring-green-500" />
                   Admin
               </label>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Send OTP
            </button>
          </form>
        ) : (
             <form className="mt-8 space-y-6" onSubmit={handleVerify}>
            <div>
               <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
               <input
                 id="otp"
                 name="otp"
                 type="text"
                 required
                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                 placeholder="Enter 1234"
                 value={otp}
                 onChange={(e) => setOtp(e.target.value)}
               />
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Verify & Login
            </button>
            <div className="text-center">
                <button type="button" onClick={() => setStep(1)} className="text-sm text-green-600 hover:underline">Change Number</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
