'use client';

import React, { useEffect, useState, useRef } from 'react';
import { appApi, TopBarber, TopWorkplace } from '@/lib/api';
import { analytics } from '@/lib/analytics';
import BarberCard from '../cards/BarberCard';
import WorkplaceCard from '../cards/WorkplaceCard';
import Carousel from '../ui/Carousel';

type TabType = 'barbers' | 'workplaces';

export default function TopBarbersAndWorkplaces() {
  const [activeTab, setActiveTab] = useState<TabType>('barbers');
  const [barbers, setBarbers] = useState<TopBarber[]>([]);
  const [workplaces, setWorkplaces] = useState<TopWorkplace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);

  useEffect(() => {
    loadData();

    // Track section view
    if (!sectionRef.current || viewedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !viewedRef.current) {
            viewedRef.current = true;
            analytics.trackEvent('section_viewed', 'engagement', {
              section: 'top_barbers_workplaces',
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [barbersData, workplacesData] = await Promise.all([
        appApi.getTopBarbers(5),
        appApi.getTopWorkplaces(5),
      ]);

      setBarbers(barbersData);
      setWorkplaces(workplacesData);
    } catch (err: any) {
      console.error('Error loading top barbers and workplaces:', err);
      setError('No se pudieron cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    analytics.trackClick(`top_${tab}_tab`, { section: 'top_barbers_workplaces' });
  };

  const handleCardClick = (type: 'barber' | 'workplace', id: string) => {
    analytics.trackClick(`top_${type}_card`, {
      id,
      section: 'top_barbers_workplaces',
    });
    // Aquí podrías redirigir a la app o mostrar más detalles
  };

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-[280px] sm:w-80 bg-background-card rounded-2xl p-6 border-2 border-border-gold/30 animate-pulse">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-text-secondary/20" />
      <div className="h-6 w-3/4 mx-auto mb-3 bg-text-secondary/20 rounded" />
      <div className="h-4 w-1/2 mx-auto bg-text-secondary/20 rounded" />
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className="py-12 relative w-full"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-gold/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Section Header - Removed, will be integrated in Hero */}

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-background-card/50 backdrop-blur-sm rounded-xl p-1 border border-border-gold/30">
            <button
              onClick={() => handleTabChange('barbers')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'barbers'
                ? 'bg-primary-gold text-text-dark shadow-lg'
                : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              Barberos
            </button>
            <button
              onClick={() => handleTabChange('workplaces')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'workplaces'
                ? 'bg-primary-gold text-text-dark shadow-lg'
                : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              Barberías
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Carousel className="min-h-[400px]">
            {[...Array(5)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </Carousel>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">{error}</p>
            <button
              onClick={loadData}
              className="px-6 py-3 bg-primary-gold text-text-dark rounded-lg font-semibold hover:bg-primary-gold-dark transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="w-full">
            {activeTab === 'barbers' ? (
              barbers.length > 0 ? (
                <Carousel>
                  {barbers.map((barber) => (
                    <div
                      key={barber.id}
                      className="flex-shrink-0 w-[260px] sm:w-80 snap-center"
                    >
                      <BarberCard
                        barber={barber}
                        onClick={() => handleCardClick('barber', barber.id)}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div className="text-center py-12 text-text-secondary">
                  No hay barberos disponibles
                </div>
              )
            ) : (
              workplaces.length > 0 ? (
                <Carousel>
                  {workplaces.map((workplace) => (
                    <div
                      key={workplace.id}
                      className="flex-shrink-0 w-[260px] sm:w-80 snap-center"
                    >
                      <WorkplaceCard
                        workplace={workplace}
                        onClick={() =>
                          handleCardClick('workplace', workplace.id)
                        }
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div className="text-center py-12 text-text-secondary">
                  No hay barberías disponibles
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

