import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const baseStyles = 'bg-background-card rounded-xl border-2 border-border-gold p-6';
  const hoverStyles = hover ? 'transition-all duration-300 hover:border-primary-gold hover:shadow-lg hover:shadow-primary-gold/20' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}

