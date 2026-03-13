'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/layout/Hero';
import { Footer } from '@/components/layout/Footer';
import { ShopSection } from '@/components/sections/ShopSection';
import { NewArrivals } from '@/components/sections/NewArrivals';
import { LimitedDrop } from '@/components/sections/LimitedDrop';
import { CommunityGrid } from '@/components/sections/CommunityGrid';
import { Newsletter } from '@/components/sections/Newsletter';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickView } from '@/components/products/QuickView';
import { LoginModal } from '@/components/auth/LoginModal';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';

export default function Home() {
  // Seed database on first load
  useEffect(() => {
    const seedDatabase = async () => {
      try {
        const response = await fetch('/api/seed', { method: 'POST' });
        const data = await response.json();
        if (data.success) {
          console.log('Database seeded successfully');
        }
      } catch {
        console.log('Database may already be seeded');
      }
    };
    seedDatabase();
  }, []);

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <CartDrawer />
      <QuickView />
      <LoginModal />
      <WishlistDrawer />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Shop Section with Tabs */}
      <section id="shop">
        <ShopSection />
      </section>
      
      {/* New Arrivals */}
      <section id="new">
        <NewArrivals />
      </section>
      
      {/* Limited Drop Countdown */}
      <section id="drop">
        <LimitedDrop />
      </section>
      
      {/* Community Photos */}
      <section id="community">
        <CommunityGrid />
      </section>
      
      {/* Newsletter Signup */}
      <Newsletter />
      
      <Footer />
    </main>
  );
}
