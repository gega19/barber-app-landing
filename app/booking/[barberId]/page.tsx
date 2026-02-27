'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { appApi, TopBarber, Service, PaymentMethod } from '@/lib/api';
import { analytics } from '@/lib/analytics';
import ServiceSelector from '@/components/booking/ServiceSelector';
import AvailabilitySelector from '@/components/booking/AvailabilitySelector';
import GuestForm from '@/components/booking/GuestForm';
import PaymentMethodSelector from '@/components/booking/PaymentMethodSelector';
import { ChevronLeft, ChevronRight, Calendar, User, ShoppingBag, CheckCircle2, CreditCard, Smartphone, Globe } from 'lucide-react';

const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    const barberId = params.barberId as string;

    // State
    const [step, setStep] = useState(0); // 0: Welcome, 1: Service, 2: Availability, 3: Guest Info, 4: Payment, 5: Summary, 6: Success
    const [barber, setBarber] = useState<TopBarber | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);

    // Selection state
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [guestName, setGuestName] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadData();
        analytics.trackPageView(`/booking/${barberId}`);
    }, [barberId]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [barberData, servicesData, paymentsData] = await Promise.all([
                appApi.getBarberById(barberId),
                appApi.getBarberServices(barberId),
                appApi.getPaymentMethods(),
            ]);
            setBarber(barberData);
            setServices(servicesData);
            setPaymentMethods(paymentsData);
        } catch (error) {
            console.error('Error loading booking data:', error);
        } finally {
            setLoading(false);
        }
    };

    const selectedService = useMemo(
        () => services.find(s => s.id === selectedServiceId),
        [services, selectedServiceId]
    );

    const handleNext = (overrideId?: string) => {
        if (step === 1 && !selectedServiceId && !overrideId && services.length > 0) {
            alert('Por favor selecciona un servicio');
            return;
        }
        if (step === 2 && (!selectedDate || !selectedTime)) {
            alert('Por favor selecciona fecha y hora');
            return;
        }
        if (step === 3 && (!guestName || !guestPhone)) {
            alert('Por favor completa tus datos');
            return;
        }
        if (step === 4 && !selectedPaymentMethodId && !overrideId) {
            alert('Por favor selecciona un método de pago');
            return;
        }
        setStep(prev => prev + 1);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const handleOpenInApp = () => {
        const appUrl = `bartop://booking/${barberId}`;
        window.location.href = appUrl;
    };

    const handleConfirm = async () => {
        if (!barber || !selectedDate || !selectedTime || !guestName || !guestPhone || !selectedPaymentMethodId) return;

        try {
            setIsSubmitting(true);

            await appApi.createAppointment({
                barberId: barber.id,
                serviceId: selectedServiceId || undefined,
                date: selectedDate,
                time: selectedTime,
                paymentMethod: selectedPaymentMethodId,
                clientName: guestName,
                clientPhone: guestPhone,
            });

            setStep(6);
            analytics.trackEvent('appointment_created_guest', 'engagement', { barberId: barber.id });
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Hubo un error al agendar tu cita. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-gold" />
            </div>
        );
    }

    if (!barber) {
        return (
            <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-primary-gold mb-4">Barbero no encontrado</h2>
                <Link href="/" className="text-text-secondary hover:text-text-primary underline">
                    Volver al inicio
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background-dark via-background-card to-background-dark text-text-primary pb-24">
            {/* ProgressBar */}
            <div className="fixed top-0 left-0 w-full h-1.5 bg-background-dark/50 backdrop-blur-md z-50">
                <div
                    className="h-full bg-gradient-to-r from-primary-gold to-primary-gold-bright transition-all duration-700 ease-out shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                    style={{ width: `${(step / 6) * 100}%` }}
                />
            </div>

            <div className="container mx-auto px-4 pt-12 pb-24 max-w-2xl">
                {/* Header Profile - Hidden on Welcome Step */}
                {step > 0 && step < 6 && (
                    <div className="flex items-center gap-4 mb-8 bg-background-card/30 p-4 rounded-2xl border border-border-gold/20 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary-gold">
                            <Image
                                src={barber.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(barber.name)}&background=C9A961&color=0F0F0F`}
                                alt={barber.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-text-primary">{barber.name}</h1>
                            <p className="text-sm text-text-secondary">{barber.specialties?.join(', ') || 'Barbero Profesional'}</p>
                        </div>
                    </div>
                )}

                {/* Steps Container */}
                <div className="bg-background-card/40 backdrop-blur-xl border border-border-gold/30 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl min-h-[450px] transition-all duration-500 hover:border-border-gold/50">

                    {step === 0 && (
                        <div className="text-center py-4">
                            <h2 className="text-[1.1rem] font-black text-text-secondary uppercase tracking-[0.3em] mb-8 px-4">
                                Estás agendando con
                            </h2>

                            <div className="flex flex-col items-center mb-12">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary-gold shadow-[0_0_40px_rgba(212,175,55,0.25)] mb-6 ring-8 ring-primary-gold/5">
                                    <Image
                                        src={barber.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(barber.name)}&background=C9A961&color=0F0F0F`}
                                        alt={barber.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight mb-2">
                                    {barber.name}
                                </h1>
                                <p className="text-primary-gold font-bold tracking-widest uppercase text-xs">
                                    {barber.specialties?.join(' • ') || 'Barbero Profesional'}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    {isMobileDevice() && (
                                        <button
                                            onClick={handleOpenInApp}
                                            className="relative group w-full py-6 bg-gradient-to-br from-primary-gold-bright via-primary-gold to-primary-gold-muted text-text-dark font-black rounded-[1.5rem] shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_60px_rgba(212,175,55,0.45)] transition-all duration-500 text-xl overflow-hidden active:scale-95 flex items-center justify-center gap-3"
                                        >
                                            <Smartphone className="w-6 h-6" />
                                            <span className="relative z-10">Abrir en la App</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite] skew-x-[-20deg]" />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => setStep(1)}
                                        className={`relative group w-full py-5 ${isMobileDevice() ? 'bg-background-dark/50 border border-primary-gold/30 text-text-primary' : 'bg-gradient-to-br from-primary-gold-bright via-primary-gold to-primary-gold-muted text-text-dark'} font-black rounded-[1.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 text-lg overflow-hidden active:scale-95 flex items-center justify-center gap-3`}
                                    >
                                        {!isMobileDevice() ? <Smartphone className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                                        <span className="relative z-10">{isMobileDevice() ? 'Continuar en la Web' : 'Continuar como invitado'}</span>
                                        {!isMobileDevice() && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite] skew-x-[-20deg]" />}
                                    </button>
                                </div>

                                <div className="p-8 bg-primary-gold/5 rounded-[2.5rem] border border-primary-gold/20 flex flex-col items-center gap-6 mt-12">
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <h3 className="font-black text-xl text-text-primary tracking-tight">¿Prefieres usar nuestra App?</h3>
                                        <p className="text-sm text-text-secondary leading-relaxed max-w-[320px]">
                                            Disfruta de una experiencia completa, gestiona tus citas y acumula puntos.
                                        </p>
                                    </div>

                                    <Link
                                        href="https://play.google.com/store/apps/details?id=com.bartop.app&hl=es_VE"
                                        target="_blank"
                                        className="w-full py-5 bg-background-dark border-2 border-border-gold rounded-2xl flex items-center justify-center gap-5 hover:border-primary-gold hover:bg-background-dark/80 transition-all group shadow-2xl"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-9 h-9 fill-primary-gold group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,16.14C20.44,17.12 20.44,18.87 18.66,19.86L6.15,22.74L15.15,13.45L16.81,15.12M15.15,10.55L6.15,1.26L18.66,4.14C20.44,5.13 20.44,6.88 18.66,7.86L16.81,8.88L15.15,10.55M14.41,12L22,12C22.58,12 23.06,12.48 23.06,13.06C23.06,13.63 22.58,14.11 22,14.11L14.41,14.11V12Z" />
                                        </svg>
                                        <div className="text-left leading-none">
                                            <p className="text-[12px] uppercase font-black tracking-[0.25rem] text-text-secondary/60 mb-1.5">Consíguelo en</p>
                                            <p className="text-2xl font-black text-text-primary">Google Play</p>
                                        </div>
                                    </Link>

                                    <div className="flex flex-wrap justify-center gap-6 text-[10px] items-center text-text-secondary/50 font-black uppercase tracking-[0.2em]">
                                        <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary-gold" /> Recordatorios</span>
                                        <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary-gold" /> Puntos Bartop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <ServiceSelector
                            services={services}
                            selectedServiceId={selectedServiceId}
                            onServiceSelect={(id) => {
                                setSelectedServiceId(id);
                                handleNext(id);
                            }}
                        />
                    )}

                    {step === 2 && (
                        <AvailabilitySelector
                            barberId={barberId}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            onDateChange={setSelectedDate}
                            onTimeSelect={setSelectedTime}
                        />
                    )}

                    {step === 3 && (
                        <GuestForm
                            name={guestName}
                            phone={guestPhone}
                            onNameChange={setGuestName}
                            onPhoneChange={setGuestPhone}
                        />
                    )}

                    {step === 4 && (
                        <PaymentMethodSelector
                            paymentMethods={paymentMethods}
                            selectedMethodId={selectedPaymentMethodId}
                            onMethodSelect={(id) => {
                                setSelectedPaymentMethodId(id);
                                handleNext(id);
                            }}
                        />
                    )}

                    {step === 5 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-primary-gold mb-4">Resumen de tu cita</h3>
                            <div className="space-y-5 bg-background-dark/40 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-border-gold/10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary-gold/10 rounded-xl">
                                        <ShoppingBag className="text-primary-gold w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">Servicio</p>
                                        <p className="font-bold text-lg">{selectedService?.name || 'Servicio General'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary-gold/10 rounded-xl">
                                        <Calendar className="text-primary-gold w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">Fecha y Hora</p>
                                        <p className="font-bold text-lg">{selectedDate} a las {selectedTime}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary-gold/10 rounded-xl">
                                        <User className="text-primary-gold w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">Tu Información</p>
                                        <p className="font-bold text-lg">{guestName} ({guestPhone})</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary-gold/10 rounded-xl">
                                        <CreditCard className="text-primary-gold w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">Método de Pago</p>
                                        <p className="font-bold text-lg">
                                            {paymentMethods.find(p => p.id === selectedPaymentMethodId)?.name || 'Por definir'}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-border-gold/10 pt-6 mt-4 flex justify-between items-center">
                                    <span className="text-text-secondary font-bold uppercase tracking-[0.2em] text-xs">TOTAL A PAGAR</span>
                                    <span className="text-3xl font-black text-primary-gold shadow-primary-gold/20 drop-shadow-lg">${selectedService?.price || 0}</span>
                                </div>
                            </div>
                            <div className="p-4 bg-primary-gold/5 rounded-2xl border border-primary-gold/10 text-center">
                                <p className="text-xs text-text-secondary italic">
                                    Nota: El pago se realiza directamente en el local el día de tu cita.
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="text-center py-12">
                            <div className="flex justify-center mb-8">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary-gold/20 blur-3xl rounded-full" />
                                    <CheckCircle2 className="relative w-24 h-24 text-primary-gold animate-[bounce_2s_infinite]" />
                                </div>
                            </div>
                            <h2 className="text-4xl font-black text-text-primary mb-4 tracking-tight">¡Cita Agendada!</h2>
                            <p className="text-text-secondary mb-10 text-lg max-w-md mx-auto leading-relaxed">
                                Tu reserva con <span className="text-primary-gold font-bold">{barber.name}</span> está lista para el <span className="font-bold text-text-primary">{selectedDate}</span> a las <span className="font-bold text-text-primary">{selectedTime}</span>.
                            </p>
                            <Link
                                href="/"
                                className="relative group inline-block py-5 px-12 bg-gradient-to-br from-primary-gold-bright via-primary-gold to-primary-gold-muted text-text-dark font-black rounded-[1.25rem] shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.4)] transition-all duration-500 hover:-translate-y-1 active:scale-95 text-xl overflow-hidden"
                            >
                                <span className="relative z-10">Volver al inicio</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite] skew-x-[-20deg]" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                {step > 0 && step < 6 && (
                    <div className="flex justify-between mt-10 px-2">
                        <button
                            onClick={handleBack}
                            className="px-8 py-4 bg-background-card/50 backdrop-blur-md text-text-secondary rounded-2xl border border-border-gold/20 hover:text-text-primary hover:border-border-gold/50 transition-all flex items-center gap-3 font-bold group"
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Atrás
                        </button>
                        {step < 5 ? (
                            <button
                                onClick={() => handleNext()}
                                className="relative group px-12 py-5 bg-gradient-to-br from-primary-gold-bright via-primary-gold to-primary-gold-muted text-text-dark font-black rounded-[1.25rem] shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.35)] transition-all duration-500 flex items-center gap-3 hover:-translate-y-1 active:scale-95 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Siguiente <ChevronRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite] skew-x-[-20deg]" />
                            </button>
                        ) : (
                            <button
                                onClick={handleConfirm}
                                disabled={isSubmitting}
                                className="relative group px-12 py-5 bg-gradient-to-br from-primary-gold-bright via-primary-gold to-primary-gold-muted text-text-dark font-black rounded-[1.25rem] shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.35)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 hover:-translate-y-1 active:scale-95 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-text-dark" />
                                            Agendando...
                                        </>
                                    ) : (
                                        <>
                                            Confirmar Cita <CheckCircle2 size={22} />
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite] skew-x-[-20deg]" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
