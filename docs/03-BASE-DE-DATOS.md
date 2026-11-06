# Base de Datos - MongoDB

## Colecciones

### users
- nombre, email, password (hash), rol (admin/profesional/cliente), telefono, especialidad, disponible

### reportesrescates
- titulo, descripcion, categoria (ref), especie, raza, color_pelaje, tamanio, ubicacion, latitud, longitud, fotos, estado (activo/en_proceso/resuelto/cerrado), contacto_nombre, contacto_telefono, contacto_email, id_usuario (ref), seguimientos (array de objetos con mensaje, autor, fecha)

### categoriarescates
- nombre, descripcion, icono, color

### appointments
- fecha, hora, estado (pendiente/confirmada/cancelada/atendida), motivo, servicio (ref), id_cliente (ref), id_profesional (ref)

### services
- nombre, duracion, precio, id_profesional (ref)

### availability
- dia_semana, hora_inicio, hora_fin, id_profesional (ref)

### notifications
- tipo, titulo, mensaje, leido, link, id_usuario (ref)

### medicalrecords
- hc_numero, propietario, paciente, diagnostico, tratamiento, medicamentos, profesional (ref)

## Relaciones
- Un usuario puede tener muchos reportes y muchas citas.
- Un reporte pertenece a un usuario y a una categoria.
- Un reporte puede tener muchos seguimientos.
- Una cita pertenece a un cliente y a un profesional.
