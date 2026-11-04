const mongoose = require('mongoose');

const categoriaRescateSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  descripcion: {
    type: String,
    default: ''
  },
  icono: {
    type: String,
    default: 'pets'
  },
  color: {
    type: String,
    default: '#2C3E50'
  },
  activa: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CategoriaRescate', categoriaRescateSchema);