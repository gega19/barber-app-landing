'use client';

import React from 'react';
import Image from 'next/image';
import { TopBarber } from '@/lib/api';

interface BarberCardProps {
  barber: TopBarber;
  onClick?: () => void;
}

export default function BarberCard({ barber, onClick }: BarberCardProps) {
  // Generate avatar fallback with initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarUrl = () => {
    if (barber.avatar) return barber.avatar;
    if (barber.image) return barber.image;
    return null;
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-4 h-4 text-primary-gold fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            className="w-4 h-4 text-primary-gold fill-current"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half)"
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-4 h-4 text-text-secondary fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };

  const avatarUrl = getAvatarUrl();

  return (
    <div
      onClick={onClick}
      className="group relative bg-background-card rounded-2xl p-6 border-2 border-border-gold/30 hover:border-primary-gold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary-gold/20 hover:-translate-y-1"
    >
      {/* Avatar/Image */}
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary-gold/20 group-hover:ring-primary-gold/40 transition-all">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={barber.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-gold/20 to-primary-gold/40 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-gold">
              {getInitials(barber.name)}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold text-text-primary text-center mb-2 group-hover:text-primary-gold transition-colors">
        {barber.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center justify-center gap-2 mb-3">
        {renderStars(barber.rating)}
        <span className="text-sm font-semibold text-primary-gold">
          {barber.rating.toFixed(1)}
        </span>
      </div>

      {/* Specialties */}
      {barber.specialties && barber.specialties.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {barber.specialties.slice(0, 2).map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-primary-gold/10 text-primary-gold rounded-full border border-primary-gold/20"
            >
              {specialty}
            </span>
          ))}
          {barber.specialties.length > 2 && (
            <span className="px-3 py-1 text-xs font-medium text-text-secondary">
              +{barber.specialties.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Social Media Icons */}
      {(barber.instagramUrl || barber.tiktokUrl) && (
        <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-border-gold/20">
          {barber.instagramUrl && (
            <div className="w-6 h-6 text-primary-gold/60 hover:text-primary-gold transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
          )}
          {barber.tiktokUrl && (
            <div className="w-6 h-6 text-primary-gold/60 hover:text-primary-gold transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

