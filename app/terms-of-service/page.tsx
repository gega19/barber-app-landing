'use client';

import { useState, useEffect } from 'react';
import { appApi } from '@/lib/api';

interface LegalDocument {
  id: string;
  type: string;
  title: string;
  content: string;
  version: number;
  updatedAt: string;
}

export default function TermsOfServicePage() {
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDocument();
  }, []);

  const loadDocument = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await appApi.get('/legal/terms');
      setDocument(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar el documento');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto mb-4"></div>
          <p className="text-text-secondary">Cargando términos de servicio...</p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-error mb-4">{error || 'Documento no encontrado'}</p>
          <a href="/" className="text-primary-gold hover:text-primary-gold-dark">
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-background-card rounded-xl border-2 border-border-gold p-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">{document.title}</h1>
          <p className="text-text-secondary text-sm mb-8">
            Última actualización: {new Date(document.updatedAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          
          <div 
            className="prose prose-invert max-w-none text-text-primary"
            dangerouslySetInnerHTML={{ __html: document.content }}
            style={{
              color: '#E8E8E8',
            }}
          />
        </div>
      </div>
    </div>
  );
}

