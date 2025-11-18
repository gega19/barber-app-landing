'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { appApi, AppVersion } from '@/lib/api';

export default function DownloadPage() {
  const [version, setVersion] = useState<AppVersion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadActiveVersion();
  }, []);

  const loadActiveVersion = async () => {
    try {
      setLoading(true);
      setError(null);
      const activeVersion = await appApi.getActiveVersion();
      setVersion(activeVersion);
    } catch (err: any) {
      console.error('Error loading version:', err);
      setError(err.response?.data?.message || 'Error al cargar la información de la versión');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!version) return;

    try {
      setDownloading(true);
      setError(null);

      // Obtener el APK como blob
      const blob = await appApi.downloadApk(version.id);

      // Crear un enlace temporal para descargar
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bartop-${version.version}.apk`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Registrar la descarga en el backend (opcional, pero el backend ya lo hace automáticamente)
    } catch (err: any) {
      console.error('Error downloading APK:', err);
      setError(err.response?.data?.message || 'Error al descargar el APK');
    } finally {
      setDownloading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-background-card to-background-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-primary-gold ring-offset-4 ring-offset-background-dark shadow-2xl shadow-primary-gold/30">
                <Image
                  src="/images/logo.png"
                  alt="bartop logo"
                  width={128}
                  height={128}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-gold mb-4 tracking-wide">
              bartop
            </h1>
            <p className="text-xl text-text-secondary">
              Descarga la aplicación para Android
            </p>
          </div>

          {/* Download Card */}
          <div className="bg-background-card border-2 border-border-gold rounded-2xl p-8 md:p-12 shadow-2xl">
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-gold"></div>
                <p className="mt-4 text-text-secondary">Cargando información...</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border-2 border-red-500 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {version && !loading && (
              <>
                {/* Version Info */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary mb-2">
                        Versión {version.version}
                      </h2>
                      <p className="text-text-secondary">
                        Publicado el {formatDate(version.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-text-secondary mb-1">Tamaño</div>
                      <div className="text-lg font-semibold text-primary-gold">
                        {formatFileSize(version.apkSize)}
                      </div>
                    </div>
                  </div>

                  {version.releaseNotes && (
                    <div className="mt-6 p-4 bg-background-card-dark rounded-lg border border-border-gold">
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        Notas de la versión
                      </h3>
                      <div className="text-text-secondary whitespace-pre-wrap">
                        {version.releaseNotes}
                      </div>
                    </div>
                  )}
                </div>

                {/* Download Button */}
                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={handleDownload}
                    variant="primary"
                    size="lg"
                    disabled={downloading}
                    className="w-full sm:w-auto min-w-[250px] text-lg"
                  >
                    {downloading ? (
                      <>
                        <span className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-text-dark mr-2"></span>
                        Descargando...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6 mr-2 inline-block"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Descargar APK
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-text-secondary text-center max-w-md">
                    Al descargar, aceptas nuestros{' '}
                    <a href="/terms-of-service" className="text-primary-gold hover:underline">
                      Términos de Servicio
                    </a>{' '}
                    y{' '}
                    <a href="/privacy-policy" className="text-primary-gold hover:underline">
                      Política de Privacidad
                    </a>
                  </p>
                </div>
              </>
            )}

            {!version && !loading && !error && (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">
                  No hay versiones disponibles en este momento.
                </p>
              </div>
            )}
          </div>

          {/* Installation Instructions */}
          <div className="mt-12 bg-background-card-dark border-2 border-border-gold rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Instrucciones de instalación
            </h2>
            <ol className="space-y-4 text-text-secondary">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-gold text-text-dark rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </span>
                <div>
                  <strong className="text-text-primary">Habilita la instalación desde fuentes desconocidas:</strong>
                  <p className="mt-1">
                    Ve a Configuración → Seguridad → Activa "Fuentes desconocidas" o "Instalar aplicaciones desconocidas"
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-gold text-text-dark rounded-full flex items-center justify-center font-bold mr-4">
                  2
                </span>
                <div>
                  <strong className="text-text-primary">Descarga el APK:</strong>
                  <p className="mt-1">
                    Haz clic en el botón de descarga arriba para obtener el archivo APK
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-gold text-text-dark rounded-full flex items-center justify-center font-bold mr-4">
                  3
                </span>
                <div>
                  <strong className="text-text-primary">Instala la aplicación:</strong>
                  <p className="mt-1">
                    Abre el archivo descargado desde tu gestor de archivos y sigue las instrucciones de instalación
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-gold text-text-dark rounded-full flex items-center justify-center font-bold mr-4">
                  4
                </span>
                <div>
                  <strong className="text-text-primary">¡Disfruta de bartop!</strong>
                  <p className="mt-1">
                    Abre la aplicación y comienza a reservar tus citas con los mejores barberos
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-primary-gold hover:text-primary-gold-dark transition-colors inline-flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

