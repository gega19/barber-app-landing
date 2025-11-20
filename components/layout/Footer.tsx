import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-card-dark border-t-2 border-border-gold">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-gold ring-offset-2 ring-offset-background-card-dark">
                <Image
                  src="/images/logo.png"
                  alt="bartop logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold text-primary-gold tracking-wide">bartop</span>
            </Link>
            <p className="text-text-secondary max-w-md">
              Encuentra a tu barbero ideal. La mejor forma de reservar tu cita con los barberos más talentosos. 
              Descubre barberías cerca de ti y disfruta de un servicio de calidad.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/download" className="text-text-secondary hover:text-primary-gold transition-colors">
                  Descargar
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-text-secondary hover:text-primary-gold transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-text-secondary hover:text-primary-gold transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="/delete-account" className="text-text-secondary hover:text-primary-gold transition-colors">
                  Eliminar Cuenta
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t-2 border-border-gold">
          <p className="text-text-secondary text-center text-sm">
            © {currentYear} bartop. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

