# Despliegue de Landing Page en Render

Esta guía te ayudará a desplegar la landing page de bartop en Render.

## Requisitos Previos

- Cuenta en Render (https://render.com)
- Repositorio en GitHub: `gega19/barber-app-landing`
- Backend desplegado en Render (para las APIs)

## Pasos para Desplegar

### 1. Crear un Nuevo Web Service en Render

1. Ve a tu dashboard de Render: https://dashboard.render.com
2. Haz clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub:
   - Selecciona **"Connect account"** si aún no has conectado GitHub
   - Busca y selecciona el repositorio: `gega19/barber-app-landing`
   - Haz clic en **"Connect"**

### 2. Configurar el Servicio

Completa los siguientes campos:

- **Name**: `barber-app-landing` (o el nombre que prefieras)
- **Region**: Selecciona la región más cercana a tus usuarios
- **Branch**: `main`
- **Root Directory**: (dejar vacío, está en la raíz)
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 3. Variables de Entorno

Agrega las siguientes variables de entorno en la sección **"Environment"**:

```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://barber-app-backend-kj6s.onrender.com
PORT=10000
```

**Nota**: Render asigna automáticamente el puerto, pero Next.js necesita la variable `PORT` para funcionar correctamente.

### 4. Plan y Despliegue

- **Plan**: Selecciona el plan que prefieras (Free tier está disponible)
- Haz clic en **"Create Web Service"**

### 5. Esperar el Despliegue

Render comenzará a:
1. Clonar el repositorio
2. Instalar dependencias (`npm install`)
3. Construir la aplicación (`npm run build`)
4. Iniciar el servidor (`npm start`)

El proceso puede tardar 5-10 minutos la primera vez.

## Verificación Post-Despliegue

Una vez desplegado, verifica:

1. **URL del servicio**: Render te dará una URL como `https://barber-app-landing.onrender.com`
2. **Health check**: Visita la URL y verifica que la landing page carga correctamente
3. **API connection**: Verifica que la página de descarga pueda conectarse al backend

## Actualizaciones Futuras

Para actualizar la landing page:

1. Haz cambios en tu repositorio local
2. Haz commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push origin main
   ```
3. Render detectará automáticamente los cambios y desplegará una nueva versión

## Solución de Problemas

### Error: "Build failed"

- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Render para ver el error específico
- Asegúrate de que `next build` se ejecute sin errores localmente

### Error: "Port already in use"

- Asegúrate de que el script `start` use `${PORT}` en lugar de un puerto fijo
- Verifica que la variable de entorno `PORT` esté configurada

### Error: "API connection failed"

- Verifica que `NEXT_PUBLIC_API_URL` apunte al backend correcto
- Asegúrate de que el backend esté desplegado y funcionando
- Revisa la configuración de CORS en el backend

### La página carga pero las imágenes no se ven

- Verifica que las imágenes estén en `public/images/`
- Asegúrate de que las rutas en el código sean relativas (ej: `/images/logo.png`)

## Configuración Adicional

### Dominio Personalizado (Opcional)

Si quieres usar un dominio personalizado:

1. Ve a **Settings** → **Custom Domains**
2. Agrega tu dominio
3. Sigue las instrucciones de DNS que Render te proporciona

### Auto-Deploy

Por defecto, Render despliega automáticamente cuando haces push a la rama `main`. Puedes cambiar esto en **Settings** → **Auto-Deploy**.

## Notas Importantes

- El plan gratuito de Render puede "dormir" el servicio después de 15 minutos de inactividad
- La primera carga después de dormir puede tardar ~30 segundos
- Para producción, considera actualizar a un plan de pago para evitar el "sleep mode"

