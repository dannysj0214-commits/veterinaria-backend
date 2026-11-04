const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ============================================================
// RUTAS EXISTENTES (sistema veterinario)
// ============================================================
const authRoutes = require('./src/routes/auth');
const appointmentRoutes = require('./src/routes/appointments');
const serviceRoutes = require('./src/routes/services');
const availabilityRoutes = require('./src/routes/availability');
const notificationRoutes = require('./src/routes/notifications');
const medicalRecordRoutes = require('./src/routes/medicalRecords');
const reportRoutes = require('./src/routes/reports');
const adminRoutes = require('./src/routes/admin');

// ============================================================
// RUTAS NUEVAS (módulo de rescate de mascotas)
// ============================================================
const categoriasRescateRoutes = require('./src/routes/categoriasRescate');
const reportesRescateRoutes = require('./src/routes/reportesRescate');

const app = express();

// ============================================================
// CORS ampliado para Flutter (emulador Android, Chrome, red local)
// ============================================================
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ============================================================
// BODY PARSERS
// ============================================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ============================================================
// LOG DE PETICIONES (útil para depurar)
// ============================================================
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  next();
});

// ============================================================
// MONTAR RUTAS - Sistema veterinario
// ============================================================
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);

// ============================================================
// MONTAR RUTAS - Módulo de rescate
// ============================================================
app.use('/api/categorias-rescate', categoriasRescateRoutes);
app.use('/api/reportes-rescate', reportesRescateRoutes);

// ============================================================
// HEALTH CHECK
// ============================================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando' });
});

// ============================================================
// CONEXIÓN A MONGODB LOCAL
// ============================================================
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sistema_citas')
  .then(() => console.log('✅ Conectado a MongoDB LOCAL'))
  .catch(err => console.error('❌ Error:', err));

// ============================================================
// ARRANCAR SERVIDOR (Escuchando en todas las interfaces)
// ============================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT} (aceptando conexiones de red)`);
});