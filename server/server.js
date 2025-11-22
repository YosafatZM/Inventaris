const express = require('express');
const cors = require('cors');
const db = require('./models');

// Import routes
const authRoutes = require('./routes/auth');
const karyawanRoutes = require('./routes/karyawan');
const barangRoutes = require('./routes/barang');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/karyawan', karyawanRoutes);
app.use('/api/barang', barangRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CRUD API' });
});

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});