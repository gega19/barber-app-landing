'use client';

import React, { useState, useEffect } from 'react';
import { appApi } from '@/lib/api';
import { Calendar } from 'lucide-react';

interface AvailabilitySelectorProps {
    barberId: string;
    selectedDate: string;
    selectedTime: string | null;
    onDateChange: (date: string) => void;
    onTimeSelect: (time: string) => void;
}

export default function AvailabilitySelector({
    barberId,
    selectedDate,
    selectedTime,
    onDateChange,
    onTimeSelect,
}: AvailabilitySelectorProps) {
    const [slots, setSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedDate) {
            loadSlots();
        }
    }, [selectedDate, barberId]);

    const loadSlots = async () => {
        try {
            setLoading(true);
            const availableSlots = await appApi.getAvailableSlots(barberId, selectedDate);
            setSlots(availableSlots);
        } catch (error) {
            console.error('Error loading slots:', error);
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-2xl font-black text-primary-gold tracking-tight">¿Cuándo quieres ir?</h3>
                <div className="relative group">
                    <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(e) => onDateChange(e.target.value)}
                        className="w-full p-6 bg-background-dark/30 text-text-primary border-2 border-border-gold/20 rounded-[1.8rem] focus:outline-none focus:border-primary-gold/50 transition-all duration-500 appearance-none cursor-pointer hover:bg-background-dark/40"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary-gold/50 group-focus-within:text-primary-gold transition-colors">
                        <Calendar size={22} />
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-black text-text-secondary uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2 px-2">
                    <span className="w-2 h-2 bg-primary-gold rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                    Horas disponibles
                </h4>
                {loading ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-14 bg-background-dark/40 border border-border-gold/10 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : slots.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {slots.map((slot) => (
                            <button
                                key={slot}
                                onClick={() => onTimeSelect(slot)}
                                className={`py-4 rounded-2xl font-black transition-all duration-500 transform active:scale-90 ${selectedTime === slot
                                    ? 'bg-gradient-to-br from-primary-gold-bright via-primary-gold to-primary-gold-muted text-text-dark shadow-[0_8px_25px_rgba(212,175,55,0.35)] scale-[1.05] z-10'
                                    : 'bg-background-dark/30 text-text-secondary border border-border-gold/10 hover:border-primary-gold/40 hover:text-text-primary hover:bg-background-dark/50'
                                    }`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-background-dark/20 rounded-2xl border border-dashed border-border-gold/20">
                        <p className="text-text-secondary italic text-sm">
                            No hay turnos disponibles para este día
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
