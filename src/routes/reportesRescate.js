const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const ReporteRescate = require('../models/ReporteRescate');
const CategoriaRescate = require('../models/CategoriaRescate');
const Notification = require('../models/Notification');
const User = require('../models/User');

// Listar reportes (público, con filtros)
router.get('/', async (req, res) => {
  try {
    const { categoria, estado, especie, busqueda } = req.query;
    const filtro = {};
    if (categoria) filtro.categoria = categoria;
    if (estado) filtro.estado = estado;
    if (especie) filtro.especie = especie;
    if (busqueda) {
      filtro.$or = [
        { titulo: { $regex: busqueda, $options: 'i' } },
        { descripcion: { $regex: busqueda, $options: 'i' } },
        { ubicacion: { $regex: busqueda, $options: 'i' } }
      ];
    }

    const reportes = await ReporteRescate.find(filtro)
      .populate('categoria', 'nombre color icono')
      .populate('id_usuario', 'nombre telefono email')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: reportes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mis reportes
router.get('/mis-reportes', auth, async (req, res) => {
  try {
    const reportes = await ReporteRescate.find({ id_usuario: req.userId })
      .populate('categoria', 'nombre color icono')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: reportes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Estadísticas (para dashboard)
router.get('/estadisticas', auth, async (req, res) => {
  try {
    const total = await ReporteRescate.countDocuments();
    const activos = await ReporteRescate.countDocuments({ estado: 'activo' });
    const resueltos = await ReporteRescate.countDocuments({ estado: 'resuelto' });
    const enProceso = await ReporteRescate.countDocuments({ estado: 'en_proceso' });

    const porCategoria = await ReporteRescate.aggregate([
      { $group: { _id: '$categoria', count: { $sum: 1 } } },
      { $lookup: { from: 'categoriarescates', localField: '_id', foreignField: '_id', as: 'cat' } },
      { $unwind: '$cat' },
      { $project: { nombre: '$cat.nombre', color: '$cat.color', count: 1 } }
    ]);

    res.json({
      success: true,
      data: { total, activos, resueltos, enProceso, porCategoria }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Obtener uno
router.get('/:id', auth, async (req, res) => {
  try {
    const reporte = await ReporteRescate.findById(req.params.id)
      .populate('categoria')
      .populate('id_usuario', 'nombre telefono email')
      .populate('seguimientos.autor', 'nombre rol');

    if (!reporte) {
      return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
    }
    res.json({ success: true, data: reporte });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Crear reporte con Notificación Masiva (AQUÍ SE GUARDA EL LINK)
router.post('/', auth, async (req, res) => {
  try {
    const {
      titulo, descripcion, categoria, especie, raza, color_pelaje,
      tamanio, ubicacion, latitud, longitud, fotos,
      contacto_nombre, contacto_telefono, contacto_email
    } = req.body;

    if (!titulo || !descripcion || !categoria || !ubicacion || !contacto_nombre || !contacto_telefono) {
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    const cat = await CategoriaRescate.findById(categoria);
    if (!cat) {
      return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }

    const reporte = new ReporteRescate({
      titulo,
      descripcion,
      categoria,
      especie: especie || 'Canino',
      raza: raza || '',
      color_pelaje: color_pelaje || '',
      tamanio: tamanio || 'Mediano',
      ubicacion,
      latitud,
      longitud,
      fotos: fotos || [],
      contacto_nombre,
      contacto_telefono,
      contacto_email: contacto_email || '',
      id_usuario: req.userId
    });

    await reporte.save();

    // 🌟 NOTIFICACIÓN MASIVA CON LINK
    try {
      const usuarios = await User.find({ _id: { $ne: req.userId } }); 
      
      const notificaciones = usuarios.map(u => ({
        tipo: 'sistema',
        titulo: '🚨 Nuevo Reporte de Rescate',
        mensaje: `Se ha reportado: "${titulo}" en ${ubicacion}.`,
        leido: false,
        link: reporte._id.toString(), // 🌟 EL LINK SE GUARDA AQUÍ
        id_usuario: u._id
      }));

      if (notificaciones.length > 0) {
        await Notification.insertMany(notificaciones);
      }
    } catch (notifError) {
      console.error('Error al crear notificaciones masivas:', notifError);
    }

    res.json({ success: true, message: 'Reporte creado', data: reporte });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Actualizar
router.put('/:id', auth, async (req, res) => {
  try {
    const reporte = await ReporteRescate.findById(req.params.id);
    if (!reporte) {
      return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
    }

    const esDuenio = reporte.id_usuario.toString() === req.userId.toString();
    const esAdmin = req.user.rol === 'admin';
    if (!esDuenio && !esAdmin) {
      return res.status(403).json({ success: false, message: 'No autorizado' });
    }

    Object.assign(reporte, req.body, { updatedAt: Date.now() });
    await reporte.save();
    res.json({ success: true, message: 'Reporte actualizado', data: reporte });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Agregar seguimiento
router.post('/:id/seguimiento', auth, async (req, res) => {
  try {
    const reporte = await ReporteRescate.findById(req.params.id);
    if (!reporte) {
      return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
    }

    const { mensaje } = req.body;
    if (!mensaje) {
      return res.status(400).json({ success: false, message: 'El mensaje es obligatorio' });
    }

    reporte.seguimientos.push({
      mensaje,
      autor: req.userId,
      fecha: new Date()
    });
    await reporte.save();

    // Notificar al dueño si no es él mismo
    if (reporte.id_usuario.toString() !== req.userId.toString()) {
      await new Notification({
        tipo: 'sistema',
        titulo: 'Actualización en tu reporte',
        mensaje: `Nuevo seguimiento en "${reporte.titulo}"`,
        leido: false,
        link: reporte._id.toString(), // 🌟 LINK
        id_usuario: reporte.id_usuario
      }).save();
    }

    res.json({ success: true, message: 'Seguimiento agregado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Eliminar (dueño o admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const reporte = await ReporteRescate.findById(req.params.id);
    if (!reporte) {
      return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
    }

    const esDuenio = reporte.id_usuario.toString() === req.userId.toString();
    const esAdmin = req.user.rol === 'admin';
    if (!esDuenio && !esAdmin) {
      return res.status(403).json({ success: false, message: 'No autorizado' });
    }

    await reporte.deleteOne();
    res.json({ success: true, message: 'Reporte eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;