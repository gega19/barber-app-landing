'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { appApi, AppVersion } from '@/lib/api';
import { analytics } from '@/lib/analytics';

export default function DownloadPage() {
  const [version, setVersion] = useState<AppVersion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadActiveVersion();
    // Track page view
    analytics.trackPageView('/download');
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

      // Track download started
      await analytics.trackDownload(version.id, {
        version: version.version,
        versionCode: version.versionCode,
        apkSize: version.apkSize,
      });

      console.log(`📥 Attempting to download APK for version: ${version.id} (${version.version})`);

      // Si la URL es externa (Cloudinary), redirigir directamente
      if (version.apkUrl && !version.apkUrl.startsWith('/uploads/')) {
        console.log(`🔗 Redirecting to external URL: ${version.apkUrl}`);
        window.location.href = version.apkUrl;
        setDownloading(false);
        return;
      }

      // Obtener el APK como blob
      const blob = await appApi.downloadApk(version.id);

      // Crear un enlace temporal para descargar
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `barber-app-v${version.version}.apk`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`✅ APK downloaded successfully`);

      // Track download completed
      await analytics.trackEvent('download_completed', 'conversion', {
        versionId: version.id,
        version: version.version,
      });
    } catch (err: any) {
      console.error('Error downloading APK:', err);
      let errorMessage = err.response?.data?.message || err.message || 'Error al descargar el APK';

      // Si el error indica que se requiere re-subir el APK
      if (err.response?.data?.requiresReupload) {
        errorMessage = 'El archivo APK no está disponible. Por favor, contacta al administrador para que vuelva a subir el APK.';
      }

      console.error('Error details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: errorMessage,
      });
      setError(errorMessage);
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
              Descarga la aplicación oficial
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

                {/* Google Play & iOS Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.bartop.app&hl=es_VE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-105 transition-transform duration-200"
                    onClick={() => analytics.trackClick('playstore_button_download_page', { location: 'download_page' })}
                  >
                    <div className="bg-background-dark border border-border-gold rounded-xl px-6 py-3 flex items-center gap-4 w-[240px] shadow-lg">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-primary-gold" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,16.14C20.44,17.12 20.44,18.87 18.66,19.86L6.15,22.74L15.15,13.45L16.81,15.12M15.15,10.55L6.15,1.26L18.66,4.14C20.44,5.13 20.44,6.88 18.66,7.86L16.81,8.88L15.15,10.55M14.41,12L22,12C22.58,12 23.06,12.48 23.06,13.06C23.06,13.63 22.58,14.11 22,14.11L14.41,14.11V12Z" />
                      </svg>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[10px] uppercase text-text-secondary">Disponible en</span>
                        <span className="text-xl font-bold text-text-primary">Google Play</span>
                      </div>
                    </div>
                  </a>

                  <div className="opacity-50 grayscale flex items-center justify-center">
                    <div className="bg-background-dark/50 border border-border-gold/30 rounded-xl px-6 py-3 flex items-center gap-4 w-[240px] relative overflow-hidden">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-primary-gold" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,21.97C7.81,22 6.85,20.65 6,19.45C4.35,17 3.09,12.4 4.84,9.39C5.71,7.9 7.23,6.95 8.9,6.93C10.17,6.9 11.36,7.79 12.15,7.79C12.93,7.79 14.38,6.73 15.92,6.89C16.56,6.92 18.36,7.15 19.5,8.82C19.42,8.87 17.31,10.1 17.35,12.6C17.39,15.54 19.86,16.5 19.9,16.5C19.88,16.56 19.5,17.9 18.71,19.5M15.8,3.56C16.47,2.75 16.93,1.6 16.8,0.45C15.82,0.49 14.63,1.1 13.93,1.91C13.31,2.63 12.77,3.8 12.92,5.01C14,5.09 15.13,4.4 15.8,3.56Z" />
                      </svg>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[10px] uppercase text-text-secondary">App Store</span>
                        <span className="text-xl font-bold text-text-primary">Próximamente</span>
                      </div>
                      <div className="absolute top-1 right-2 rotate-12">
                        <span className="text-[8px] bg-primary-gold text-text-dark px-1 font-black rounded uppercase">iOS</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border-gold/20 pt-8 mt-4">
                  <h3 className="text-center text-text-secondary text-sm mb-6 uppercase tracking-[0.2em] font-medium">¿Prefieres el APK directo?</h3>

                  {/* Download Button APK */}
                  <div className="flex flex-col items-center gap-4">
                    <Button
                      onClick={handleDownload}
                      variant="secondary"
                      size="md"
                      disabled={downloading}
                      className="w-full sm:w-auto min-w-[200px]"
                    >
                      {downloading ? (
                        <>
                          <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary-gold mr-2"></span>
                          Descargando...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 mr-2 inline-block"
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
                          Descargar APK (v{version.version})
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-text-secondary text-center max-w-md italic">
                      Útil si no tienes acceso a Google Play en este momento.
                    </p>
                  </div>
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

