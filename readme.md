# Fullstack CRUD Application

Aplikasi CRUD (Create, Read, Update, Delete) fullstack dengan fitur autentikasi menggunakan Express.js, Sequelize, MySQL, React (Vite), dan Bootstrap.

## 📋 Deskripsi

Aplikasi ini adalah sistem manajemen data karyawan dan barang yang saling berelasi. Setiap barang memiliki penanggung jawab (karyawan), dan setiap karyawan dapat menangani banyak barang.

## ✨ Fitur Utama

### Backend
- RESTful API dengan Express.js
- ORM menggunakan Sequelize
- Database MySQL
- Autentikasi dengan JWT (JSON Web Token)
- Password hashing dengan bcrypt
- Relasi One-to-Many antara Karyawan dan Barang
- CORS enabled untuk komunikasi frontend-backend

### Frontend
- React dengan Vite (Fast refresh & build)
- Bootstrap UI untuk tampilan responsif
- React Router untuk navigasi
- Context API untuk state management
- Protected routes (hanya bisa diakses setelah login)
- Form validation
- Real-time error handling
- Loading states dan notifications

## 🛠️ Teknologi yang Digunakan

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT (jsonwebtoken)
- bcryptjs
- CORS

### Frontend
- React 18
- Vite
- React Router DOM
- Bootstrap 5
- React Bootstrap
- Axios

## 📁 Struktur Project
```
fullstack-crud-app/
├── server/                      # Backend
│   ├── config/
│   │   └── config.json         # Konfigurasi database
│   ├── controllers/
│   │   ├── authController.js   # Controller autentikasi
│   │   ├── karyawanController.js
│   │   └── barangController.js
│   ├── middleware/
│   │   └── auth.js             # Middleware JWT
│   ├── migrations/             # Database migrations
│   ├── models/                 # Sequelize models
│   │   ├── user.js
│   │   ├── karyawan.js
│   │   └── barang.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── karyawan.js
│   │   └── barang.js
│   ├── seeders/
│   ├── server.js               # Entry point backend
│   └── package.json
│
└── client/                      # Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Karyawan.jsx
    │   │   └── Barang.jsx
    │   ├── services/
    │   │   └── api.js          # Axios configuration
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 Cara Instalasi

### Prasyarat
- Node.js (v14 atau lebih baru)
- MySQL Server
- npm atau yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd fullstack-crud-app
```

### 2. Setup Backend
```bash
# Masuk ke folder server
cd server

# Install dependencies
npm install

# Install Sequelize CLI global
npm install -g sequelize-cli

# Buat database MySQL
mysql -u root -p
CREATE DATABASE fullstack_crud_db;
exit;

# Edit config/config.json sesuai kredensial MySQL Anda
# Jalankan migration
sequelize db:migrate

# Jalankan server
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

### 3. Setup Frontend
```bash
# Buka terminal baru, masuk ke folder client
cd client

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## 📝 Konfigurasi

### Backend Configuration

Edit file `server/config/config.json`:
```json
{
  "development": {
    "username": "root",
    "password": "your_mysql_password",
    "database": "fullstack_crud_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Frontend Configuration

Edit file `client/src/services/api.js` jika backend berjalan di port berbeda:
```javascript
const API_URL = 'http://localhost:5000/api';
```

## 🎯 Cara Menggunakan

### 1. Register Akun Baru
- Buka `http://localhost:5173`
- Klik menu "Register"
- Isi form registrasi (username, email, password)
- Klik tombol "Register"
- Anda akan otomatis login dan masuk ke halaman Home

### 2. Login
- Klik menu "Login"
- Masukkan email dan password
- Klik tombol "Login"

### 3. Manajemen Karyawan
- Klik menu "Karyawan"
- **Tambah:** Klik tombol "Add Karyawan", isi form, dan save
- **Edit:** Klik tombol "Edit" pada baris data, ubah data, dan save
- **Delete:** Klik tombol "Delete" pada baris data, konfirmasi penghapusan

