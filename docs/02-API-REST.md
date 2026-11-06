# API REST - Endpoints

## Auth
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login (devuelve JWT)
- `GET /api/auth/profile` - Perfil (auth)

## Rescate
- `GET /api/reportes-rescate` - Listar (publico, con filtros)
- `GET /api/reportes-rescate/mis-reportes` - Mis reportes (auth)
- `GET /api/reportes-rescate/estadisticas` - Estadisticas (auth)
- `GET /api/reportes-rescate/:id` - Detalle (auth)
- `POST /api/reportes-rescate` - Crear (auth)
- `PUT /api/reportes-rescate/:id` - Actualizar (auth, dueno/admin/profesional)
- `POST /api/reportes-rescate/:id/seguimiento` - Agregar seguimiento (auth)
- `DELETE /api/reportes-rescate/:id` - Eliminar (auth, dueno/admin)

## Categorias
- `GET /api/categorias-rescate` - Listar
- `POST /api/categorias-rescate` - Crear (admin)
- `PUT /api/categorias-rescate/:id` - Actualizar (admin)
- `DELETE /api/categorias-rescate/:id` - Eliminar (admin)

## Citas
- `POST /api/appointments` - Crear
- `GET /api/appointments/cliente` - Citas del cliente
- `GET /api/appointments/profesional` - Citas del profesional
- `PUT /api/appointments/:id/estado` - Cambiar estado
- `DELETE /api/appointments/:id` - Cancelar

## Otros
- `/api/services` - Servicios
- `/api/availability` - Disponibilidad
- `/api/notifications` - Notificaciones
- `/api/medical-records` - Historias
- `/api/reports` - Estadisticas
- `/api/admin` - Admin
