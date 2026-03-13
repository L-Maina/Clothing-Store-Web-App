import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
// @ts-ignore - Force recompile
import { Prisma } from '@prisma/client';

export async function POST() {
  try {
    // Clear existing data
    await db.communityPhoto.deleteMany();
    await db.orderItem.deleteMany();
    await db.order.deleteMany();
    await db.cartItem.deleteMany();
    await db.review.deleteMany();
    await db.loyalty.deleteMany();
    await db.customer.deleteMany();
    await db.subscriber.deleteMany();
    await db.nextDrop.deleteMany();
    await db.product.deleteMany();
    await db.category.deleteMany();

    // Create categories with types
    // CLOTHES
    const tshirts = await db.category.create({
      data: { name: 'T-Shirts', slug: 't-shirts', type: 'CLOTHES', description: 'Tees and tops' },
    });
    const hoodies = await db.category.create({
      data: { name: 'Hoodies', slug: 'hoodies', type: 'CLOTHES', description: 'Hoodies and sweatshirts' },
    });
    const jackets = await db.category.create({
      data: { name: 'Jackets', slug: 'jackets', type: 'CLOTHES', description: 'Jackets and coats' },
    });
    const pants = await db.category.create({
      data: { name: 'Pants', slug: 'pants', type: 'CLOTHES', description: 'Pants and jeans' },
    });
    const shorts = await db.category.create({
      data: { name: 'Shorts', slug: 'shorts', type: 'CLOTHES', description: 'Shorts' },
    });

    // SHOES
    const sneakers = await db.category.create({
      data: { name: 'Sneakers', slug: 'sneakers', type: 'SHOES', description: 'Designer sneakers' },
    });
    const boots = await db.category.create({
      data: { name: 'Boots', slug: 'boots', type: 'SHOES', description: 'Boots and booties' },
    });
    const loafers = await db.category.create({
      data: { name: 'Loafers', slug: 'loafers', type: 'SHOES', description: 'Loafers and formal shoes' },
    });

    // ACCESSORIES
    const bags = await db.category.create({
      data: { name: 'Bags', slug: 'bags', type: 'ACCESSORIES', description: 'Bags and backpacks' },
    });
    const belts = await db.category.create({
      data: { name: 'Belts', slug: 'belts', type: 'ACCESSORIES', description: 'Designer belts' },
    });
    const wallets = await db.category.create({
      data: { name: 'Wallets', slug: 'wallets', type: 'ACCESSORIES', description: 'Wallets and card holders' },
    });
    const ties = await db.category.create({
      data: { name: 'Ties', slug: 'ties', type: 'ACCESSORIES', description: 'Ties and bow ties' },
    });
    const chains = await db.category.create({
      data: { name: 'Chains', slug: 'chains', type: 'ACCESSORIES', description: 'Chains and necklaces' },
    });
    const sunglasses = await db.category.create({
      data: { name: 'Sunglasses', slug: 'sunglasses', type: 'ACCESSORIES', description: 'Designer eyewear' },
    });
    const hats = await db.category.create({
      data: { name: 'Hats', slug: 'hats', type: 'ACCESSORIES', description: 'Caps and hats' },
    });

    // Create products - Prices in KES (Kenyan Shilling)
    const productsData = [
      // ============ T-SHIRTS ============
      {
        name: 'Gucci GG Monogram Tee',
        slug: 'gucci-gg-monogram-tee',
        description: 'Classic Gucci cotton t-shirt featuring the iconic GG monogram. Premium Italian cotton with relaxed fit.',
        price: 75000,
        compareAt: 95000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop'
        ]),
        colors: JSON.stringify(['Black', 'White', 'Navy']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: tshirts.id,
        brand: 'Gucci',
        condition: 'NEW',
        featured: true,
      },
      {
        name: 'Balenciaga Logo Oversized Tee',
        slug: 'balenciaga-logo-oversized-tee',
        description: 'Oversized Balenciaga t-shirt with bold logo print. Heavyweight cotton for premium feel.',
        price: 65000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop'
        ]),
        colors: JSON.stringify(['Black', 'White']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: tshirts.id,
        brand: 'Balenciaga',
        condition: 'NEW',
        isNew: true,
      },
      {
        name: 'BAPE Shark Camo Tee',
        slug: 'bape-shark-camo-tee',
        description: 'Iconic BAPE shark camo t-shirt. Premium cotton with all-over camo print.',
        price: 28000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop'
        ]),
        colors: JSON.stringify(['Green Camo', 'Blue Camo', 'Black']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: tshirts.id,
        brand: 'Bape',
        condition: 'NEW',
        featured: true,
      },
      {
        name: 'Chrome Hearts Cross Tee',
        slug: 'chrome-hearts-cross-tee',
        description: 'Iconic Chrome Hearts t-shirt with gothic cross graphic. Premium cotton with vintage wash.',
        price: 48000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=800&fit=crop'
        ]),
        colors: JSON.stringify(['Black', 'White']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: tshirts.id,
        brand: 'Chrome Hearts',
        condition: 'NEW',
        isLimited: true,
        limitedQty: 15,
      },
      {
        name: 'Vintage Diesel Graphic Tee',
        slug: 'vintage-diesel-graphic-tee',
        description: 'Authentic vintage Diesel graphic tee from the 90s. Unique distressed look.',
        price: 8500,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black']),
        sizes: JSON.stringify(['M', 'L']),
        categoryId: tshirts.id,
        brand: 'Diesel',
        condition: 'THRIFTED',
        isNew: true,
      },
      {
        name: 'Custom Hand-Painted Tee',
        slug: 'custom-hand-painted-tee',
        description: 'One-of-a-kind hand-painted custom tee. Each piece is unique.',
        price: 15000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['White', 'Black']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: tshirts.id,
        brand: 'Custom',
        condition: 'CUSTOM',
        featured: true,
      },

      // ============ HOODIES ============
      {
        name: 'Balenciaga Logo Hoodie',
        slug: 'balenciaga-logo-hoodie',
        description: 'Oversized Balenciaga hoodie with embroidered logo. Heavyweight cotton fleece.',
        price: 125000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&h=800&fit=crop'
        ]),
        colors: JSON.stringify(['Black', 'Grey', 'Navy']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: hoodies.id,
        brand: 'Balenciaga',
        condition: 'NEW',
        featured: true,
      },
      {
        name: 'BAPE Shark Hoodie',
        slug: 'bape-shark-hoodie',
        description: 'Iconic BAPE shark hoodie with full zip. Premium quality streetwear essential.',
        price: 45000,
        compareAt: 55000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Red', 'Green']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: hoodies.id,
        brand: 'Bape',
        condition: 'NEW',
        isNew: true,
      },
      {
        name: 'Carhartt WIP Hoodie',
        slug: 'carhartt-wip-hoodie',
        description: 'Classic Carhartt WIP hoodie with kangaroo pocket. Heavyweight cotton-poly blend.',
        price: 22000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Navy', 'Grey']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: hoodies.id,
        brand: 'Carhartt',
        condition: 'NEW',
      },
      {
        name: 'Thrifted Vintage Nike Hoodie',
        slug: 'thrifted-vintage-nike-hoodie',
        description: 'Authentic vintage Nike hoodie from the 90s. Perfect worn-in feel.',
        price: 12000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Grey', 'Navy']),
        sizes: JSON.stringify(['M', 'L', 'XL']),
        categoryId: hoodies.id,
        brand: 'Nike',
        condition: 'THRIFTED',
      },

      // ============ JACKETS ============
      {
        name: 'Gucci Leather Biker Jacket',
        slug: 'gucci-leather-biker-jacket',
        description: 'Luxurious Gucci leather biker jacket with horsebit detail. Premium lambskin.',
        price: 550000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=800&fit=crop'
        ]),
        colors: JSON.stringify(['Black']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: jackets.id,
        brand: 'Gucci',
        condition: 'NEW',
        isLimited: true,
        limitedQty: 3,
      },
      {
        name: 'Prada Re-Nylon Jacket',
        slug: 'prada-re-nylon-jacket',
        description: 'Sustainable Prada Re-Nylon jacket with Linea Rossa details. Water-resistant.',
        price: 215000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Navy']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: jackets.id,
        brand: 'Prada',
        condition: 'NEW',
        isNew: true,
      },
      {
        name: 'Diesel Leather Jacket',
        slug: 'diesel-leather-jacket',
        description: 'Edgy Diesel leather jacket with moto details. Premium quality leather.',
        price: 85000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Brown']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: jackets.id,
        brand: 'Diesel',
        condition: 'NEW',
        featured: true,
      },
      {
        name: 'Thrifted Vintage Denim Jacket',
        slug: 'thrifted-vintage-denim-jacket',
        description: 'Authentic vintage denim jacket. Perfectly distressed classic.',
        price: 8500,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1544923246-77307dd628b7?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Blue', 'Black']),
        sizes: JSON.stringify(['S', 'M', 'L']),
        categoryId: jackets.id,
        brand: 'Other',
        condition: 'THRIFTED',
      },
      {
        name: 'Custom Embroidered Jacket',
        slug: 'custom-embroidered-jacket',
        description: 'Custom jacket with hand-stitched embroidery. Unique statement piece.',
        price: 35000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1544923246-77307dd628b7?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Navy']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: jackets.id,
        brand: 'Custom',
        condition: 'CUSTOM',
      },

      // ============ PANTS ============
      {
        name: 'Balenciaga Track Pants',
        slug: 'balenciaga-track-pants',
        description: 'Matching Balenciaga track pants with oversized fit. Technical fabric.',
        price: 115000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1624378439576-3bc4657bab6b?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Navy', 'Grey']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: pants.id,
        brand: 'Balenciaga',
        condition: 'NEW',
        featured: true,
      },
      {
        name: 'Gucci Wide Leg Trousers',
        slug: 'gucci-wide-leg-trousers',
        description: 'Elegant Gucci wide leg trousers with Web detail. Premium wool blend.',
        price: 125000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1473966968600-fa803b773c90?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Navy', 'Grey']),
        sizes: JSON.stringify(['28', '30', '32', '34', '36']),
        categoryId: pants.id,
        brand: 'Gucci',
        condition: 'NEW',
        isNew: true,
      },
      {
        name: 'Carhartt WIP Cargo Pants',
        slug: 'carhartt-wip-cargo-pants',
        description: 'Classic Carhartt WIP cargo pants. Heavy canvas with multiple pockets.',
        price: 18000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1541096090599-0d0a8f88f03e?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Olive', 'Khaki']),
        sizes: JSON.stringify(['28', '30', '32', '34', '36']),
        categoryId: pants.id,
        brand: 'Carhartt',
        condition: 'NEW',
      },
      {
        name: 'Thrifted Vintage Jeans',
        slug: 'thrifted-vintage-jeans',
        description: 'Authentic vintage Levi\'s jeans. Classic straight fit.',
        price: 5500,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1541096090599-0d0a8f88f03e?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Blue', 'Black']),
        sizes: JSON.stringify(['28', '30', '32', '34']),
        categoryId: pants.id,
        brand: 'Other',
        condition: 'THRIFTED',
      },

      // ============ SHORTS ============
      {
        name: 'BAPE Shark Shorts',
        slug: 'bape-shark-shorts',
        description: 'BAPE shark shorts with signature design. Comfortable cotton blend.',
        price: 18000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1624378439576-3bc4657bab6b?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Green']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        categoryId: shorts.id,
        brand: 'Bape',
        condition: 'NEW',
      },

      // ============ SNEAKERS ============
      {
        name: 'Balenciaga Triple S Sneakers',
        slug: 'balenciaga-triple-s-sneakers',
        description: 'Iconic Balenciaga Triple S chunky sneakers. Triple-stacked sole.',
        price: 145000,
        compareAt: 175000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop'
        ]),
        colors: JSON.stringify(['Black', 'White', 'Grey']),
        sizes: JSON.stringify(['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']),
        categoryId: sneakers.id,
        brand: 'Balenciaga',
        condition: 'NEW',
        featured: true,
      },
      {
        name: 'Gucci Screener Sneakers',
        slug: 'gucci-screener-sneakers',
        description: 'Vintage-inspired Gucci Screener sneakers with Web detail.',
        price: 98000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['White/Green', 'Black']),
        sizes: JSON.stringify(['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']),
        categoryId: sneakers.id,
        brand: 'Gucci',
        condition: 'NEW',
        isNew: true,
      },
      {
        name: 'Prada America\'s Cup Sneakers',
        slug: 'prada-americas-cup-sneakers',
        description: 'Classic Prada America\'s Cup sneakers. Technical nylon and leather.',
        price: 110000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'White', 'Silver']),
        sizes: JSON.stringify(['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']),
        categoryId: sneakers.id,
        brand: 'Prada',
        condition: 'NEW',
      },
      {
        name: 'Nike Air Force 1 Custom',
        slug: 'nike-air-force-1-custom',
        description: 'Custom hand-painted Nike Air Force 1. One-of-a-kind design.',
        price: 25000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['White Custom', 'Black Custom']),
        sizes: JSON.stringify(['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']),
        categoryId: sneakers.id,
        brand: 'Custom',
        condition: 'CUSTOM',
        featured: true,
      },
      {
        name: 'Thrifted Vintage Jordans',
        slug: 'thrifted-vintage-jordans',
        description: 'Authentic vintage Air Jordan sneakers. Classic collector\'s item.',
        price: 18000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Red/Black', 'White/Black']),
        sizes: JSON.stringify(['EU 41', 'EU 42', 'EU 43', 'EU 44']),
        categoryId: sneakers.id,
        brand: 'Nike',
        condition: 'THRIFTED',
      },

      // ============ BOOTS ============
      {
        name: 'Prada Combat Boots',
        slug: 'prada-combat-boots',
        description: 'Edgy Prada combat boots with chunky sole. Premium leather.',
        price: 135000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black']),
        sizes: JSON.stringify(['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']),
        categoryId: boots.id,
        brand: 'Prada',
        condition: 'NEW',
        isNew: true,
      },

      // ============ LOAFERS ============
      {
        name: 'Gucci Horsebit Loafers',
        slug: 'gucci-horsebit-loafers',
        description: 'Classic Gucci horsebit loafers. Timeless Italian craftsmanship.',
        price: 85000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Brown']),
        sizes: JSON.stringify(['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']),
        categoryId: loafers.id,
        brand: 'Gucci',
        condition: 'NEW',
        featured: true,
      },

      // ============ BAGS ============
      {
        name: 'Balenciaga Hourglass Bag',
        slug: 'balenciaga-hourglass-bag',
        description: 'Sculptural Balenciaga Hourglass bag in embossed leather. Iconic B logo.',
        price: 245000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop'
        ]),
        colors: JSON.stringify(['Black', 'White', 'Red']),
        sizes: JSON.stringify(['One Size']),
        categoryId: bags.id,
        brand: 'Balenciaga',
        condition: 'NEW',
        featured: true,
      },
      {
        name: 'Prada Re-Nylon Backpack',
        slug: 'prada-re-nylon-backpack',
        description: 'Sustainable Prada Re-Nylon backpack. Spacious and stylish.',
        price: 165000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Navy']),
        sizes: JSON.stringify(['One Size']),
        categoryId: bags.id,
        brand: 'Prada',
        condition: 'NEW',
        isNew: true,
      },
      {
        name: 'Gucci Dionysus Bag',
        slug: 'gucci-dionysus-bag',
        description: 'Iconic Gucci Dionysus bag with tiger head closure. Supple leather.',
        price: 295000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Beige']),
        sizes: JSON.stringify(['One Size']),
        categoryId: bags.id,
        brand: 'Gucci',
        condition: 'NEW',
        isLimited: true,
        limitedQty: 5,
      },

      // ============ BELTS ============
      {
        name: 'Gucci GG Belt',
        slug: 'gucci-gg-belt',
        description: 'Iconic Gucci GG belt with signature double G buckle. Italian leather.',
        price: 55000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1553062407-98eeb64c13499?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Brown']),
        sizes: JSON.stringify(['75cm', '80cm', '85cm', '90cm', '95cm', '100cm']),
        categoryId: belts.id,
        brand: 'Gucci',
        condition: 'NEW',
        featured: true,
      },
      {
        name: 'Prada Re-Nylon Belt',
        slug: 'prada-re-nylon-belt',
        description: 'Sustainable Prada Re-Nylon belt with metal buckle.',
        price: 35000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1624222247344-550fb60983d2?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black']),
        sizes: JSON.stringify(['80cm', '85cm', '90cm', '95cm']),
        categoryId: belts.id,
        brand: 'Prada',
        condition: 'NEW',
        isNew: true,
      },

      // ============ WALLETS ============
      {
        name: 'Gucci Leather Wallet',
        slug: 'gucci-leather-wallet',
        description: 'Classic Gucci bi-fold wallet in premium leather. Multiple card slots.',
        price: 38000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1624222247344-550fb60983d2?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Brown']),
        sizes: JSON.stringify(['One Size']),
        categoryId: wallets.id,
        brand: 'Gucci',
        condition: 'NEW',
      },
      {
        name: 'Balenciaga Card Holder',
        slug: 'balenciaga-card-holder',
        description: 'Minimalist Balenciaga card holder with logo embossing.',
        price: 18000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1624222247344-550fb60983d2?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'White']),
        sizes: JSON.stringify(['One Size']),
        categoryId: wallets.id,
        brand: 'Balenciaga',
        condition: 'NEW',
        isNew: true,
      },

      // ============ TIES ============
      {
        name: 'Gucci Silk Tie',
        slug: 'gucci-silk-tie',
        description: 'Luxurious Gucci silk tie with signature pattern. Perfect for formal occasions.',
        price: 25000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1589756823695-278bc923a959?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Navy', 'Burgundy', 'Black']),
        sizes: JSON.stringify(['One Size']),
        categoryId: ties.id,
        brand: 'Gucci',
        condition: 'NEW',
        featured: true,
      },
      {
        name: 'Graphic Art Tie',
        slug: 'graphic-art-tie',
        description: 'Unique graphic art tie. Statement piece for any outfit.',
        price: 2500,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1589756823695-278bc923a959?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Multicolor', 'Black', 'Blue']),
        sizes: JSON.stringify(['One Size']),
        categoryId: ties.id,
        brand: 'Other',
        condition: 'NEW',
        isNew: true,
      },
      {
        name: 'Thrifted Vintage Tie Collection',
        slug: 'thrifted-vintage-tie-collection',
        description: 'Assorted vintage ties. Perfect for collectors or unique styling.',
        price: 2000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1589756823695-278bc923a959?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Various']),
        sizes: JSON.stringify(['One Size']),
        categoryId: ties.id,
        brand: 'Other',
        condition: 'THRIFTED',
      },

      // ============ CHAINS ============
      {
        name: 'Chrome Hearts Cross Pendant',
        slug: 'chrome-hearts-cross-pendant',
        description: 'Iconic Chrome Hearts cross pendant in sterling silver. Gothic details.',
        price: 98000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop'
        ]),
        colors: JSON.stringify(['Silver']),
        sizes: JSON.stringify(['One Size']),
        categoryId: chains.id,
        brand: 'Chrome Hearts',
        condition: 'NEW',
        isLimited: true,
        limitedQty: 8,
        featured: true,
      },
      {
        name: 'Custom Name Chain',
        slug: 'custom-name-chain',
        description: 'Custom name chain in your choice of style. Personalized jewelry.',
        price: 12000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Gold', 'Silver']),
        sizes: JSON.stringify(['16"', '18"', '20"', '22"']),
        categoryId: chains.id,
        brand: 'Custom',
        condition: 'CUSTOM',
        isNew: true,
      },

      // ============ SUNGLASSES ============
      {
        name: 'Gcci Square Sunglasses',
        slug: 'gucci-square-sunglasses',
        description: 'Bold Gucci square sunglasses with GG logo temples. UV protection.',
        price: 35000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Tortoise']),
        sizes: JSON.stringify(['One Size']),
        categoryId: sunglasses.id,
        brand: 'Gucci',
        condition: 'NEW',
        featured: true,
      },
      {
        name: 'Prada Linea Rossa Sunglasses',
        slug: 'prada-linea-rossa-sunglasses',
        description: 'Sporty Prada Linea Rossa sunglasses. Modern design with red accent.',
        price: 32000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'White']),
        sizes: JSON.stringify(['One Size']),
        categoryId: sunglasses.id,
        brand: 'Prada',
        condition: 'NEW',
        isNew: true,
      },

      // ============ HATS ============
      {
        name: 'Prada Re-Nylon Cap',
        slug: 'prada-re-nylon-cap',
        description: 'Sustainable Prada Re-Nylon cap with Linea Rossa logo.',
        price: 42000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'White', 'Navy']),
        sizes: JSON.stringify(['One Size']),
        categoryId: hats.id,
        brand: 'Prada',
        condition: 'NEW',
        isNew: true,
      },
      {
        name: 'BAPE STA Cap',
        slug: 'bape-sta-cap',
        description: 'Classic BAPE STA cap with ape logo. Streetwear essential.',
        price: 12000,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Black', 'Navy', 'Green']),
        sizes: JSON.stringify(['One Size']),
        categoryId: hats.id,
        brand: 'Bape',
        condition: 'NEW',
      },
      {
        name: 'Thrifted Vintage Snapback',
        slug: 'thrifted-vintage-snapback',
        description: 'Authentic vintage snapback. Unique designs.',
        price: 3500,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&h=800&fit=crop',
        ]),
        colors: JSON.stringify(['Various']),
        sizes: JSON.stringify(['One Size']),
        categoryId: hats.id,
        brand: 'Other',
        condition: 'THRIFTED',
      },
    ];

    for (const product of productsData) {
      await db.product.create({ data: product });
    }

    // Create community photos
    const communityPhotos = [
      { imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop', username: '@nairobi_style', approved: true },
      { imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop', username: '@kenya_fits', approved: true },
      { imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', username: '@street_ctrl', approved: true },
      { imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop', username: '@fashion_ke', approved: true },
      { imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=400&fit=crop', username: '@ctrl_clothing', approved: true },
      { imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop', username: '@luxury_nairobi', approved: true },
    ];

    for (const photo of communityPhotos) {
      await db.communityPhoto.create({ data: photo });
    }

    // Create next drop
    const dropDate = new Date();
    dropDate.setDate(dropDate.getDate() + 10);
    dropDate.setHours(12, 0, 0, 0);

    await db.nextDrop.create({
      data: {
        name: 'SPRING COLLECTION DROP',
        description: 'New arrivals from top designers. Exclusive pieces from Gucci, Prada, Balenciaga & more.',
        date: dropDate,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
        active: true,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      products: productsData.length,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
