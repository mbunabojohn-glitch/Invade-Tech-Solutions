import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Truck, 
  Minus, 
  Plus, 
  CheckCircle2,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { apiService } from '../../lib/api';
import { nigerianStates, phoneValidation, emailValidation } from '../../data/nigerian-lgas';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    deliveryAddress: '',
    city: '',
    state: '',
    lga: '',
    notes: '',
    quantity: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    phoneNumber: '',
    email: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const totalAmount = formData.quantity * 400000;

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
    
    if (errors.phoneNumber || errors.email) { 
      toast.error('Please fix validation errors'); 
      return; 
    } 
    
    if (!formData.phoneNumber || !formData.email || !formData.state || !formData.lga) { 
      toast.error('Please fill all required fields'); 
      return; 
    } 
    
    setShowPaymentModal(true); 
  }; 

  const handlePayOnDelivery = async () => { 
    setShowPaymentModal(false); 
    setIsSubmitting(true); 
    try { 
      await apiService.createOrder({ 
        ...formData, 
        paymentMethod: 'pay_on_delivery', 
        deliveryFee: 0, 
        amount: totalAmount, 
        product: 'Itel 500W Solar Tank Inverter', 
        status: 'pending', 
      }); 
      setIsSuccess(true); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    } catch (error) { 
      toast.error('Failed to place order. Please try again.'); 
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
          <h2 className="text-3xl font-bold mb-4">Order Confirmed! 🎉</h2>
          <p className="text-slate-400 mb-4 text-lg">
            Thank you <span className="text-white font-semibold">{formData.fullName}</span>, your order has been received
          </p>
          <p className="text-slate-400 mb-4"> 
            Our team will contact you on <span className="text-white font-semibold">{formData.phoneNumber}</span> to confirm your delivery. 
          </p> 
          <p className="text-slate-400 mb-4"> 
            Delivery address: <span className="text-white font-semibold">{formData.deliveryAddress}, {formData.city}, {formData.lga}, {formData.state}</span> 
          </p> 
          <p className="text-slate-400 mb-8"> 
            Amount to pay on delivery: <span className="text-cyan-400 font-bold">₦{totalAmount.toLocaleString()}</span> 
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
                Limited Offer
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Itel 500W Solar Tank Inverter</h2>
              <p className="text-xl font-black text-white mb-4">₦400,000.00</p>
              
              <div className="space-y-2 mb-6"></div>

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
              <label className="block text-slate-400 mb-3 font-semibold uppercase text-xs tracking-widest">Email Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => { 
                  const value = e.target.value; 
                  setFormData({ ...formData, email: value }); 
                  if (value && !emailValidation(value)) { 
                    setErrors({ ...errors, email: 'Please enter a valid email address' }); 
                  } else { 
                    setErrors({ ...errors, email: '' }); 
                  } 
                }} 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-700"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>} 
            </div>

            <div>
              <label className="block text-slate-400 mb-3 font-semibold uppercase text-xs tracking-widest">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber"
                placeholder="09012345678"
                value={formData.phoneNumber}
                onChange={(e) => { 
                  const value = e.target.value; 
                  setFormData({ ...formData, phoneNumber: value }); 
                  if (value && !phoneValidation(value)) { 
                    setErrors({ ...errors, phoneNumber: 'Phone must be 11 digits starting with 0' }); 
                  } else { 
                    setErrors({ ...errors, phoneNumber: '' }); 
                  } 
                }} 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-700"
              />
              {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>} 
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

            <div>
              <label className="block text-slate-400 mb-3 font-semibold uppercase text-xs tracking-widest">City</label>
              <input 
                type="text" 
                name="city" 
                required 
                value={formData.city} 
                onChange={handleInputChange} 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-700" 
                placeholder="e.g. Lagos" 
              /> 
            </div> 

            <div> 
              <label className="block text-slate-400 mb-3 font-semibold uppercase text-xs tracking-widest">State</label> 
              <select 
                name="state" 
                value={formData.state} 
                onChange={(e) => { 
                  setFormData({ ...formData, state: e.target.value, lga: '' }); 
                }} 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white" 
              > 
                <option value="">Select State</option> 
                {Object.keys(nigerianStates).sort().map((state) => ( 
                  <option key={state} value={state}>{state}</option> 
                ))} 
              </select> 
            </div> 
            
            <div> 
              <label className="block text-slate-400 mb-3 font-semibold uppercase text-xs tracking-widest">LGA</label> 
              <select 
                name="lga" 
                value={formData.lga} 
                onChange={(e) => setFormData({ ...formData, lga: e.target.value })} 
                disabled={!formData.state} 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white disabled:opacity-50" 
              > 
                <option value="">Select LGA</option> 
                {formData.state && nigerianStates[formData.state as keyof typeof nigerianStates]?.map((lga) => ( 
                  <option key={lga} value={lga}>{lga}</option> 
                ))} 
              </select> 
            </div>

            <div> 
              <label className="block text-slate-400 mb-3 font-semibold uppercase text-xs tracking-widest">Additional Notes (Optional)</label> 
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleInputChange} 
                rows={2} 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-700 resize-none" 
                placeholder="Any special instructions for delivery" 
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
                <p className="text-3xl font-black text-cyan-400">₦{totalAmount.toLocaleString()}</p>
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
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Order Now'
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

      {showPaymentModal && ( 
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4"> 
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl"> 
            <h3 className="text-2xl font-bold text-white mb-2 text-center">Choose Payment Method</h3> 
            <p className="text-slate-400 text-center mb-8">How would you like to pay?</p> 
 
            {/* Paystack — Coming Soon */} 
            <div className="border border-slate-700 rounded-2xl p-5 mb-4 opacity-50 cursor-not-allowed flex items-center gap-4"> 
              <span className="text-3xl">💳</span> 
              <div className="flex-1"> 
                <p className="text-white font-bold">Pay with Card</p> 
                <p className="text-slate-400 text-sm">Secure online payment</p> 
              </div> 
              <span className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full font-semibold">Coming Soon</span> 
            </div> 
 
            {/* Pay on Delivery */} 
            <div 
              onClick={handlePayOnDelivery} 
              className="border-2 border-cyan-500/50 hover:border-cyan-500 bg-cyan-500/10 rounded-2xl p-5 mb-6 cursor-pointer flex items-center gap-4 transition-all hover:bg-cyan-500/20" 
            > 
              <span className="text-3xl">🚚</span> 
              <div className="flex-1"> 
                <p className="text-white font-bold">Pay on Delivery</p> 
                <p className="text-slate-400 text-sm">Pay when we arrive at your location</p> 
              </div> 
              <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-semibold border border-green-500/30">Free Delivery</span> 
            </div> 
 
            <button 
              onClick={() => setShowPaymentModal(false)} 
              className="w-full text-slate-400 hover:text-white py-3 transition-colors text-sm" 
            > 
              Cancel 
            </button> 
          </div> 
        </div> 
      )}
    </div>
  );
};

export default OrderForm;