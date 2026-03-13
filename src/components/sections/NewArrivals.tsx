'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductGrid } from '@/components/products/ProductGrid';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAt?: number | null;
  images: string;
  colors: string;
  sizes: string;
  isNew?: boolean;
  isLimited?: boolean;
  limitedQty?: number | null;
  brand?: string | null;
  condition?: string;
  category?: {
    name: string;
    type: string;
  };
}

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?new=true')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="new" className="py-16 lg:py-24 bg-zinc-950">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-amber-400 font-medium tracking-wider text-sm uppercase mb-2">
            Fresh From The Store
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
            NEW ARRIVALS
          </h2>
          <p className="text-white/60 max-w-md mx-auto">
            The latest pieces from luxury, streetwear & thrifted collections.
          </p>
        </motion.div>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-zinc-900 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} columns={4} />
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60">No new arrivals yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
