'use client';

import React from 'react';
import { Service } from '@/lib/api';

interface ServiceSelectorProps {
    services: Service[];
    selectedServiceId: string | null;
    onServiceSelect: (id: string) => void;
}

export default function ServiceSelector({
    services,
    selectedServiceId,
    onServiceSelect,
}: ServiceSelectorProps) {
    if (services.length === 0) {
        return (
            <div className="text-center py-12 px-6 bg-background-dark/20 rounded-2xl border border-dashed border-border-gold/30">
                <p className="text-text-secondary italic">
                    No hay servicios específicos disponibles, se aplicará el precio base.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-black text-primary-gold mb-4 tracking-tight">Selecciona un servicio</h3>
            <div className="grid gap-4">
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => onServiceSelect(service.id)}
                        className={`text-left p-6 rounded-[2rem] border-2 transition-all duration-500 group relative overflow-hidden ${selectedServiceId === service.id
                            ? 'border-primary-gold-dark bg-gradient-to-br from-primary-gold-bright/20 via-primary-gold/10 to-primary-gold-muted/20 shadow-[0_15px_40px_rgba(212,175,55,0.15)] scale-[1.02]'
                            : 'border-border-gold/10 bg-background-dark/30 hover:border-border-gold/30 hover:bg-background-dark/40'
                            }`}
                    >
                        {selectedServiceId === service.id && (
                            <div className="absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 bg-primary-gold/10 rounded-full blur-3xl animate-pulse" />
                        )}
                        <div className="flex justify-between items-center gap-4 relative z-10">
                            <div className="flex-1">
                                <h4 className={`font-black text-xl transition-colors ${selectedServiceId === service.id ? 'text-primary-gold-bright' : 'text-text-secondary group-hover:text-text-primary'
                                    }`}>
                                    {service.name}
                                </h4>
                                {service.description && (
                                    <p className="text-sm text-text-secondary/60 mt-1.5 line-clamp-2 leading-relaxed">
                                        {service.description}
                                    </p>
                                )}
                            </div>
                            <div className={`text-2xl font-black px-5 py-2.5 rounded-[1.25rem] transition-all duration-500 ${selectedServiceId === service.id
                                ? 'text-text-dark bg-gradient-to-r from-primary-gold-bright to-primary-gold shadow-[0_5px_15px_rgba(212,175,55,0.3)]'
                                : 'text-primary-gold bg-background-card border border-border-gold/20'
                                }`}>
                                ${service.price}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
