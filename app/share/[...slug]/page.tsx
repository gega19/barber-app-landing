'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Download, ExternalLink } from 'lucide-react';

export default function ShareRedirectPage() {
    const params = useParams();
    const [isRedirecting, setIsRedirecting] = useState(true);

    // Reconstruct the path from the slug array
    // Example: slug=['barber', '123'] -> path='barber/123'
    const slugArray = params.slug as string[];
    const deepLinkPath = slugArray ? slugArray.join('/') : '';

    // The custom scheme URL
    // We add 'app' as the host so that 'barber/123' becomes the path (/barber/123)
    // Otherwise, 'barber' is interpreted as the host and the path becomes just '/123'
    const appSchemeUrl = `bartop://app/${deepLinkPath}`;

    // Store URLs (Replace with your actual store IDs)
    const androidStoreUrl = 'https://play.google.com/store/apps/details?id=com.corporacionceg.barberapp'; // Update with real ID
    const iosStoreUrl = 'https://apps.apple.com/app/idYOUR_APP_ID'; // Update with real ID

    useEffect(() => {
        if (!deepLinkPath) return;

        // Attempt verification/redirection logic
        const tryOpenApp = () => {
            // Create a hidden iframe to attempt opening the custom scheme
            // distinct from window.location.href to avoid some browser warnings 
            // or "Page not found" logic if checking response.

            // Simplest modern approach:
            window.location.href = appSchemeUrl;

            // Fallback logic: If the user is still here after X time, 
            // it likely failed (app not installed).
            setTimeout(() => {
                setIsRedirecting(false);
            }, 2500);
        };

        tryOpenApp();
    }, [appSchemeUrl, deepLinkPath]);

    if (!deepLinkPath) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
                Enlace inválido
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center font-sans">
            <div className="max-w-md w-full space-y-8">
                {/* App Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center shadow-xl">
                        <span className="text-white font-bold text-3xl">B</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Abrir en Bartop
                    </h1>
                    <p className="text-gray-600">
                        {isRedirecting
                            ? 'Intentando abrir la aplicación...'
                            : 'Parece que no tienes la app instalada o no se abrió automáticamente.'}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                    <a
                        href={appSchemeUrl}
                        className="block w-full py-4 bg-black text-white rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                    >
                        <ExternalLink size={20} />
                        Abrir App
                    </a>

                    {!isRedirecting && (
                        <div className="pt-8 border-t border-gray-100 mt-8">
                            <p className="text-sm text-gray-400 mb-4">Descárgala gratis</p>
                            <div className="flex flex-col gap-3">
                                <a
                                    href={androidStoreUrl}
                                    className="block w-full py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Download size={20} />
                                    Google Play
                                </a>
                                <a
                                    href={iosStoreUrl}
                                    className="block w-full py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Download size={20} />
                                    App Store
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
