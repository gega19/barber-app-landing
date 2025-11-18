'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Card from '../ui/Card';

interface Screenshot {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Screenshots reales de la aplicación
const screenshots: Screenshot[] = [
  {
    id: 1,
    title: 'Pantalla de Inicio',
    description: 'Descubre barberías y barberos en tendencia',
    image: '/images/screenshots/home.jpeg',
  },
  {
    id: 2,
    title: 'Descubrir',
    description: 'Explora barberías y barberos cerca de ti',
    image: '/images/screenshots/descubir-ref.jpeg',
  },
  {
    id: 3,
    title: 'Barberías',
    description: 'Encuentra las mejores barberías disponibles',
    image: '/images/screenshots/barberias-ref.jpeg',
  },
  {
    id: 4,
    title: 'Crear Cita',
    description: 'Reserva tu cita de forma fácil y rápida',
    image: '/images/screenshots/create-citas.jpeg',
  },
  {
    id: 5,
    title: 'Mis Citas',
    description: 'Gestiona todas tus reservas desde un solo lugar',
    image: '/images/screenshots/citas.jpeg',
  },
  {
    id: 6,
    title: 'Perfil de Barbero',
    description: 'Explora trabajos y especialidades de cada barbero',
    image: '/images/screenshots/profile-barber.jpeg',
  },
];

export default function Screenshots() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="screenshots" className="py-20 bg-background-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Conoce la{' '}
            <span className="text-primary-gold">aplicación</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Explora las diferentes pantallas y funcionalidades de Barber App
          </p>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screenshots.map((screenshot) => (
            <Card
              key={screenshot.id}
              hover
              className="cursor-pointer overflow-hidden group"
              onClick={() => setSelectedImage(screenshot.id)}
            >
              {/* Screenshot Image */}
              <div className="bg-background-card-dark rounded-lg mb-4 overflow-hidden border-2 border-border-gold group-hover:border-primary-gold transition-colors">
                <div className="relative w-full" style={{ aspectRatio: '9/16', minHeight: '300px' }}>
                  <Image
                    src={screenshot.image}
                    alt={screenshot.title}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={90}
                    priority={screenshot.id <= 3}
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {screenshot.title}
              </h3>
              <p className="text-text-secondary text-sm">
                {screenshot.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <button
                className="absolute top-4 right-4 text-text-primary hover:text-primary-gold transition-colors z-10"
                onClick={() => setSelectedImage(null)}
                aria-label="Cerrar"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="bg-background-card rounded-lg p-4 border-2 border-border-gold max-w-sm mx-auto">
                <div className="relative bg-background-card-dark rounded-lg overflow-hidden" style={{ aspectRatio: '9/16', width: '100%', maxHeight: '80vh' }}>
                  {selectedImage && (
                    <Image
                      src={screenshots.find((s) => s.id === selectedImage)?.image || ''}
                      alt={screenshots.find((s) => s.id === selectedImage)?.title || ''}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 400px"
                      quality={95}
                    />
                  )}
                </div>
                {selectedImage && (
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      {screenshots.find((s) => s.id === selectedImage)?.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {screenshots.find((s) => s.id === selectedImage)?.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

