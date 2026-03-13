'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, Shield, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCartStore, useCurrencyStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const { formatPrice, currency } = useCurrencyStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'paypal'>('mpesa');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Kenya',
    postalCode: '',
    mpesaNumber: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const subtotal = getSubtotal();
  const freeShippingThreshold = 10000;
  const shippingCost = 500;
  const shipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
    clearCart();
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-4">Order Confirmed!</h1>
          <p className="text-white/60 mb-2">Thank you for your purchase.</p>
          <p className="text-white/40 text-sm mb-8">
            We've sent a confirmation email to {formData.email}
          </p>
          <Link href="/">
            <Button className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-8 py-4 rounded-none">
              CONTINUE SHOPPING
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
          <Link href="/">
            <Button className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-8 py-4 rounded-none">
              START SHOPPING
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to shop
          </Link>
          <h1 className="text-3xl font-black text-white">CHECKOUT</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div className="bg-zinc-900 border border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-4">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (e.g., +254 7XX XXX XXX)"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-zinc-900 border border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-400" />
                  Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="sm:col-span-2 bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="South Africa">South Africa</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="UAE">UAE</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code (optional)"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-zinc-900 border border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  Payment Method
                </h2>
                
                {/* Payment Options */}
                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={cn(
                      "p-4 border text-center transition-all",
                      paymentMethod === 'mpesa'
                        ? "border-amber-400 bg-amber-400/10"
                        : "border-white/10 hover:border-white/30"
                    )}
                  >
                    <span className="text-2xl mb-2 block">📱</span>
                    <span className="text-white font-medium text-sm">M-Pesa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={cn(
                      "p-4 border text-center transition-all",
                      paymentMethod === 'card'
                        ? "border-amber-400 bg-amber-400/10"
                        : "border-white/10 hover:border-white/30"
                    )}
                  >
                    <span className="text-2xl mb-2 block">💳</span>
                    <span className="text-white font-medium text-sm">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={cn(
                      "p-4 border text-center transition-all",
                      paymentMethod === 'paypal'
                        ? "border-amber-400 bg-amber-400/10"
                        : "border-white/10 hover:border-white/30"
                    )}
                  >
                    <span className="text-2xl mb-2 block">🅿️</span>
                    <span className="text-white font-medium text-sm">PayPal</span>
                  </button>
                </div>

                {/* M-Pesa Form */}
                {paymentMethod === 'mpesa' && (
                  <div className="bg-green-900/20 border border-green-500/20 p-4">
                    <p className="text-green-400 text-sm mb-3">
                      You'll receive an M-Pesa prompt on your phone to complete payment.
                    </p>
                    <input
                      type="tel"
                      name="mpesaNumber"
                      placeholder="M-Pesa Number (e.g., 0712345678)"
                      required
                      value={formData.mpesaNumber}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}

                {/* Card Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="text"
                        name="cardCvc"
                        placeholder="CVC"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}

                {/* PayPal Form */}
                {paymentMethod === 'paypal' && (
                  <div className="bg-blue-900/20 border border-blue-500/20 p-4">
                    <p className="text-blue-400 text-sm">
                      You'll be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-4 rounded-none text-lg"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    PROCESSING...
                  </span>
                ) : (
                  `PAY ${formatPrice(total)}`
                )}
              </Button>

              {/* Security */}
              <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
                <Shield className="w-4 h-4" />
                <span>Secure checkout powered by SSL encryption</span>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-white/10 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-zinc-800 flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.name}</p>
                      <p className="text-white/40 text-xs">{item.color} / {item.size}</p>
                      <p className="text-white/60 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className="text-white">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-amber-400">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-white/40 text-right">in {currency}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
