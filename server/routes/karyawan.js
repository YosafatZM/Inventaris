const express = require('express');
const router = express.Router();
const karyawanController = require('../controllers/karyawanController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, karyawanController.getAllKaryawan);
router.get('/:id', authMiddleware, karyawanController.getKaryawanById);
router.post('/', authMiddleware, karyawanController.createKaryawan);
router.put('/:id', authMiddleware, karyawanController.updateKaryawan);
router.delete('/:id', authMiddleware, karyawanController.deleteKaryawan);

module.exports = router;