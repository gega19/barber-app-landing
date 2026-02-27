'use client';

import React from 'react';
import { User, Phone } from 'lucide-react';

interface GuestFormProps {
    name: string;
    phone: string;
    onNameChange: (name: string) => void;
    onPhoneChange: (phone: string) => void;
}

export default function GuestForm({
    name,
    phone,
    onNameChange,
    onPhoneChange,
}: GuestFormProps) {
    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <h3 className="text-2xl font-black text-primary-gold tracking-tight">Tus datos de contacto</h3>
                <p className="text-text-secondary leading-relaxed">
                    Necesitamos tu nombre y número de teléfono para confirmar tu reserva y enviarte los detalles.
                </p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-black text-text-secondary/60 uppercase tracking-[0.2em] ml-1">
                        Nombre completo
                    </label>
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-gold/50 group-focus-within:text-primary-gold transition-colors">
                            <User size={20} />
                        </div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            placeholder="Ej. Juan Pérez"
                            className="w-full pl-14 pr-5 py-5 bg-background-dark/30 text-text-primary border-2 border-border-gold/20 rounded-2xl focus:outline-none focus:border-primary-gold/50 transition-all duration-300 hover:bg-background-dark/50"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-text-secondary/60 uppercase tracking-[0.2em] ml-1">
                        Número de teléfono
                    </label>
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-gold/50 group-focus-within:text-primary-gold transition-colors">
                            <Phone size={20} />
                        </div>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => onPhoneChange(e.target.value)}
                            placeholder="Ej. +58 412 1234567"
                            className="w-full pl-14 pr-5 py-5 bg-background-dark/30 text-text-primary border-2 border-border-gold/20 rounded-2xl focus:outline-none focus:border-primary-gold/50 transition-all duration-300 hover:bg-background-dark/50"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 bg-primary-gold/5 rounded-2xl border border-primary-gold/10">
                <p className="text-[10px] text-text-secondary text-center leading-relaxed italic">
                    Tus datos están seguros y solo se usarán para la gestión de esta cita específica.
                </p>
            </div>
        </div>
    );
}
