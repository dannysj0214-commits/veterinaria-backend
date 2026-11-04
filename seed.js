// ============================================================
// SEED - Insertar categorías de rescate iniciales
// Ejecutar UNA SOLA VEZ con: node seed.js
// ============================================================

const mongoose = require('mongoose');
require('dotenv').config();

const CategoriaRescate = require('./src/models/CategoriaRescate');

const categorias = [
  {
    nombre: 'Perdida',
    descripcion: 'Mascota extraviada que se busca',
    icono: 'search',
    color: '#F44336',
    activa: true
  },
  {
    nombre: 'Encontrada',
    descripcion: 'Mascota encontrada sin dueño conocido',
    icono: 'check_circle',
    color: '#4CAF50',
    activa: true
  },
  {
    nombre: 'En adopción',
    descripcion: 'Mascota que busca un hogar',
    icono: 'home',
    color: '#2196F3',
    activa: true
  },
  {
    nombre: 'Urgente',
    descripcion: 'Requiere atención inmediata',
    icono: 'warning',
    color: '#FFC107',
    activa: true
  },
  {
    nombre: 'Maltrato',
    descripcion: 'Reporte de maltrato animal',
    icono: 'report',
    color: '#9C27B0',
    activa: true
  }
];

async function seedDatabase() {
  try {
    console.log('🔌 Conectando a MongoDB...');

    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/sistema_citas'
    );
    console.log('✅ Conectado a MongoDB LOCAL');

    console.log('\n📋 Categorías a insertar:');
    categorias.forEach(c => console.log(`   - ${c.nombre} (${c.color})`));

    console.log('\n🧹 Limpiando categorías existentes...');
    const eliminadas = await CategoriaRescate.deleteMany({});
    console.log(`   ${eliminadas.deletedCount} categorías eliminadas`);

    console.log('\n💾 Insertando nuevas categorías...');
    const insertadas = await CategoriaRescate.insertMany(categorias);
    console.log(`   ${insertadas.length} categorías insertadas`);

    console.log('\n✅ SEED COMPLETADO');
    console.log('\n📋 Categorías creadas:');
    insertadas.forEach(c => {
      console.log(`   ✅ ${c.nombre} - ID: ${c._id}`);
    });

    await mongoose.connection.close();
    console.log('\n🔌 Conexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error en seed:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedDatabase();