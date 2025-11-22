const { Barang, Karyawan } = require('../models');

exports.getAllBarang = async (req, res) => {
  try {
    const barangs = await Barang.findAll({
      include: [{
        model: Karyawan,
        as: 'karyawan'
      }]
    });
    res.json(barangs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findByPk(req.params.id, {
      include: [{
        model: Karyawan,
        as: 'karyawan'
      }]
    });
    
    if (!barang) {
      return res.status(404).json({ message: 'Barang not found' });
    }
    
    res.json(barang);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createBarang = async (req, res) => {
  try {
    const { nama, kode, kategori, harga, stok, karyawanId } = req.body;
    
    // Check if karyawan exists
    const karyawan = await Karyawan.findByPk(karyawanId);
    if (!karyawan) {
      return res.status(404).json({ message: 'Karyawan not found' });
    }
    
    const barang = await Barang.create({
      nama,
      kode,
      kategori,
      harga,
      stok,
      karyawanId
    });
    
    const barangWithKaryawan = await Barang.findByPk(barang.id, {
      include: [{
        model: Karyawan,
        as: 'karyawan'
      }]
    });
    
    res.status(201).json({
      message: 'Barang created successfully',
      barang: barangWithKaryawan
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateBarang = async (req, res) => {
  try {
    const { nama, kode, kategori, harga, stok, karyawanId } = req.body;
    
    const barang = await Barang.findByPk(req.params.id);
    
    if (!barang) {
      return res.status(404).json({ message: 'Barang not found' });
    }
    
    // Check if karyawan exists
    if (karyawanId) {
      const karyawan = await Karyawan.findByPk(karyawanId);
      if (!karyawan) {
        return res.status(404).json({ message: 'Karyawan not found' });
      }
    }
    
    await barang.update({
      nama,
      kode,
      kategori,
      harga,
      stok,
      karyawanId
    });
    
    const updatedBarang = await Barang.findByPk(barang.id, {
      include: [{
        model: Karyawan,
        as: 'karyawan'
      }]
    });
    
    res.json({
      message: 'Barang updated successfully',
      barang: updatedBarang
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteBarang = async (req, res) => {
  try {
    const barang = await Barang.findByPk(req.params.id);
    
    if (!barang) {
      return res.status(404).json({ message: 'Barang not found' });
    }
    
    await barang.destroy();
    
    res.json({ message: 'Barang deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};