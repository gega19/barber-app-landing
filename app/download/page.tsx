'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { appApi, AppVersion } from '@/lib/api';
import { analytics } from '@/lib/analytics';

export default function DownloadPage() {
  useEffect(() => {
    // Track page view
    analytics.trackPageView('/download');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-background-card to-background-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-primary-gold ring-offset-4 ring-offset-background-dark shadow-2xl shadow-primary-gold/30">
                <Image
                  src="/images/logo.png"
                  alt="bartop logo"
                  width={128}
                  height={128}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-gold mb-4 tracking-wide">
              bartop
            </h1>
            <p className="text-xl text-text-secondary">
              Descarga la aplicación oficial
            </p>
          </div>

          {/* Download Card */}
          <div className="bg-background-card border-2 border-border-gold rounded-2xl p-8 md:p-12 shadow-2xl">
            {/* Google Play & iOS Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="https://play.google.com/store/apps/details?id=com.bartop.app&hl=es_VE"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-200"
                onClick={() => analytics.trackClick('playstore_button_download_page', { location: 'download_page' })}
              >
                <div className="bg-background-dark border border-border-gold rounded-xl px-6 py-3 flex items-center gap-4 w-[240px] shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-primary-gold" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,16.14C20.44,17.12 20.44,18.87 18.66,19.86L6.15,22.74L15.15,13.45L16.81,15.12M15.15,10.55L6.15,1.26L18.66,4.14C20.44,5.13 20.44,6.88 18.66,7.86L16.81,8.88L15.15,10.55M14.41,12L22,12C22.58,12 23.06,12.48 23.06,13.06C23.06,13.63 22.58,14.11 22,14.11L14.41,14.11V12Z" />
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase text-text-secondary">Disponible en</span>
                    <span className="text-xl font-bold text-text-primary">Google Play</span>
                  </div>
                </div>
              </a>

              <div className="opacity-50 grayscale flex items-center justify-center">
                <div className="bg-background-dark/50 border border-border-gold/30 rounded-xl px-6 py-3 flex items-center gap-4 w-[240px] relative overflow-hidden">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-primary-gold" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,21.97C7.81,22 6.85,20.65 6,19.45C4.35,17 3.09,12.4 4.84,9.39C5.71,7.9 7.23,6.95 8.9,6.93C10.17,6.9 11.36,7.79 12.15,7.79C12.93,7.79 14.38,6.73 15.92,6.89C16.56,6.92 18.36,7.15 19.5,8.82C19.42,8.87 17.31,10.1 17.35,12.6C17.39,15.54 19.86,16.5 19.9,16.5C19.88,16.56 19.5,17.9 18.71,19.5M15.8,3.56C16.47,2.75 16.93,1.6 16.8,0.45C15.82,0.49 14.63,1.1 13.93,1.91C13.31,2.63 12.77,3.8 12.92,5.01C14,5.09 15.13,4.4 15.8,3.56Z" />
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase text-text-secondary">App Store</span>
                    <span className="text-xl font-bold text-text-primary">Próximamente</span>
                  </div>
                  <div className="absolute top-1 right-2 rotate-12">
                    <span className="text-[8px] bg-primary-gold text-text-dark px-1 font-black rounded uppercase">iOS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-primary-gold hover:text-primary-gold-dark transition-colors inline-flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

