'use client';

import Link from 'next/link';
import { Instagram, MapPin, Clock, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-black text-white">
                CLOTHING<span className="text-amber-400">CTRL</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your one-stop fashion destination in Nairobi. From luxury designer pieces to streetwear essentials, thrifted gems to custom creations.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/clothing.ctrl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-amber-400 rounded-full flex items-center justify-center text-white/60 hover:text-black transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@clothing.ctrl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-amber-400 rounded-full flex items-center justify-center text-white/60 hover:text-black transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Shop</h4>
            <ul className="space-y-3">
              {[
                { name: 'Clothes', href: '#shop' },
                { name: 'Shoes', href: '#shop' },
                { name: 'Accessories', href: '#shop' },
                { name: 'New Arrivals', href: '#new' },
                { name: 'Limited Drops', href: '#drop' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-amber-400 text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Brands</h4>
            <ul className="space-y-3">
              {['Gucci', 'Prada', 'Balenciaga', 'Bape', 'Diesel', 'Chrome Hearts', 'Carhartt', 'Thrifted', 'Custom'].map((item) => (
                <li key={item}>
                  <span className="text-white/60 text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  Cargen House, Harambee Ave<br />
                  3rd Floor, Room 310<br />
                  Nairobi CBD, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  Mon - Sat: 12pm - 6pm
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@clothingctrl.com" className="text-white/60 hover:text-amber-400 text-sm transition-colors">
                  info@clothingctrl.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Clothing Ctrl. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Shipping Info
            </Link>
          </div>
        </div>

        {/* Worldwide Shipping Banner */}
        <div className="mt-8 text-center pb-20 md:pb-4">
          <p className="text-white/30 text-xs">
            🌍 Worldwide Shipping Available • Authentic Guaranteed • Nairobi, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
