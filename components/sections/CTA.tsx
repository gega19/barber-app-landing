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
            barberos de tu ciudad.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="https://play.google.com/store/apps/details?id=com.bartop.app&hl=es_VE"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-w-[250px] text-lg"
              onClick={() => analytics.trackClick('playstore_button_cta', { location: 'cta' })}
            >
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,16.14C20.44,17.12 20.44,18.87 18.66,19.86L6.15,22.74L15.15,13.45L16.81,15.12M15.15,10.55L6.15,1.26L18.66,4.14C20.44,5.13 20.44,6.88 18.66,7.86L16.81,8.88L15.15,10.55M14.41,12L22,12C22.58,12 23.06,12.48 23.06,13.06C23.06,13.63 22.58,14.11 22,14.11L14.41,14.11V12Z" />
                </svg>
                <span>Google Play</span>
              </div>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-w-[250px] text-lg opacity-75 cursor-default"
              disabled
            >
              <div className="flex flex-col items-center leading-tight">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,21.97C7.81,22 6.85,20.65 6,19.45C4.35,17 3.09,12.4 4.84,9.39C5.71,7.9 7.23,6.95 8.9,6.93C10.17,6.9 11.36,7.79 12.15,7.79C12.93,7.79 14.38,6.73 15.92,6.89C16.56,6.92 18.36,7.15 19.5,8.82C19.42,8.87 17.31,10.1 17.35,12.6C17.39,15.54 19.86,16.5 19.9,16.5C19.88,16.56 19.5,17.9 18.71,19.5M15.8,3.56C16.47,2.75 16.93,1.6 16.8,0.45C15.82,0.49 14.63,1.1 13.93,1.91C13.31,2.63 12.77,3.8 12.92,5.01C14,5.09 15.13,4.4 15.8,3.56Z" />
                  </svg>
                  <span>App Store</span>
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-primary-gold/70">En construcción</span>
              </div>
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

