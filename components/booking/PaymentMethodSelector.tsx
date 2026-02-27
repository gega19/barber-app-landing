'use client';

import React from 'react';
import { PaymentMethod } from '@/lib/api';
import { Banknote, CreditCard, Landmark, Smartphone } from 'lucide-react';

interface PaymentMethodSelectorProps {
    paymentMethods: PaymentMethod[];
    selectedMethodId: string | null;
    onMethodSelect: (id: string) => void;
}

const getPaymentIcon = (type: string | null | undefined) => {
    switch (type?.toLowerCase()) {
        case 'cash':
            return <Banknote className="w-6 h-6" />;
        case 'card':
            return <CreditCard className="w-6 h-6" />;
        case 'transfer':
            return <Landmark className="w-6 h-6" />;
        case 'mobile_payment':
            return <Smartphone className="w-6 h-6" />;
        default:
            return <Banknote className="w-6 h-6" />;
    }
};

const getPaymentLabel = (type: string | null | undefined, name: string) => {
    if (name) return name;
    switch (type?.toLowerCase()) {
        case 'cash':
            return 'Efectivo';
        case 'card':
            return 'Tarjeta';
        case 'transfer':
            return 'Transferencia';
        case 'mobile_payment':
            return 'Pago Móvil';
        default:
            return 'Otro';
    }
};

export default function PaymentMethodSelector({
    paymentMethods,
    selectedMethodId,
    onMethodSelect,
}: PaymentMethodSelectorProps) {
    if (paymentMethods.length === 0) {
        return (
            <div className="text-center py-8 text-text-secondary italic">
                No hay métodos de pago disponibles establecidos por el barbero.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-primary-gold mb-2">¿Cómo deseas pagar?</h3>
                <p className="text-sm text-text-secondary mb-6">
                    El pago se realizará directamente en el establecimiento.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => onMethodSelect(method.id)}
                        className={`flex items-center gap-4 p-6 rounded-[2rem] border-2 transition-all duration-500 group relative overflow-hidden ${selectedMethodId === method.id
                            ? 'border-primary-gold-dark bg-gradient-to-br from-primary-gold-bright/20 via-primary-gold/10 to-primary-gold-muted/20 shadow-[0_15px_40px_rgba(212,175,55,0.15)] scale-[1.02]'
                            : 'border-border-gold/10 bg-background-dark/30 hover:border-border-gold/30 hover:bg-background-dark/40'
                            }`}
                    >
                        {selectedMethodId === method.id && (
                            <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-primary-gold/10 rounded-full blur-2xl animate-pulse" />
                        )}
                        <div className={`p-4 rounded-[1.2rem] transition-all duration-500 relative z-10 ${selectedMethodId === method.id
                            ? 'bg-gradient-to-br from-primary-gold-bright to-primary-gold text-text-dark shadow-lg'
                            : 'bg-background-card text-primary-gold group-hover:text-primary-gold-bright'
                            }`}>
                            {getPaymentIcon(method.type)}
                        </div>
                        <div className="text-left relative z-10">
                            <h4 className={`font-black text-lg transition-colors ${selectedMethodId === method.id ? 'text-primary-gold-bright' : 'text-text-secondary group-hover:text-text-primary'
                                }`}>
                                {getPaymentLabel(method.type, method.name)}
                            </h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/40 mt-1">
                                Pago en local
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
