const { Karyawan, Barang } = require('../models');

exports.getAllKaryawan = async (req, res) => {
  try {
    const karyawans = await Karyawan.findAll({
      include: [{
        model: Barang,
        as: 'barangs'
      }]
    });
    res.json(karyawans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getKaryawanById = async (req, res) => {
  try {
    const karyawan = await Karyawan.findByPk(req.params.id, {
      include: [{
        model: Barang,
        as: 'barangs'
      }]
    });
    
    if (!karyawan) {
      return res.status(404).json({ message: 'Karyawan not found' });
    }
    
    res.json(karyawan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createKaryawan = async (req, res) => {
  try {
    const { nama, jabatan, email, telepon } = req.body;
    
    const karyawan = await Karyawan.create({
      nama,
      jabatan,
      email,
      telepon
    });
    
    res.status(201).json({
      message: 'Karyawan created successfully',
      karyawan
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateKaryawan = async (req, res) => {
  try {
    const { nama, jabatan, email, telepon } = req.body;
    
    const karyawan = await Karyawan.findByPk(req.params.id);
    
    if (!karyawan) {
      return res.status(404).json({ message: 'Karyawan not found' });
    }
    
    await karyawan.update({
      nama,
      jabatan,
      email,
      telepon
    });
    
    res.json({
      message: 'Karyawan updated successfully',
      karyawan
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteKaryawan = async (req, res) => {
  try {
    const karyawan = await Karyawan.findByPk(req.params.id);
    
    if (!karyawan) {
      return res.status(404).json({ message: 'Karyawan not found' });
    }
    
    await karyawan.destroy();
    
    res.json({ message: 'Karyawan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};