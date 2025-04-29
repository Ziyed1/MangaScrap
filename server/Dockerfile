# Utilise une image officielle Node.js comme base
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet dans l'image
COPY . .

# Définir la variable d'environnement pour éviter les erreurs
ENV PORT=5000

# Exposer le port sur lequel ton serveur tourne
EXPOSE 5000

# Démarrer ton serveur
CMD ["npm", "run", "dev"]