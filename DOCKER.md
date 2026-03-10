# Docker - barber-app-landing

Configuración Docker para la landing page de Next.js.

## Requisitos

- Docker
- Docker Compose (v2+)

## Uso rápido

### Con docker-compose (recomendado)

```bash
# Construir y levantar
docker compose up -d

# Ver logs
docker compose logs -f landing

# Detener
docker compose down
```

La app estará en **http://localhost:3000**

### Solo Docker

```bash
# Construir imagen (con URL de API por defecto)
docker build -t barber-landing .

# Construir con API personalizada
docker build --build-arg NEXT_PUBLIC_API_URL=https://tu-api.com/api -t barber-landing .

# Ejecutar
docker run -p 3000:3000 barber-landing
```

## Variables de entorno

Crea un archivo `.env` en la raíz (o usa `.env.example` como base):

| Variable | Descripción | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL del backend API | `https://barber-api.corporacionceg.com/api` |
| `PORT` | Puerto del host (mapeo) | `3000` |

**Nota:** `NEXT_PUBLIC_*` se inyecta en **build time**. Si cambias la URL del API, reconstruye la imagen:

```bash
docker compose build --no-cache
docker compose up -d
```

## Estructura

- **Dockerfile**: Build multi-stage optimizado (deps → builder → runner)
- **.dockerignore**: Excluye node_modules, .next, etc. del contexto
- **docker-compose.yml**: Orquestación del servicio

## Imagen

- Base: `node:20-alpine` (~150MB aprox. final)
- Usuario no-root para seguridad
- Output standalone de Next.js (solo lo necesario)
