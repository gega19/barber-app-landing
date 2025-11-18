# Barber App Landing Page

Landing page para la aplicación Barber App. Diseñada para captar usuarios y permitir la descarga del APK mientras la app está en proceso de verificación en Google Play.

## 🎨 Diseño

La landing page utiliza el mismo sistema de diseño que la aplicación Flutter:
- **Tema**: Dark mode
- **Color primario**: Dorado (#C9A961)
- **Fondo**: Negro (#121212)
- **Tarjetas**: Gris oscuro (#1A1A1A)
- **Tipografía**: Inter (Google Fonts)

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar en producción
npm start
```

La aplicación estará disponible en `http://localhost:3002`

## 📁 Estructura del Proyecto

```
barber-app-landing/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de inicio
│   ├── globals.css         # Estilos globales y variables CSS
│   ├── download/           # Página de descarga de APK
│   ├── privacy-policy/     # Política de privacidad
│   └── terms-of-service/   # Términos de servicio
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Secciones de la landing (Hero, Features, etc.)
│   └── ui/                 # Componentes reutilizables
├── lib/
│   ├── api.ts              # Cliente API
│   └── utils.ts            # Utilidades
└── public/                 # Archivos estáticos
```

## 🎯 Funcionalidades

- [x] Setup del proyecto
- [x] Sistema de diseño
- [x] Secciones principales (Hero, Features, Screenshots, CTA)
- [ ] Descarga de APK
- [ ] Políticas y términos
- [ ] Backoffice para gestión de APK
- [ ] SEO y optimizaciones

## 📋 Secciones Implementadas

### Hero Section
- Título principal con gradiente
- Badge de disponibilidad
- Botones CTA (Descargar APK y Conocer más)
- Estadísticas destacadas
- Indicador de scroll animado

### Features Section
- Grid de 6 características principales
- Iconos SVG personalizados
- Cards con efecto hover
- Diseño responsive

### Screenshots Section
- Galería de capturas de pantalla
- Lightbox modal para vista ampliada
- Placeholders listos para imágenes reales
- Grid responsive

### CTA Section
- Sección final de llamada a la acción
- Información adicional (gratis, sin registro, fácil instalación)
- Diseño con gradientes y elementos decorativos

