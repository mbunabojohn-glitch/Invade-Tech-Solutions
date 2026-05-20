import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Truck, 
  Minus, 
  Plus, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    deliveryAddress: '',
    quantity: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateQuantity = (val: number) => {
    setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity + val) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Mock API call - replace with your actual endpoint
      await axios.post('/api/orders', formData);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Failed to place order. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#020d1f] text-white flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-3xl text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Order Received!</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. 
            We've received your order for {formData.quantity} unit(s) and will call you shortly to confirm delivery.
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="w-full bg-white text-[#020d1f] font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020d1f] text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#020d1f]/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center">
          <button 
            onClick={() => navigate('/shop')}
            className="p-2 -ml-2 hover:bg-slate-800 rounded-full transition-colors flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="flex-grow text-center font-bold text-lg mr-8">Checkout</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8">
        {/* Product Summary Card */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-slate-800 rounded-2xl flex-shrink-0 overflow-hidden shadow-xl">
              <img 
                src="/images/power-tank.webp" 
                alt="Itel Power Inverter" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="flex-grow">
              <div className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
                Limited Bundle Offer
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Itel 500W Solar Tank Inverter</h2>
              <p className="text-xl font-black text-white mb-4">₦350,000.00</p>
              
              <div className="space-y-2 mb-6">
                <p className="flex items-center justify-center md:justify-start gap-2 text-green-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  FREE: 200W Sonik Energy Saving Iron
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  2yr Warranty
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Settings className="w-4 h-4 text-cyan-500" />
                  Free Install
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Truck className="w-4 h-4 text-cyan-500" />
                  Pay on Delivery
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-slate-950/50 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-bold mb-2">Delivery Details</h3>
            <p className="text-slate-500">Please provide your info to complete the order</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-slate-400 mb-3 font-semibold uppercase text-xs tracking-widest">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-700"
                placeholder="e.g. John Doe"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-3 font-semibold uppercase text-xs tracking-widest">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-700"
                placeholder="e.g. 08012345678"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-3 font-semibold uppercase text-xs tracking-widest">Delivery Address</label>
              <textarea 
                name="deliveryAddress"
                required
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-700 resize-none"
                placeholder="Enter your full street address"
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-slate-900/30 rounded-2xl border border-slate-800">
              <div>
                <label className="block text-slate-400 mb-3 font-semibold uppercase text-xs tracking-widest">Quantity</label>
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <button 
                    type="button"
                    onClick={() => updateQuantity(-1)}
                    className="p-4 hover:bg-slate-800 transition-colors text-slate-400"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-bold w-12 text-center">{formData.quantity}</span>
                  <button 
                    type="button"
                    onClick={() => updateQuantity(1)}
                    className="p-4 hover:bg-slate-800 transition-colors text-slate-400"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-sm mb-1">Total Payable</p>
                <p className="text-3xl font-black text-cyan-400">₦{(formData.quantity * 350000).toLocaleString()}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-red-500 font-bold mb-6 flex items-center justify-center gap-2 animate-pulse">
                ⚠️ Only few units left! Order now before stock runs out
              </p>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#020d1f] font-black py-5 rounded-2xl text-xl transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-[#020d1f] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Complete My Order'
                )}
              </button>
              <p className="mt-6 text-slate-500 text-sm flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Secure Checkout | Payment on Delivery
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;