'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function QuickView() {
  const { isQuickViewOpen, quickViewProductId, closeQuickView } = useUIStore();
  const { addItem, closeCart } = useCartStore();
  const [product, setProduct] = useState<Record<string, unknown> | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProductId) {
      fetch(`/api/products?id=${quickViewProductId}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
        });
    }
  }, [quickViewProductId]);

  const handleClose = () => {
    closeQuickView();
    setProduct(null);
    setSelectedImage(0);
    setSelectedColor(0);
    setSelectedSize(0);
    setQuantity(1);
  };

  if (!product) return null;

  const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images || [];
  const colors = typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors || [];
  const sizes = typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes || [];
  const reviews = (product.reviews as Array<{ rating: number }>) || [];
  const avgRating = reviews.length > 0 
    ? reviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / reviews.length 
    : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id as string,
      name: product.name as string,
      price: product.price as number,
      image: images[0] || '',
      color: colors[selectedColor] || '',
      size: sizes[selectedSize] || '',
      quantity,
    });
    handleClose();
  };

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-zinc-950 border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Images */}
              <div className="relative aspect-square bg-zinc-900">
                <img
                  src={images[selectedImage] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop'}
                  alt={product.name as string}
                  className="w-full h-full object-cover"
                />
                
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    {images.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={cn(
                          "w-16 h-16 border-2 overflow-hidden transition-all",
                          selectedImage === idx ? "border-amber-400" : "border-transparent opacity-60"
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 lg:p-8">
                {/* Rating */}
                {reviews.length > 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-4 h-4",
                            star <= Math.round(avgRating) ? "text-amber-400 fill-amber-400" : "text-white/20"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-white/60 text-sm">({reviews.length} reviews)</span>
                  </div>
                )}

                {/* Name */}
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {product.name as string}
                </h2>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-white">${product.price as number}</span>
                  {product.compareAt && (
                    <span className="text-lg text-white/40 line-through">${product.compareAt as number}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {product.description as string}
                </p>

                {/* Color */}
                <div className="mb-4">
                  <label className="block text-white text-sm font-medium mb-2">
                    Color: <span className="text-amber-400">{colors[selectedColor]}</span>
                  </label>
                  <div className="flex gap-2">
                    {colors.map((color: string, idx: number) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(idx)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all",
                          selectedColor === idx ? "border-amber-400 scale-110" : "border-transparent"
                        )}
                        style={{
                          backgroundColor: color.toLowerCase() === 'white' ? '#fff' : 
                            color.toLowerCase() === 'black' ? '#000' :
                            color.toLowerCase() === 'cream' ? '#f5f5dc' :
                            color.toLowerCase() === 'olive' ? '#708238' :
                            color.toLowerCase() === 'charcoal' ? '#36454f' :
                            color.toLowerCase() === 'sand' ? '#c2b280' :
                            color.toLowerCase() === 'burgundy' ? '#800020' :
                            color.toLowerCase() === 'navy' ? '#000080' :
                            color.toLowerCase() === 'tan' ? '#d2b48c' :
                            color.toLowerCase() === 'khaki' ? '#c3b091' :
                            color.toLowerCase() === 'grey' ? '#808080' :
                            color.toLowerCase() === 'gold' ? '#ffd700' :
                            color.toLowerCase() === 'silver' ? '#c0c0c0' :
                            '#888'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">
                    Size: <span className="text-amber-400">{sizes[selectedSize]}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size: string, idx: number) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(idx)}
                        className={cn(
                          "min-w-12 h-10 px-3 border text-sm font-medium transition-all",
                          selectedSize === idx 
                            ? "bg-amber-400 text-black border-amber-400" 
                            : "bg-transparent text-white border-white/30 hover:border-white"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-white/30">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-white font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-4 text-lg rounded-none"
                >
                  ADD TO CART — ${((product.price as number) * quantity).toFixed(2)}
                </Button>

                {/* Limited Badge */}
                {product.isLimited && (
                  <p className="text-center text-red-400 text-sm mt-4">
                    🔥 Only {product.limitedQty as number} left — Limited Edition
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
