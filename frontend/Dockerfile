# 1. Dependencias
FROM node:20-alpine AS deps
WORKDIR /app
# libc6-compat es necesaria para que Next.js funcione correctamente en Alpine
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm install

# 2. Construcción (Build)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desactivamos telemetría para acelerar el build
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 3. Ejecución (Runner)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Seguridad: No correr como root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos solo lo esencial para una imagen ligera
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# VITAL: Copiar el config para que funcionen los rewrites/proxy hacia el backend
COPY --from=builder /app/next.config.ts ./

USER nextjs

EXPOSE 3000

# Comando de inicio estándar de Next.js
CMD ["npm", "start"]