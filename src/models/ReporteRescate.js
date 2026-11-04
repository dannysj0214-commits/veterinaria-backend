const mongoose = require('mongoose');

const seguimientoSchema = new mongoose.Schema({
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const reporteRescateSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoriaRescate',
    required: true
  },
  especie: {
    type: String,
    enum: ['Canino', 'Felino', 'Ave', 'Roedor', 'Otro'],
    default: 'Canino'
  },
  raza: { type: String, default: '' },
  color_pelaje: { type: String, default: '' },
  tamanio: {
    type: String,
    enum: ['Pequeño', 'Mediano', 'Grande'],
    default: 'Mediano'
  },
  ubicacion: {
    type: String,
    required: true
  },
  latitud: { type: Number },
  longitud: { type: Number },
  fotos: [{ type: String }],
  estado: {
    type: String,
    enum: ['activo', 'en_proceso', 'resuelto', 'cerrado'],
    default: 'activo'
  },
  contacto_nombre: {
    type: String,
    required: true
  },
  contacto_telefono: {
    type: String,
    required: true
  },
  contacto_email: {
    type: String,
    default: ''
  },
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seguimientos: [seguimientoSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ReporteRescate', reporteRescateSchema);