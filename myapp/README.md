# BUILDFIT - Full Stack Fitness Membership Application

A complete full-stack web application for fitness gym membership management with React frontend and Express.js backend.

## 🚀 Features

### Frontend (React)
- **Beautiful Homepage** with motivational content and flip card animations
- **Comprehensive Membership Form** with BMI auto-calculation
- **Data Dashboard** with statistics and member management
- **Responsive Design** for mobile and desktop
- **Material-UI Components** for professional UI
- **CSV Export** functionality

### Backend (Express.js + SQLite)
- **RESTful API** for member management
- **SQLite Database** for data persistence
- **CRUD Operations** (Create, Read, Update, Delete)
- **Statistics API** for dashboard analytics
- **Data Validation** and error handling
- **CORS Support** for cross-origin requests

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🛠️ Installation & Setup

1. **Clone/Download the project**
   ```bash
   cd myapp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Backend Server**
   ```bash
   npm run server
   ```
   Server will run on: http://localhost:5000

4. **Start Frontend (New Terminal)**
   ```bash
   npm start
   ```
   Frontend will run on: http://localhost:8080

5. **Or Run Both Together**
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Statistics
- `GET /api/stats` - Get dashboard statistics
- `GET /api/health` - Health check

## 📊 Database Schema

### Members Table
```sql
CREATE TABLE members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullName TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  height REAL NOT NULL,
  weight REAL NOT NULL,
  bmi REAL NOT NULL,
  bmiCategory TEXT NOT NULL,
  goal TEXT NOT NULL,
  experience TEXT NOT NULL,
  preferredTime TEXT,
  medicalConditions TEXT,
  address TEXT,
  emergencyContact TEXT NOT NULL,
  membershipPlan TEXT NOT NULL,
  submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Usage

### For Users
1. **Visit Homepage** - View motivational content and gym information
2. **Fill Membership Form** - Complete detailed membership application
3. **BMI Calculation** - Automatic BMI calculation and categorization
4. **Form Submission** - Data saved to backend database

### For Admins
1. **View Data Dashboard** - See all member submissions
2. **Member Statistics** - View analytics and insights
3. **Export Data** - Download member data as CSV
4. **Manage Members** - View details, edit, or delete members

## 🔧 Project Structure

```
myapp/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── Membership.jsx
│   │   ├── MembershipData.jsx
│   │   └── ...
│   ├── pages/
│   │   └── Home.jsx
│   ├── services/
│   │   └── membershipAPI.js
│   └── App.jsx
├── server/
│   ├── server.js
│   └── membership.db (auto-generated)
├── public/
└── package.json
```

## 🎨 Key Features Explained

### BMI Auto-Calculation
- Automatically calculates BMI when height and weight are entered
- Categorizes BMI (Underweight, Normal, Overweight, Obese)
- Color-coded display in dashboard

### Data Export
- Export all member data as CSV
- Excel-compatible format
- Includes all member information and timestamps

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

### Error Handling
- Frontend validation
- Backend error responses
- User-friendly error messages
- Loading states and notifications

## 🚀 Deployment

### Frontend
- Build: `npm run build`
- Deploy to Netlify, Vercel, or any static hosting

### Backend
- Deploy to Heroku, Railway, or any Node.js hosting
- Update API_BASE_URL in frontend for production

## 🔒 Security Features

- Input validation
- SQL injection prevention
- CORS configuration
- Error handling without sensitive data exposure

## 📈 Future Enhancements

- User authentication and authorization
- Email notifications
- Payment integration
- Advanced analytics
- Member portal
- Trainer management
- Class scheduling

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for BUILDFIT Gym Management**
