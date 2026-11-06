# Arquitectura del Backend

## Capas
- `routes/`: Definen los endpoints y la logica
- `middleware/`: Validacion de JWT y permisos
- `models/`: Esquemas Mongoose
- `server.js`: Punto de entrada, monta rutas y conecta a MongoDB

## Autenticacion (JWT)
1. El cliente hace `POST /api/auth/login`
2. El servidor valida credenciales con `bcrypt.compare()`
3. Se genera un token firmado con `JWT_SECRET`
4. El cliente envia `Authorization: Bearer <token>` en cada request
5. El middleware `auth.js` verifica el token y extrae `req.userId` y `req.user.rol`

## Base de Datos
- MongoDB Atlas
- Conexion via Mongoose 7
- URI en variable de entorno `MONGO_URI`

## Seguridad
- Contrasenas hasheadas con bcryptjs (10 rounds)
- CORS configurado para origenes permitidos
- Validacion de inputs con express-validator

## Despliegue
- Plataforma: Render
- Start Command: `node server.js`
- URL: `https://veterinaria-backend-s64b.onrender.com/api`
