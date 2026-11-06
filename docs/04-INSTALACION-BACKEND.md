# Instalacion y Despliegue del Backend

## Requisitos
- Node.js 20.x
- Cuenta en MongoDB Atlas

## Instalacion Local
1. Clonar el repo:
   git clone https://github.com/dannysj0214-commits/veterinaria-backend.git
2. Entrar:
   cd veterinaria-backend
3. Instalar dependencias:
   npm install
4. Crear `.env`:
   PORT=5000
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=...
5. Ejecutar en desarrollo:
   npm run dev

## Despliegue en Render
1. Crear un Web Service en Render.
2. Conectar el repositorio de GitHub.
3. Build Command: npm install
4. Start Command: node index.js
5. Agregar las variables de entorno en el dashboard.
6. Deploy.

URL: https://veterinaria-backend-s64b.onrender.com/api

## Seed de Categorias
Ejecutar una vez para cargar las 6 categorias de rescate:
   node seed_categorias.js
