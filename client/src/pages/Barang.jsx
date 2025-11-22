import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { barangAPI, karyawanAPI } from '../services/api';

const Barang = () => {
  const [barangs, setBarangs] = useState([]);
  const [karyawans, setKaryawans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    kode: '',
    kategori: '',
    harga: '',
    stok: '',
    karyawanId: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBarangs();
    fetchKaryawans();
  }, []);

  const fetchBarangs = async () => {
    try {
      const response = await barangAPI.getAll();
      setBarangs(response.data);
    } catch (err) {
      setError('Failed to fetch barang data');
    }
  };

  const fetchKaryawans = async () => {
    try {
      const response = await karyawanAPI.getAll();
      setKaryawans(response.data);
    } catch (err) {
      setError('Failed to fetch karyawan data');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentId(null);
    setFormData({
      nama: '',
      kode: '',
      kategori: '',
      harga: '',
      stok: '',
      karyawanId: ''
    });
    setError('');
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (barang) => {
    setEditMode(true);
    setCurrentId(barang.id);
    setFormData({
      nama: barang.nama,
      kode: barang.kode,
      kategori: barang.kategori,
      harga: barang.harga,
      stok: barang.stok,
      karyawanId: barang.karyawanId
    });
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this barang?')) {
      try {
        await barangAPI.delete(id);
        setSuccess('Barang deleted successfully');
        fetchBarangs();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete barang');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        harga: parseInt(formData.harga),
        stok: parseInt(formData.stok),
        karyawanId: parseInt(formData.karyawanId)
      };

      if (editMode) {
        await barangAPI.update(currentId, submitData);
        setSuccess('Barang updated successfully');
      } else {
        await barangAPI.create(submitData);
        setSuccess('Barang created successfully');
      }
      fetchBarangs();
      handleClose();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(number);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data Barang</h2>
        <Button variant="primary" onClick={handleShow}>
          Add Barang
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Kode</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Penanggung Jawab</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {barangs.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No data available</td>
            </tr>
          ) : (
            barangs.map((barang, index) => (
              <tr key={barang.id}>
                <td>{index + 1}</td>
                <td>{barang.nama}</td>
                <td>{barang.kode}</td>
                <td>{barang.kategori}</td>
                <td>{formatRupiah(barang.harga)}</td>
                <td>{barang.stok}</td>
                <td>{barang.karyawan?.nama || '-'}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(barang)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(barang.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Barang' : 'Add Barang'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Nama Barang</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kode Barang</Form.Label>
              <Form.Control
                type="text"
                name="kode"
                value={formData.kode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type="number"
                name="stok"
                value={formData.stok}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Penanggung Jawab (Karyawan)</Form.Label>
              <Form.Select
                name="karyawanId"
                value={formData.karyawanId}
                onChange={handleChange}
                required
              >
                <option value="">Select Karyawan</option>
                {karyawans.map((karyawan) => (
                  <option key={karyawan.id} value={karyawan.id}>
                    {karyawan.nama} - {karyawan.jabatan}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Barang;