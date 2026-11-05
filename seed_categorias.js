const mongoose = require('mongoose');
require('dotenv').config();

const CategoriaRescate = require('./src/models/CategoriaRescate');

const categorias = [
  { nombre: 'Falla Eléctrica', descripcion: 'Problemas con el suministro eléctrico', icono: 'warning', color: '#FFC107' },
  { nombre: 'Infraestructura', descripcion: 'Daños en paredes, techos o pisos', icono: 'home', color: '#F44336' },
  { nombre: 'Seguridad', descripcion: 'Situaciones de riesgo o robos', icono: 'security', color: '#9C27B0' },
  { nombre: 'Mantenimiento', descripcion: 'Reparaciones generales', icono: 'build', color: '#2196F3' },
  { nombre: 'Limpieza', descripcion: 'Acumulación de basura o suciedad', icono: 'cleaning_services', color: '#4CAF50' },
  { nombre: 'Rescate de Mascotas', descripcion: 'Reportes de animales perdidos o maltratados', icono: 'pets', color: '#2C3E50' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sistema_citas');
    console.log('✅ Conectado a MongoDB');
    
    await CategoriaRescate.deleteMany({});
    console.log('🧹 Categorías anteriores eliminadas');
    
    await CategoriaRescate.insertMany(categorias);
    console.log('✅ Categorías insertadas correctamente');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seed();