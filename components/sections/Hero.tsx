'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import { analytics } from '@/lib/analytics';
import TopBarbersAndWorkplaces from './TopBarbersAndWorkplaces';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-card to-background-dark" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-20 w-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Logo and App Name */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 ring-4 ring-primary-gold ring-offset-4 ring-offset-background-dark shadow-2xl shadow-primary-gold/30">
              <Image
                src="/images/logo.png"
                alt="bartop logo"
                width={128}
                height={128}
                className="object-cover"
                priority
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-gold mb-2 tracking-wide">
              bartop
            </h2>
            <p className="text-lg text-text-secondary">
              Encuentra a tu barbero ideal
            </p>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-card border-2 border-border-gold mb-8">
            <span className="text-sm text-primary-gold font-semibold">
              ✨ Disponible ahora para Android
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-text-primary via-primary-gold to-text-primary bg-clip-text text-transparent">
            Reserva tu cita con los{' '}
            <span className="text-primary-gold">mejores barberos</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubre barberías cerca de ti, explora perfiles de barberos profesionales
            y reserva tu cita de forma fácil y rápida.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 px-4 w-full sm:w-auto">
            <Button
              href="https://play.google.com/store/apps/details?id=com.bartop.app&hl=es_VE"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-w-[220px]"
              onClick={() => analytics.trackClick('playstore_button_hero', { location: 'hero' })}
            >
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,16.14C20.44,17.12 20.44,18.87 18.66,19.86L6.15,22.74L15.15,13.45L16.81,15.12M15.15,10.55L6.15,1.26L18.66,4.14C20.44,5.13 20.44,6.88 18.66,7.86L16.81,8.88L15.15,10.55M14.41,12L22,12C22.58,12 23.06,12.48 23.06,13.06C23.06,13.63 22.58,14.11 22,14.11L14.41,14.11V12Z" />
                </svg>
                <span>Google Play</span>
              </div>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-w-[220px] opacity-75 cursor-default"
              disabled
            >
              <div className="flex flex-col items-center leading-tight">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,21.97C7.81,22 6.85,20.65 6,19.45C4.35,17 3.09,12.4 4.84,9.39C5.71,7.9 7.23,6.95 8.9,6.93C10.17,6.9 11.36,7.79 12.15,7.79C12.93,7.79 14.38,6.73 15.92,6.89C16.56,6.92 18.36,7.15 19.5,8.82C19.42,8.87 17.31,10.1 17.35,12.6C17.39,15.54 19.86,16.5 19.9,16.5C19.88,16.56 19.5,17.9 18.71,19.5M15.8,3.56C16.47,2.75 16.93,1.6 16.8,0.45C15.82,0.49 14.63,1.1 13.93,1.91C13.31,2.63 12.77,3.8 12.92,5.01C14,5.09 15.13,4.4 15.8,3.56Z" />
                  </svg>
                  <span>App Store</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary-gold/70">En construcción</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Top Barbers and Workplaces Section */}
      <div className="relative z-10 -mt-8">
        <TopBarbersAndWorkplaces />
      </div>
    </section>
  );
}

