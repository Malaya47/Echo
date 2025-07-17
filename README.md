# Echo 🌟

**A Real-Time Developer Networking Platform**

Echo is a modern web application that connects developers worldwide through real-time messaging and networking features. Built with the MERN stack and Socket.IO, it enables seamless communication and collaboration among tech professionals.

## 🚀 Features

### Core Functionality
- **Real-time Messaging**: Instant bi-directional communication using Socket.IO
- **Developer Profiles**: Showcase skills, experience, and projects
- **Connection Requests**: Send and manage connection requests with fellow developers
- **User Discovery**: Find and connect with developers based on skills and interests
- **Profile Management**: Update personal information, skills, and status
- **Secure Authentication**: JWT-based authentication with password hashing

### User Experience
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Status**: See when users are online/offline
- **Message History**: Persistent chat history for all conversations
- **Profile Photos**: Custom profile pictures with default avatars
- **Skills Showcase**: Display technical skills and expertise

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface and component management
- **CSS3** - Styling using Tailwind CSS and daisy UI and responsive design
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP requests and API integration

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing and security

### Additional Tools
- **Validator** - Input validation and sanitization
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Malaya47/Echo.git
   cd Echo/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/echo
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 🔐 Test User Credentials

Use these pre-seeded accounts to test the application:

| Email | Password | Role |
|-------|----------|------|
| `alex.smith@example.com` | `TestPass123!` | Frontend Developer |
| `sarah.johnson@example.com` | `TestPass123!` | Backend Developer |
| `mike.williams@example.com` | `TestPass123!` | Full Stack Developer |
| `emma.brown@example.com` | `TestPass123!` | DevOps Engineer |
| `david.jones@example.com` | `TestPass123!` | Mobile Developer |

*Note: All test users share the same password for easy testing*

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Profile Management
- `GET /api/profile/view` - Get user profile
- `PATCH /api/profile/edit` - Update user profile
- `PATCH /api/profile/password` - Change password

### Connection Requests
- `POST /api/request/send/:status/:toUserId` - Send connection request
- `POST /api/request/review/:status/:requestId` - Review connection request
- `GET /api/request/received` - Get received requests
- `GET /api/request/sent` - Get sent requests

### User Discovery
- `GET /api/user/feed` - Get user feed
- `GET /api/user/connections` - Get user connections

### Real-time Features
- `Socket.IO` connection for real-time messaging
- Live user status updates
- Instant message delivery

## 🎯 Key Features in Detail

### Real-time Messaging
- Instant message delivery using Socket.IO
- Message history persistence
- Online/offline status indicators
- Typing indicators (if implemented)

### Developer Networking
- Skill-based user matching
- Connection request system
- Profile showcasing
- Professional networking features

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Protected routes and middleware


**Malaya Tiwari**
- GitHub: [@Malaya47](https://github.com/Malaya47)
- LinkedIn: [Connect with me](https://linkedin.com/in/malaya-tiwari)

