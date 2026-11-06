# Changelog

## [1.1.0] - 2026-11-05

### Anadido
- Modulo de Rescate de Animales (reportes, categorias, seguimientos)
- Endpoint de estadisticas de rescate
- Notificacion masiva al crear un reporte
- Documentacion completa en `docs/`

### Cambiado
- Permisos de cambio de estado: Admin, Profesional y Creador
- Fix en `PUT /api/reportes-rescate/:id` para permitir profesionales

### Corregido
- Seed de categorias apuntando a Atlas (no a local)
- Despliegue exitoso en Render (servicio en vivo)

---

## [1.0.0] - 2026-10-01

### Anadido
- Autenticacion con JWT
- CRUD de citas, servicios, disponibilidad
- Notificaciones
- Historias clinicas
- Reportes y estadisticas
- Gestion de usuarios (admin)
