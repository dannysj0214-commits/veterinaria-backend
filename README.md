# Veterinaria Backend - API REST

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render&logoColor=white)](https://render.com)

API REST desarrollada con **Node.js + Express + MongoDB Atlas** para el sistema de **Citas Veterinarias y Rescate de Animales**. Proyecto academico **TCC 2026-2**.

> **URL de produccion:** `https://veterinaria-backend-s64b.onrender.com/api`
> **Estado:** Desplegado en Render (en vivo)

---

## Tabla de Contenidos

- [Descripcion](#-descripcion)
- [Tecnologias](#-tecnologias)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Modulos y Endpoints](#-modulos-y-endpoints)
- [Variables de Entorno](#-variables-de-entorno)
- [Como Ejecutar Localmente](#-como-ejecutar-localmente)
- [Despliegue en Render](#-despliegue-en-render)
- [Documentacion](#-documentacion)

---

## Descripcion

Backend encargado de gestionar la autenticacion, los reportes de rescate animal, las citas veterinarias, las historias clinicas, las notificaciones y las estadisticas del sistema.

---

## Tecnologias

| Categoria | Paquete | Version |
|---|---|---|
| **Runtime** | Node.js | 20.x / 24.x |
| **Framework** | Express | ^4.22.2 |
| **Base de datos** | MongoDB Atlas (Mongoose) | ^7.8.9 |
| **Autenticacion** | JWT + bcryptjs | ^9.0.3 / ^2.4.3 |
| **Validacion** | express-validator | ^7.3.2 |
| **CORS** | cors | ^2.8.6 |
| **Variables de entorno** | dotenv | ^16.6.1 |
| **Fechas** | moment | ^2.30.1 |

---

## Estructura del Proyecto
veterinaria-backend/
+-- src/
| +-- models/
| | +-- User.js
| | +-- ReporteRescate.js
| | +-- CategoriaRescate.js
| | +-- Appointment.js
| | +-- Service.js
| | +-- Availability.js
| | +-- Notification.js
| | +-- MedicalRecord.js
| +-- routes/
| | +-- auth.js
| | +-- reportesRescate.js
| | +-- categoriasRescate.js
| | +-- appointments.js
| | +-- services.js
| | +-- availability.js
| | +-- notifications.js
| | +-- medicalRecords.js
| | +-- reports.js
| | +-- admin.js
| +-- middleware/
| +-- auth.js
+-- server.js
+-- seed_categorias.js
+-- package.json
+-- .env.example

text

> **Nota:** El punto de entrada es `server.js` (Render ejecuta `node server.js`).

---

## Modulos y Endpoints

Para ver el detalle completo de cada endpoint, revisa `docs/02-API-REST.md`.

| Modulo | Ruta Base | Descripcion |
|---|---|---|
| Auth | `/api/auth` | Login, registro, perfil |
| Rescate | `/api/reportes-rescate` | CRUD de incidencias |
| Categorias | `/api/categorias-rescate` | CRUD de categorias |
| Citas | `/api/appointments` | Gestion de citas |
| Servicios | `/api/services` | Servicios veterinarios |
| Disponibilidad | `/api/availability` | Horarios del profesional |
| Notificaciones | `/api/notifications` | Notificaciones de usuario |
| Historias | `/api/medical-records` | Historias clinicas |
| Reportes | `/api/reports` | Estadisticas y dashboard |
| Admin | `/api/admin` | Gestion de usuarios |

---

## Variables de Entorno

Crea un archivo `.env` en la raiz con:

    PORT=5000
    MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.wbbnixf.mongodb.net/sistema_citas
    JWT_SECRET=tu_clave_secreta_muy_larga
    JWT_EXPIRES_IN=7d

---

## Como Ejecutar Localmente

    git clone https://github.com/dannysj0214-commits/veterinaria-backend.git
    cd veterinaria-backend
    npm install
    npm run dev

El servidor corre en `http://localhost:5000/api`.

---

## Despliegue en Render

1. Conectar el repositorio de GitHub a Render.
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Agregar las variables de entorno en el dashboard de Render.
5. Deploy.

URL actual: `https://veterinaria-backend-s64b.onrender.com/api`

---

## Documentacion

| Documento | Contenido |
|---|---|
| `docs/01-ARQUITECTURA-BACKEND.md` | Capas, JWT y conexion |
| `docs/02-API-REST.md` | Todos los endpoints documentados |
| `docs/03-BASE-DE-DATOS.md` | Colecciones MongoDB y relaciones |
| `docs/04-INSTALACION-BACKEND.md` | Instalacion local y despliegue |

---

## Autor

**Danny SJ** - [@dannysj0214-commits](https://github.com/dannysj0214-commits)
