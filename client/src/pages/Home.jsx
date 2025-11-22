import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">Selamat Datang Di Web Inventaris</h1>
            <p className="lead text-muted">
                Aplikasi sederhana untuk mengelola data karyawan dan barang
            </p>
          </div>

          {user ? (
            <Row className="g-4">
              <Col md={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-3">
                      <i className="bi bi-people-fill me-2"></i>
                        Manajemen Karyawan
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                        Kelola data karyawan termasuk nama, posisi, departemen,
                    </Card.Text>
                    <Link to="/karyawan">
                      <Button variant="primary" className="w-100">
                        Manage Karyawan
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-3">
                      <i className="bi bi-box-seam me-2"></i>
                        Manajemen Barang
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                        Kelola data barang termasuk nama, kategori, stok, dan lokasi.
                    </Card.Text>
                    <Link to="/barang">
                      <Button variant="primary" className="w-100">
                        Manage Barang
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col md={6}>
                <Card className="text-center shadow-sm">
                  <Card.Body className="p-5">
                    <Card.Title className="mb-3">Get Started</Card.Title>
                    <Card.Text className="mb-4">
                        Silahkan Login atau Register untuk mengelola inventaris Anda.
                    </Card.Text>
                    <div className="d-grid gap-2">
                      <Link to="/login">
                        <Button variant="primary" size="lg" className="w-100">
                          Login
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button variant="outline-primary" size="lg" className="w-100">
                          Register
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;