### 4. Manajemen Barang
- Klik menu "Barang"
- **Tambah:** Klik tombol "Add Barang", isi form termasuk memilih penanggung jawab (karyawan), dan save
- **Edit:** Klik tombol "Edit" pada baris data, ubah data, dan save
- **Delete:** Klik tombol "Delete" pada baris data, konfirmasi penghapusan

### 5. Logout
- Klik tombol "Logout" di navbar

## 📊 Database Schema

### Tabel Users
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary Key, Auto Increment |
| username | STRING | Unique, Not Null |
| email | STRING | Unique, Not Null |
| password | STRING | Hashed, Not Null |
| createdAt | DATE | Timestamp |
| updatedAt | DATE | Timestamp |

### Tabel Karyawans
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary Key, Auto Increment |
| nama | STRING | Not Null |
| jabatan | STRING | |
| email | STRING | |
| telepon | STRING | |
| createdAt | DATE | Timestamp |
| updatedAt | DATE | Timestamp |

### Tabel Barangs
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary Key, Auto Increment |
| nama | STRING | Not Null |
| kode | STRING | Unique |
| kategori | STRING | |
| harga | INTEGER | |
| stok | INTEGER | |
| karyawanId | INTEGER | Foreign Key -> Karyawans.id |
| createdAt | DATE | Timestamp |
| updatedAt | DATE | Timestamp |

**Relasi:** Karyawan (1) -> Barang (N)

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/register    # Register user baru
POST   /api/auth/login       # Login user
GET    /api/auth/profile     # Get user profile (protected)
```

### Karyawan
```
GET    /api/karyawan         # Get semua karyawan (protected)
GET    /api/karyawan/:id     # Get karyawan by ID (protected)
POST   /api/karyawan         # Create karyawan baru (protected)
PUT    /api/karyawan/:id     # Update karyawan (protected)
DELETE /api/karyawan/:id     # Delete karyawan (protected)
```

### Barang
```
GET    /api/barang           # Get semua barang (protected)
GET    /api/barang/:id       # Get barang by ID (protected)
POST   /api/barang           # Create barang baru (protected)
PUT    /api/barang/:id       # Update barang (protected)
DELETE /api/barang/:id       # Delete barang (protected)
```

## 🔐 Authentication Flow

1. User register/login
2. Backend generate JWT token
3. Token disimpan di localStorage
4. Setiap request ke protected endpoint, token dikirim di header
5. Backend verify token dengan middleware
6. Jika valid, request diproses
7. Jika tidak valid, return 401 Unauthorized

## 🎨 Contoh Request & Response

### Register
**Request:**
```json
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Create Karyawan
**Request:**
```json
POST /api/karyawan
Headers: Authorization: Bearer <token>
{
  "nama": "Budi Santoso",
  "jabatan": "Manager",
  "email": "budi@company.com",
  "telepon": "081234567890"
}
```

