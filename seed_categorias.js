const mongoose = require('mongoose');
const CategoriaRescate = require('./src/models/CategoriaRescate');

const categorias = [
  { nombre: 'Perdida', descripcion: 'Mascota extraviada que se busca', icono: 'search', color: '#F44336' },
  { nombre: 'Encontrada', descripcion: 'Mascota encontrada sin dueño conocido', icono: 'check_circle', color: '#4CAF50' },
  { nombre: 'En adopción', descripcion: 'Mascota que busca un hogar', icono: 'home', color: '#2196F3' },
  { nombre: 'Urgente', descripcion: 'Requiere atención médica inmediata', icono: 'warning', color: '#FFC107' },
  { nombre: 'Maltrato', descripcion: 'Reporte de maltrato o abandono animal', icono: 'report', color: '#9C27B0' },
  { nombre: 'Rescatada', descripcion: 'Mascota que ya está bajo cuidado de la clínica', icono: 'pets', color: '#2C3E50' }
];

async function seed() {
  try {
    // 🌟 CONEXIÓN DIRECTA A ATLAS (Nube)
    await mongoose.connect('mongodb+srv://dannysj0214_db_user:Veterinaria2026@cluster0.wbbnixf.mongodb.net/sistema_citas?retryWrites=true&w=majority');
    console.log('✅ Conectado a MongoDB Atlas');
    
    await CategoriaRescate.deleteMany({});
    console.log('🧹 Categorías viejas eliminadas de la nube');
    
    await CategoriaRescate.insertMany(categorias);
    console.log('✅ Categorías de animales insertadas correctamente');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seed();