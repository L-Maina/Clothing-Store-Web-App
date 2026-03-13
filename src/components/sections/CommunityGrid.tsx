'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

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
        setPhotos(data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="community" className="py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <Instagram className="w-5 h-5" />
            <span className="font-medium tracking-wider text-sm uppercase">@clothingctrl</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
            #CTRLSTYLE
          </h2>
          <p className="text-white/60 max-w-md mx-auto">
            Tag us in your fits for a chance to be featured. Show us how you style your favorite pieces.
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-900 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {photos.map((photo, index) => (
              <motion.a
                key={photo.id}
                href="#"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square group overflow-hidden bg-zinc-900"
              >
                <img
                  src={photo.imageUrl || `https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop&sig=${index}`}
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
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 font-medium transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Follow us on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
