# Usa una imagen base de Node
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expón el puerto en el que corre Express (ajústalo si usas otro)
EXPOSE 3001

# Comando para arrancar el servidor
CMD ["npm", "start"]
