const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Notification = require('../models/Notification'); // ✅ Importación correcta (SIN llaves)

// Obtener notificaciones del usuario
router.get('/', auth, async (req, res) => {
  try {
    // ✅ Eliminado el .limit(50) que causaba el error
    const notificaciones = await Notification.find({ id_usuario: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: notificaciones });
  } catch (error) {
    console.error('❌ Error en GET /notifications:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Marcar UNA notificación como leída
router.put('/:id/leer', auth, async (req, res) => {
  try {
    const notificacion = await Notification.findOne({ _id: req.params.id, id_usuario: req.userId });
    if (!notificacion) return res.status(404).json({ success: false, message: 'Notificación no encontrada' });
    
    notificacion.leido = true;
    await notificacion.save();
    res.json({ success: true, message: 'Marcada como leída' });
  } catch (error) {
    console.error('❌ Error en PUT /notifications/:id/leer:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Marcar TODAS como leídas
router.put('/leer-todas', auth, async (req, res) => {
  try {
    await Notification.updateMany({ id_usuario: req.userId, leido: false }, { leido: true });
    res.json({ success: true, message: 'Todas marcadas como leídas' });
  } catch (error) {
    console.error('❌ Error en PUT /notifications/leer-todas:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;