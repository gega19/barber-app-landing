'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import { analytics } from '@/lib/analytics';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-card to-background-dark" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-gold/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              href="/download" 
              variant="primary" 
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
              onClick={() => analytics.trackClick('download_button_hero', { location: 'hero' })}
            >
              Descargar APK
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-gold mb-2">100+</div>
              <div className="text-text-secondary">Barberos profesionales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-gold mb-2">50+</div>
              <div className="text-text-secondary">Barberías disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-gold mb-2">1000+</div>
              <div className="text-text-secondary">Citas reservadas</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

