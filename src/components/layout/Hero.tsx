'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/10 to-transparent blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-amber-400/10 to-transparent blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto"
        >
          {/* Store Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-white/50 text-sm mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span>Nairobi CBD • Cargen House, Harambee Ave • Rm 310</span>
          </motion.div>

          {/* Custom Nameplate Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mb-8"
          >
            <div className="inline-block">
              {/* Main Logo Text */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight">
                <span className="block text-white relative">
                  CLOTHING
                  {/* Decorative underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                  />
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 mt-2">
                  CTRL
                </span>
              </h1>
              
              {/* Decorative elements */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
                <span className="text-amber-400 text-xs tracking-[0.4em] font-medium">EST. 2020</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-lg lg:text-xl max-w-2xl mx-auto mb-4"
          >
            Your One-Stop Fashion Destination
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-base lg:text-lg max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            From luxury designer pieces to streetwear essentials, thrifted gems to custom creations.
            We bring you the best of global fashion — all in one place.
          </motion.p>

          {/* Brand Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 lg:gap-3 mb-10"
          >
            {['Gucci', 'Prada', 'Balenciaga', 'Bape', 'Diesel', 'Chrome Hearts', 'Carhartt', 'Thrifted', 'Custom'].map((brand, i) => (
              <span 
                key={brand} 
                className="px-3 py-1.5 border border-white/10 rounded-full text-white/50 text-xs lg:text-sm hover:border-amber-400/50 hover:text-amber-400 transition-all cursor-default"
              >
                {brand}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-bold px-8 py-6 text-lg rounded-none group"
            >
              <Link href="#shop">
                SHOP NOW
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black font-bold px-8 py-6 text-lg rounded-none"
            >
              <Link href="#new">
                NEW ARRIVALS
              </Link>
            </Button>
          </motion.div>

          {/* Store Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 text-sm"
          >
            <div className="flex items-center gap-2 text-white/50">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Mon - Sat: 12pm - 6pm</span>
            </div>
            <div className="flex items-center gap-2 text-white/50">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-white/50">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Nairobi, Kenya</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
