'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background-card/80 backdrop-blur-md border-b-2 border-border-gold">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-gold ring-offset-2 ring-offset-background-dark">
              <Image
                src="/images/logo.png"
                alt="bartop logo"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold text-primary-gold tracking-wide">bartop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/download" className="text-text-primary hover:text-primary-gold transition-colors">
              Descargar
            </Link>
            <Button href="/download" variant="primary" size="sm">
              Descargar APK
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary hover:text-primary-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t-2 border-border-gold pt-4">
            <Link
              href="/download"
              className="block text-text-primary hover:text-primary-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Descargar
            </Link>
            <Button href="/download" variant="primary" size="sm" className="w-full">
              Descargar APK
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}

