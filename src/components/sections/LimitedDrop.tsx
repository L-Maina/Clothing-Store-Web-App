'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/ui/CountdownTimer';

interface DropData {
  id: string;
  name: string;
  description: string;
  date: string;
  image: string;
}

export function LimitedDrop() {
  const [drop, setDrop] = useState<DropData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/drop')
      .then(res => res.json())
      .then(data => {
        setDrop(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="drop" className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-96 bg-zinc-900 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!drop) return null;

  return (
    <section id="drop" className="py-16 lg:py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 px-4 py-2 text-sm font-medium mb-6">
              <Bell className="w-4 h-4" />
              UPCOMING DROP
            </div>

            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight mb-4">
              {drop.name}
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-8">
              {drop.description}
            </p>

            {/* Countdown */}
            <div className="mb-8">
              <p className="text-white/40 text-sm uppercase tracking-wider mb-4">
                Drops in
              </p>
              <CountdownTimer targetDate={new Date(drop.date)} />
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white hover:bg-white/90 text-black font-bold py-4 px-8 rounded-none group">
                GET NOTIFIED
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 py-4 px-8 rounded-none"
              >
                VIEW PREVIEW
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-square lg:aspect-[4/5] relative overflow-hidden">
              <img
                src={drop.image || 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&h=1000&fit=crop'}
                alt={drop.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-amber-400 text-black text-xs font-bold px-3 py-1 tracking-wider">
                EXCLUSIVE ACCESS
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-amber-400/30" />
            <div className="absolute -top-4 -right-4 w-32 h-32 border-2 border-amber-400/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
