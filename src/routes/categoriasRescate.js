const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const CategoriaRescate = require('../models/CategoriaRescate');

// Listar todas las categorías activas (público)
router.get('/', async (req, res) => {
  try {
    const categorias = await CategoriaRescate.find({ activa: true }).sort({ nombre: 1 });
    res.json({ success: true, data: categorias });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Listar todas (incluye inactivas) - solo admin
router.get('/todas', auth, isAdmin, async (req, res) => {
  try {
    const categorias = await CategoriaRescate.find({}).sort({ nombre: 1 });
    res.json({ success: true, data: categorias });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Obtener una
router.get('/:id', auth, async (req, res) => {
  try {
    const categoria = await CategoriaRescate.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }
    res.json({ success: true, data: categoria });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Crear (solo admin)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, icono, color } = req.body;

    const existe = await CategoriaRescate.findOne({ nombre });
    if (existe) {
      return res.status(400).json({ success: false, message: 'Ya existe una categoría con ese nombre' });
    }

    const categoria = new CategoriaRescate({
      nombre,
      descripcion: descripcion || '',
      icono: icono || 'pets',
      color: color || '#2C3E50'
    });

    await categoria.save();
    res.json({ success: true, message: 'Categoría creada', data: categoria });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Actualizar (solo admin)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const categoria = await CategoriaRescate.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }

    const { nombre, descripcion, icono, color, activa } = req.body;
    if (nombre) categoria.nombre = nombre;
    if (descripcion !== undefined) categoria.descripcion = descripcion;
    if (icono) categoria.icono = icono;
    if (color) categoria.color = color;
    if (activa !== undefined) categoria.activa = activa;

    await categoria.save();
    res.json({ success: true, message: 'Categoría actualizada', data: categoria });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Eliminar (solo admin, hard delete)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const categoria = await CategoriaRescate.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }
    await categoria.deleteOne();
    res.json({ success: true, message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;