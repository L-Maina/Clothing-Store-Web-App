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
import { StyleAssistant } from '@/components/sections/StyleAssistant';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickView } from '@/components/products/QuickView';
import { useCurrencyStore } from '@/lib/store';

export default function Home() {
  const { setRates } = useCurrencyStore();

  useEffect(() => {
    // Seed the database on load to ensure fresh data
    fetch('/api/seed', { method: 'POST' })
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Fetch exchange rates
    const fetchRates = async () => {
      try {
        const response = await fetch('/api/currency');
        const data = await response.json();
        if (data.success && data.rates) {
          setRates(data.rates);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };
    fetchRates();
  }, [setRates]);

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <Hero />
      <ShopSection />
      <NewArrivals />
      <LimitedDrop />
      <CommunityGrid />
      <Newsletter />
      <Footer />
      <CartDrawer />
      <QuickView />
      <StyleAssistant />
    </main>
  );
}
