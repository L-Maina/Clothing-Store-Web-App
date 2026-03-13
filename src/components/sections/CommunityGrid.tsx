'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CommunityPhoto {
  id: string;
  imageUrl: string;
  username: string;
}

export function CommunityGrid() {
  const [photos, setPhotos] = useState<CommunityPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/community')
      .then(res => res.json())
      .then(data => {
        setPhotos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="community" className="py-20 lg:py-32 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <Instagram className="w-5 h-5" />
            <span className="font-medium tracking-wider text-sm uppercase">@clothingctrl</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
            #CTRLSTYLE
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-6">
            Tag us in your fits for a chance to be featured. Show us how you style your favorite pieces.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/community">
              <Button
                variant="outline"
                className="border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black rounded-none group"
              >
                VIEW ALL
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href="https://www.instagram.com/clothing.ctrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-none group"
              >
                <Instagram className="w-4 h-4 mr-2" />
                FOLLOW US
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-900 animate-pulse" />
            ))}
          </div>
        ) : photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {photos.map((photo, index) => (
              <motion.a
                key={photo.id}
                href="https://www.instagram.com/clothing.ctrl"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square group overflow-hidden bg-zinc-900"
              >
                <img
                  src={photo.imageUrl}
                  alt={`Style by ${photo.username}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Username */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-medium text-sm">{photo.username}</span>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/60">Be the first to tag us in your fit!</p>
          </div>
        )}
      </div>
    </section>
  );
}
