'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen py-12 bg-background-dark">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-background-card rounded-xl border-2 border-border-gold p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary-gold ring-offset-2 ring-offset-background-card">
              <Image
                src="/images/logo.png"
                alt="bartop logo"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-gold mb-2">
                Eliminación de Cuenta
              </h1>
              <p className="text-text-secondary">
                bartop - Encuentra a tu barbero ideal
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-text-primary space-y-6">
            {/* Introducción */}
            <section>
              <h2 className="text-2xl font-bold text-primary-gold mb-4">
                Solicitar Eliminación de Cuenta
              </h2>
              <p className="text-text-primary leading-relaxed">
                En <strong className="text-primary-gold">bartop</strong>, respetamos tu privacidad y te ofrecemos la opción de eliminar tu cuenta y todos los datos asociados en cualquier momento. Esta página explica cómo solicitar la eliminación de tu cuenta.
              </p>
            </section>

            {/* Pasos para eliminar cuenta */}
            <section>
              <h2 className="text-2xl font-bold text-primary-gold mb-4">
                Pasos para Solicitar la Eliminación de tu Cuenta
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-text-primary">
                <li className="pl-2">
                  <strong className="text-primary-gold">Abre la aplicación bartop</strong> en tu dispositivo Android.
                </li>
                <li className="pl-2">
                  <strong className="text-primary-gold">Inicia sesión</strong> en tu cuenta si no lo has hecho.
                </li>
                <li className="pl-2">
                  <strong className="text-primary-gold">Ve a tu perfil</strong> tocando el icono de perfil en la barra de navegación inferior.
                </li>
                <li className="pl-2">
                  <strong className="text-primary-gold">Accede a Configuración</strong> y busca la opción "Eliminar Cuenta".
                </li>
                <li className="pl-2">
                  <strong className="text-primary-gold">Confirma tu contraseña</strong> cuando se te solicite para verificar tu identidad.
                </li>
                <li className="pl-2">
                  <strong className="text-primary-gold">Confirma la eliminación</strong> después de leer la advertencia sobre la eliminación permanente de tus datos.
                </li>
              </ol>
            </section>

            {/* Datos que se eliminan */}
            <section>
              <h2 className="text-2xl font-bold text-primary-gold mb-4">
                Datos que se Eliminan
              </h2>
              <p className="text-text-primary mb-4">
                Cuando solicitas la eliminación de tu cuenta, los siguientes datos se eliminan permanentemente de nuestros servidores:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-primary ml-4">
                <li>
                  <strong className="text-primary-gold">Información de tu cuenta:</strong> nombre, email, teléfono, ubicación, género, país, avatar y avatar seed.
                </li>
                <li>
                  <strong className="text-primary-gold">Perfil de barbero:</strong> si tenías un perfil de barbero registrado, se eliminará completamente, incluyendo especialidad, años de experiencia, ubicación, imagen de perfil, biografía, servicios ofrecidos, portafolio de trabajos, cursos, disponibilidad y promociones asociadas.
                </li>
                <li>
                  <strong className="text-primary-gold">Tokens de autenticación:</strong> todos los tokens de sesión y refresh tokens se eliminan inmediatamente.
                </li>
                <li>
                  <strong className="text-primary-gold">Tokens de notificaciones:</strong> los tokens FCM (Firebase Cloud Messaging) asociados a tu cuenta se eliminan.
                </li>
              </ul>
            </section>

            {/* Datos que se mantienen */}
            <section>
              <h2 className="text-2xl font-bold text-primary-gold mb-4">
                Datos que se Mantienen
              </h2>
              <p className="text-text-primary mb-4">
                Por razones legales y de integridad del servicio, algunos datos pueden mantenerse de forma anónima o agregada:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-primary ml-4">
                <li>
                  <strong className="text-primary-gold">Citas históricas:</strong> las citas que hayas realizado pueden mantenerse en nuestros registros de forma anónima para fines estadísticos y de cumplimiento legal. No se asociarán a tu cuenta eliminada.
                </li>
                <li>
                  <strong className="text-primary-gold">Reseñas publicadas:</strong> las reseñas que hayas publicado sobre barberos o barberías pueden mantenerse de forma anónima para preservar la integridad del sistema de calificaciones. Tu nombre y perfil se eliminarán de estas reseñas.
                </li>
                <li>
                  <strong className="text-primary-gold">Datos agregados:</strong> información estadística agregada y anonimizada que no identifica a usuarios individuales puede mantenerse para análisis y mejoras del servicio.
                </li>
              </ul>
            </section>

            {/* Período de retención */}
            <section>
              <h2 className="text-2xl font-bold text-primary-gold mb-4">
                Período de Retención
              </h2>
              <p className="text-text-primary leading-relaxed">
                Una vez que solicitas la eliminación de tu cuenta:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-primary ml-4 mt-4">
                <li>
                  <strong className="text-primary-gold">Eliminación inmediata:</strong> tu cuenta y la mayoría de tus datos personales se eliminan inmediatamente después de confirmar la eliminación.
                </li>
                <li>
                  <strong className="text-primary-gold">Eliminación completa:</strong> todos los datos identificables se eliminan dentro de <strong>30 días</strong> como máximo desde la solicitud.
                </li>
                <li>
                  <strong className="text-primary-gold">Backups:</strong> los datos pueden existir en copias de seguridad hasta <strong>90 días</strong> después de la eliminación, después de lo cual se eliminan permanentemente.
                </li>
                <li>
                  <strong className="text-primary-gold">Datos anónimos:</strong> los datos agregados y anonimizados pueden mantenerse indefinidamente ya que no pueden identificarte.
                </li>
              </ul>
            </section>

            {/* Advertencia */}
            <section className="bg-background-card-dark border-2 border-error rounded-lg p-6">
              <h2 className="text-xl font-bold text-error mb-3">
                ⚠️ Advertencia Importante
              </h2>
              <p className="text-text-primary leading-relaxed">
                La eliminación de tu cuenta es <strong className="text-error">permanente e irreversible</strong>. Una vez eliminada:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-primary ml-4 mt-4">
                <li>No podrás recuperar tu cuenta ni tus datos.</li>
                <li>Perderás acceso a todas tus citas, historial y preferencias.</li>
                <li>Si eras barbero, perderás tu perfil profesional y todos los datos asociados.</li>
                <li>No podrás usar el mismo email para crear una nueva cuenta inmediatamente.</li>
              </ul>
            </section>

            {/* Contacto alternativo */}
            <section>
              <h2 className="text-2xl font-bold text-primary-gold mb-4">
                Contacto Alternativo
              </h2>
              <p className="text-text-primary leading-relaxed mb-4">
                Si no puedes acceder a la aplicación o prefieres solicitar la eliminación por otro medio, puedes contactarnos:
              </p>
              <div className="bg-background-card-dark rounded-lg p-4 border border-border-gold">
                <p className="text-text-primary">
                  <strong className="text-primary-gold">Email:</strong>{' '}
                  <a 
                    href="mailto:gega19s@gmail.com" 
                    className="text-primary-gold hover:text-primary-gold-dark underline"
                  >
                    geg19s@gmail.com
                  </a>
                </p>
                <p className="text-text-secondary text-sm mt-2">
                  Incluye en el asunto: "Solicitud de Eliminación de Cuenta - bartop"
                </p>
              </div>
            </section>

            {/* Información adicional */}
            <section>
              <h2 className="text-2xl font-bold text-primary-gold mb-4">
                Información Adicional
              </h2>
              <p className="text-text-primary leading-relaxed">
                Para más información sobre cómo manejamos tus datos, consulta nuestra{' '}
                <Link href="/privacy-policy" className="text-primary-gold hover:text-primary-gold-dark underline">
                  Política de Privacidad
                </Link>
                {' '}y nuestros{' '}
                <Link href="/terms-of-service" className="text-primary-gold hover:text-primary-gold-dark underline">
                  Términos de Servicio
                </Link>
                .
              </p>
            </section>

            {/* Botón de regreso */}
            <div className="mt-8 pt-6 border-t-2 border-border-gold">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-primary-gold hover:text-primary-gold-dark transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



