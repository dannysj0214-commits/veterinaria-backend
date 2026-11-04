const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ============================================================
// OBTENER TODOS LOS USUARIOS (Solo Admin)
// ============================================================
router.get('/usuarios', auth, isAdmin, async (req, res) => {
  const usuarios = await User.find({}).select('-password');
  res.json({ success: true, data: usuarios });
});

// ============================================================
// CREAR USUARIO (Solo Admin)
// ============================================================
router.post('/usuarios', auth, isAdmin, async (req, res) => {
  const { nombre, email, password, telefono, rol, especialidad } = req.body;
  const existe = await User.findOne({ email });
  if (existe) return res.status(400).json({ success: false, message: 'Email ya registrado' });
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const usuario = new User({ 
    nombre, 
    email, 
    password: hashedPassword, 
    telefono, 
    rol, 
    especialidad: rol === 'profesional' ? especialidad : undefined 
  });
  await usuario.save();
  
  res.json({ success: true, message: 'Usuario creado' });
});

// ============================================================
// ACTUALIZAR USUARIO (Solo Admin)
// ============================================================
router.put('/usuarios/:id', auth, isAdmin, async (req, res) => {
  const { nombre, email, telefono, rol, especialidad } = req.body;
  const usuario = await User.findById(req.params.id);
  if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  
  if (nombre) usuario.nombre = nombre;
  if (email) usuario.email = email;
  if (telefono) usuario.telefono = telefono;
  if (rol) usuario.rol = rol;
  if (especialidad) usuario.especialidad = especialidad;
  
  await usuario.save();
  res.json({ success: true, message: 'Usuario actualizado' });
});

// ============================================================
// ELIMINAR USUARIO (Solo Admin)
// ============================================================
router.delete('/usuarios/:id', auth, isAdmin, async (req, res) => {
  const usuario = await User.findById(req.params.id);
  if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  if (usuario.email === 'admin@vet.com') return res.status(400).json({ success: false, message: 'No se puede eliminar al admin principal' });
  
  await usuario.deleteOne();
  res.json({ success: true, message: 'Usuario eliminado' });
});

// ============================================================
// OBTENER LISTA DE CLIENTES (Para que el Profesional los seleccione)
// ============================================================
router.get('/clientes', auth, async (req, res) => {
  try {
    // Busca usuarios que tengan rol 'cliente' y selecciona solo los campos necesarios
    const clientes = await User.find({ rol: 'cliente' }).select('nombre email telefono');
    res.json({ success: true, data: clientes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;