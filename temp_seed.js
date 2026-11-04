const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
require('dotenv').config();

async function crearUsuarios() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sistema_citas');
    console.log('Conectado a MongoDB');

    await User.deleteMany({ email: { $in: ['admin@vet.com', 'vet@vet.com'] } });
    console.log('Usuarios anteriores eliminados');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    console.log('Hash generado:', hashedPassword);

    const admin = new User({
      nombre: 'Administrador',
      email: 'admin@vet.com',
      password: hashedPassword,
      rol: 'admin',
      telefono: '3001234567',
      disponible: true
    });
    await admin.save();
    console.log('Admin creado: admin@vet.com / password123');

    const vet = new User({
      nombre: 'Dr. Carlos',
      email: 'vet@vet.com',
      password: hashedPassword,
      rol: 'profesional',
      telefono: '3009876543',
      especialidad: 'VACUNACION',
      disponible: true
    });
    await vet.save();
    console.log('Profesional creado: vet@vet.com / password123');

    await mongoose.connection.close();
    console.log('Proceso completado');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

crearUsuarios();