**Response:**
```json
{
  "message": "Karyawan created successfully",
  "karyawan": {
    "id": 1,
    "nama": "Budi Santoso",
    "jabatan": "Manager",
    "email": "budi@company.com",
    "telepon": "081234567890",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Create Barang
**Request:**
```json
POST /api/barang
Headers: Authorization: Bearer <token>
{
  "nama": "Laptop Dell XPS 13",
  "kode": "LPT-001",
  "kategori": "Elektronik",
  "harga": 15000000,
  "stok": 5,
  "karyawanId": 1
}
```

**Response:**
```json
{
  "message": "Barang created successfully",
  "barang": {
    "id": 1,
    "nama": "Laptop Dell XPS 13",
    "kode": "LPT-001",
    "kategori": "Elektronik",
    "harga": 15000000,
    "stok": 5,
    "karyawanId": 1,
    "karyawan": {
      "id": 1,
      "nama": "Budi Santoso",
      "jabatan": "Manager"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🐛 Troubleshooting

### Backend tidak bisa connect ke database
**Solusi:** 
- Pastikan MySQL server sudah berjalan
- Periksa kredensial di `config/config.json`
- Pastikan database sudah dibuat

### CORS Error
**Solusi:** 
- Pastikan `cors` sudah diinstall di backend
- Periksa konfigurasi cors di `server.js`

### Token Invalid / Unauthorized
**Solusi:** 
- Coba logout dan login kembali
- Clear localStorage browser
- Periksa JWT secret di backend

### Data tidak muncul
**Solusi:** 
- Buka browser console (F12) untuk cek error
- Periksa Network tab untuk response API
- Pastikan sudah login dan token valid

### Port sudah digunakan
**Solusi:** 
- Backend: Ubah PORT di `server.js`
- Frontend: Ubah port di `vite.config.js`

### Error "SequelizeConnectionError"
**Solusi:**
```bash
# Pastikan MySQL service berjalan
# Windows
net start MySQL80

# Linux/Mac
sudo service mysql start
```

## 📦 Build untuk Production

### Backend
```bash
cd server
npm start
```

### Frontend
```bash
cd client
npm run build
```

Output akan ada di folder `client/dist/`. Deploy folder ini ke hosting static seperti Vercel, Netlify, atau lainnya.

## 🔧 Development

### Menambah Field Baru

1. **Update Model & Migration:**
```bash
cd server
sequelize migration:create --name add-field-to-table
```

2. **Edit migration file** di folder `migrations/`

3. **Run migration:**
```bash
sequelize db:migrate
```

4. **Update Controller** di `controllers/`

5. **Update Frontend Form** di `pages/`

### Menambah Fitur Baru

1. Buat route baru di `server/routes/`
2. Buat controller baru di `server/controllers/`
3. Register route di `server.js`
4. Buat service function di `client/src/services/api.js`
5. Buat page/component di `client/src/pages/` atau `client/src/components/`

### Reset Database
```bash
cd server
sequelize db:migrate:undo:all
sequelize db:migrate
```

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [JWT Documentation](https://jwt.io/)

## 🎓 Learning Points

Project ini cocok untuk belajar:
- ✅ RESTful API design
- ✅ JWT Authentication
- ✅ ORM dengan Sequelize
- ✅ React Hooks (useState, useEffect, useContext)
- ✅ Context API untuk state management
- ✅ Protected routing
- ✅ Form handling dan validation
- ✅ Axios interceptors
- ✅ Bootstrap styling
- ✅ Vite development environment

## 🚀 Future Improvements

- [ ] Pagination untuk list data
- [ ] Search dan filter
- [ ] Export data ke Excel/PDF
- [ ] Upload foto karyawan
- [ ] Dashboard dengan statistik
- [ ] Role-based access control (Admin, User)
- [ ] Email verification
- [ ] Password reset
- [ ] Activity logs
- [ ] Dark mode
- [ ] Refresh token mechanism
- [ ] Input validation dengan Joi
- [ ] Unit testing
- [ ] API documentation dengan Swagger

## 💡 Tips

### Development Mode
```bash
# Backend dengan auto-restart
npm run dev

# Frontend dengan hot reload
npm run dev
```

### Check Server Status
```bash
# Backend
curl http://localhost:5000

# Response: {"message":"Welcome to CRUD API"}
```

### Clear All Data
```bash
# Reset database
cd server
sequelize db:migrate:undo:all
sequelize db:migrate
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name - [Your Email](mailto:your.email@example.com)

GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Bootstrap team untuk UI framework yang awesome
- React team untuk library yang powerful
- Sequelize team untuk ORM yang mudah digunakan
- Express.js team untuk framework backend yang simple

---

**Made with ❤️ by [Yogma]**

**Happy Coding! 🎉**