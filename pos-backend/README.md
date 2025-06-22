# POS Backend - Sequelize Version

This is the backend for the Restaurant POS System using Sequelize ORM with MySQL database.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
Make sure you have MySQL installed and running on your system.

### 3. Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=pos_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

### 4. Database Creation
Create a MySQL database named `pos_db` (or whatever you specified in DB_NAME).

### 5. Run the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Database Schema

The application will automatically create the following tables:
- `Users` - User management
- `Tables` - Restaurant table management
- `Orders` - Order management
- `Payments` - Payment records

## API Endpoints

- `/api/user` - User authentication and management
- `/api/table` - Table management
- `/api/order` - Order management
- `/api/payment` - Payment processing

## Key Changes from MongoDB Version

1. **Database**: Changed from MongoDB to MySQL with Sequelize ORM
2. **Models**: Converted Mongoose schemas to Sequelize models
3. **Controllers**: Updated to use Sequelize query methods
4. **Relationships**: Added proper foreign key relationships between tables
5. **Validation**: Updated validation to use Sequelize validators 