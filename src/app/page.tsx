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
      } catch (error) {
        console.log('Database may already be seeded');
      }
    };
    seedDatabase();
  }, []);

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <CartDrawer />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Shop Section with Tabs */}
      <ShopSection />
      
      {/* New Arrivals */}
      <NewArrivals />
      
      {/* Limited Drop Countdown */}
      <LimitedDrop />
      
      {/* Community Photos */}
      <CommunityGrid />
      
      {/* Newsletter Signup */}
      <Newsletter />
      
      <Footer />
    </main>
  );
}
