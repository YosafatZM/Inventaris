import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { karyawanAPI } from '../services/api';

const Karyawan = () => {
  const [karyawans, setKaryawans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    jabatan: '',
    email: '',
    telepon: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchKaryawans();
  }, []);

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
    setFormData({ nama: '', jabatan: '', email: '', telepon: '' });
    setError('');
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (karyawan) => {
    setEditMode(true);
    setCurrentId(karyawan.id);
    setFormData({
      nama: karyawan.nama,
      jabatan: karyawan.jabatan,
      email: karyawan.email,
      telepon: karyawan.telepon
    });
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this karyawan?')) {
      try {
        await karyawanAPI.delete(id);
        setSuccess('Karyawan deleted successfully');
        fetchKaryawans();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete karyawan');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (editMode) {
        await karyawanAPI.update(currentId, formData);
        setSuccess('Karyawan updated successfully');
      } else {
        await karyawanAPI.create(formData);
        setSuccess('Karyawan created successfully');
      }
      fetchKaryawans();
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

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data Karyawan</h2>
        <Button variant="primary" onClick={handleShow}>
          Add Karyawan
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Email</th>
            <th>Telepon</th>
            <th>Jumlah Barang</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {karyawans.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No data available</td>
            </tr>
          ) : (
            karyawans.map((karyawan, index) => (
              <tr key={karyawan.id}>
                <td>{index + 1}</td>
                <td>{karyawan.nama}</td>
                <td>{karyawan.jabatan}</td>
                <td>{karyawan.email}</td>
                <td>{karyawan.telepon}</td>
                <td>{karyawan.barangs?.length || 0}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(karyawan)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(karyawan.id)}
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
          <Modal.Title>{editMode ? 'Edit Karyawan' : 'Add Karyawan'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Jabatan</Form.Label>
              <Form.Control
                type="text"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telepon</Form.Label>
              <Form.Control
                type="text"
                name="telepon"
                value={formData.telepon}
                onChange={handleChange}
              />
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

export default Karyawan;