'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-6">
            <Mail className="w-8 h-8 text-amber-400" />
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
            JOIN THE LIST
          </h2>

          <p className="text-white/60 text-lg mb-8">
            Get early access to new arrivals, exclusive sales, and 15% off your first order.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 max-w-md mx-auto"
            >
              <Gift className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">You&apos;re on the list!</p>
              <p className="text-sm text-green-400/60 mt-1">Check your inbox for your 15% off code.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 px-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors"
                required
              />
              <Button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-8 py-4 rounded-none"
              >
                SUBSCRIBE
              </Button>
            </form>
          )}

          <p className="text-white/40 text-xs mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
