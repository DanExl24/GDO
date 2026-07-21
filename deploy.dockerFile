# 1. Usar una versión ligera de Node.js (v24 como la que tienes instalada localmente)
FROM node:24.15-alpine

# 2. Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de dependencias
COPY package*.json ./

# 4. Instalar las dependencias de producción y desarrollo (necesarias para compilar TypeScript)
RUN npm ci

# 5. Copiar el código fuente y las configuraciones del proyecto
COPY tsconfig.json ./
COPY server ./server

# 6. Compilar el backend de TypeScript a JavaScript (genera server/dist)
RUN npm run build:server

# 7. Limpiar dependencias de desarrollo para hacer la imagen más ligera en producción
RUN npm prune --production

# 8. Exponer el puerto del servidor (3005)
EXPOSE 3005

# 9. Definir la variable de entorno por defecto y el comando para iniciar el backend
ENV PORT=3005
CMD ["npm", "run", "start:server"]
