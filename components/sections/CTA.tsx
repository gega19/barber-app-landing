'use client';

import React from 'react';
import Button from '../ui/Button';
import { analytics } from '@/lib/analytics';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-background-card via-background-dark to-background-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-gold/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-primary-gold rounded-2xl flex items-center justify-center">
              <svg
                className="w-12 h-12 text-text-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            ¿Listo para{' '}
            <span className="text-primary-gold">empezar</span>?
          </h2>

          {/* Description */}
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Descarga Barber App ahora y comienza a reservar tus citas con los mejores 
            barberos de tu ciudad. Disponible para Android.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              href="/download" 
              variant="primary" 
              size="lg"
              className="w-full sm:w-auto min-w-[250px] text-lg"
              onClick={() => analytics.trackClick('download_button_cta', { location: 'cta' })}
            >
              Descargar APK Gratis
            </Button>
          </div>

          {/* Additional info */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-text-secondary text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sin registro requerido</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fácil de instalar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

