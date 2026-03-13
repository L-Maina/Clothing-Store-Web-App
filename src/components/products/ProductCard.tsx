'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useUIStore, useCurrencyStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAt?: number | null;
  images: string | string[];
  colors: string | string[];
  sizes: string | string[];
  isNew?: boolean;
  isLimited?: boolean;
  limitedQty?: number | null;
  brand?: string | null;
  condition?: string;
  category?: {
    name: string;
  };
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Fallback images for different product types
const getFallbackImage = (productName: string, index: number) => {
  const seed = productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://images.unsplash.com/photo-${1558618666 + seed % 1000000}?w=600&h=800&fit=crop&auto=format`;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addItem } = useCartStore();
  const { openQuickView } = useUIStore();
  const { formatPrice } = useCurrencyStore();

  const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  const colors = typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors;
  const sizes = typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes;
  
  const mainImage = images[0] || getFallbackImage(product.name, 0);
  const hoverImage = images[1] || mainImage;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: mainImage,
      color: colors[selectedColor] || 'Default',
      size: sizes[selectedSize] || 'One Size',
      quantity: 1,
    });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const displayImage = imageError ? getFallbackImage(product.name, index) : (isHovered ? hoverImage : mainImage);
  const displayHoverImage = imageError ? getFallbackImage(product.name, index + 1) : hoverImage;

  // Calculate discount percentage
  const discountPercentage = product.compareAt 
    ? Math.round((1 - product.price / product.compareAt) * 100) 
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div
        className="relative aspect-[3/4] bg-zinc-900 overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Image */}
        <motion.img
          src={displayImage}
          alt={product.name}
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Hover Image */}
        <motion.img
          src={displayHoverImage}
          alt={`${product.name} alternate`}
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/20 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Badges - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          {product.isNew && (
            <span className="bg-amber-400 text-black text-xs font-bold px-3 py-1 tracking-wider">
              NEW
            </span>
          )}
          {product.isLimited && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 tracking-wider">
              LIMITED
            </span>
          )}
          {discountPercentage && (
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 tracking-wider">
              -{discountPercentage}%
            </span>
          )}
          {product.condition === 'THRIFTED' && (
            <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 tracking-wider">
              THRIFTED
            </span>
          )}
          {product.condition === 'CUSTOM' && (
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 tracking-wider">
              CUSTOM
            </span>
          )}
        </div>

        {/* Quick Actions - Top Left */}
        <div
          className={cn(
            "absolute top-3 left-3 flex flex-col gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          )}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={cn(
              "w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-all",
              isLiked 
                ? "bg-red-500 text-white" 
                : "bg-white/10 hover:bg-amber-400 hover:text-black text-white"
            )}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product.id);
            }}
            className="w-9 h-9 bg-white/10 backdrop-blur-sm hover:bg-amber-400 hover:text-black text-white rounded-full flex items-center justify-center transition-all"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-3 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
          )}
        >
          <Button
            onClick={handleAddToCart}
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-3 rounded-none group/btn"
          >
            <Plus className="w-4 h-4 mr-2 group-hover/btn:rotate-90 transition-transform duration-300" />
            ADD TO CART
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 px-1">
        {/* Brand */}
        {product.brand && (
          <p className="text-amber-400/80 text-xs font-medium tracking-wide mb-1">
            {product.brand}
          </p>
        )}

        {/* Name - Centered and Clear */}
        <h3 className="text-white font-medium text-sm text-center group-hover:text-amber-400 transition-colors line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Color Options */}
        {colors && colors.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-2">
            {colors.slice(0, 5).map((color: string, idx: number) => (
              <button
                key={color}
                onClick={() => setSelectedColor(idx)}
                className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all",
                  selectedColor === idx ? "border-amber-400 scale-125" : "border-transparent hover:border-white/50"
                )}
                style={{
                  backgroundColor: getColorHex(color)
                }}
                title={color}
              />
            ))}
            {colors.length > 5 && (
              <span className="text-white/40 text-xs flex items-center">+{colors.length - 5}</span>
            )}
          </div>
        )}

        {/* Price - Centered */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-white font-bold text-base">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-white/40 text-sm line-through">{formatPrice(product.compareAt)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Helper function to get color hex codes
function getColorHex(color: string): string {
  const colorMap: Record<string, string> = {
    'white': '#ffffff',
    'black': '#000000',
    'cream': '#f5f5dc',
    'olive': '#708238',
    'charcoal': '#36454f',
    'sand': '#c2b280',
    'burgundy': '#800020',
    'navy': '#000080',
    'tan': '#d2b48c',
    'khaki': '#c3b091',
    'grey': '#808080',
    'gray': '#808080',
    'gold': '#ffd700',
    'silver': '#c0c0c0',
    'red': '#ef4444',
    'blue': '#3b82f6',
    'green': '#22c55e',
    'yellow': '#eab308',
    'orange': '#f97316',
    'brown': '#78350f',
    'beige': '#d4a574',
    'pink': '#ec4899',
    'purple': '#a855f7',
    'multicolor': 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
  };
  
  const lowerColor = color.toLowerCase();
  return colorMap[lowerColor] || '#888888';
}
