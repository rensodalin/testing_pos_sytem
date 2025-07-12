# Coffee POS Backend API

A comprehensive backend API for a Coffee Point of Sale (POS) system built with Node.js, Express, and Sequelize ORM.

## 🚀 Features

- **User Management**: Staff and customer authentication with role-based access
- **Menu Management**: Categories and menu items with full CRUD operations
- **Order Management**: Complete order lifecycle with items, status tracking, and payments
- **Table Management**: Dine-in table booking and status management
- **Payment Processing**: Support for cash and online payments
- **Real-time Updates**: Order status and table status updates
- **Database Seeding**: Pre-populated with sample data

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: MySQL (configurable to SQLite for development)
- **Authentication**: JWT with bcrypt
- **Validation**: Built-in Express validation
- **CORS**: Cross-origin resource sharing enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (or SQLite for development)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   cd pos-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=coffee_pos_db
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Database Setup**
   - Create a MySQL database named `coffee_pos_db`
   - Or use SQLite by setting `dialect: "sqlite"` in `config/db.config.js`

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🗄️ Database Schema

### Tables

1. **Users** - Staff and customer accounts
2. **Categories** - Menu categories (Hot Drinks, Cold Drinks, etc.)
3. **MenuItems** - Individual menu items with prices
4. **Tables** - Restaurant tables for dine-in orders
5. **Orders** - Order records with customer and payment info
6. **OrderItems** - Individual items within orders
7. **Payments** - Payment records and transaction details

### Relationships

- Users can have multiple orders (as customer or staff)
- Categories have multiple menu items
- Orders belong to tables and users
- Orders have multiple order items
- Orders have one payment record

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Staff login
- `POST /api/auth/register` - Staff registration
- `POST /api/auth/customer/login` - Customer login
- `POST /api/auth/customer/register` - Customer registration

### Menu Management
- `GET /api/menu/categories` - Get all categories with menu items
- `POST /api/menu/categories` - Create new category
- `PUT /api/menu/categories/:id` - Update category
- `DELETE /api/menu/categories/:id` - Delete category
- `GET /api/menu/items` - Get all menu items
- `GET /api/menu/items/popular` - Get popular menu items
- `POST /api/menu/items` - Create new menu item
- `PUT /api/menu/items/:id` - Update menu item
- `DELETE /api/menu/items/:id` - Delete menu item

### Order Management
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders with filters
- `GET /api/orders/recent` - Get recent orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/payment` - Update payment status
- `DELETE /api/orders/:id` - Delete order

### Table Management
- `GET /api/tables` - Get all tables
- `POST /api/tables` - Create new table
- `PUT /api/tables/:id` - Update table status
- `DELETE /api/tables/:id` - Delete table

## 📝 API Usage Examples

### Create an Order
```javascript
const orderData = {
  customerName: "John Doe",
  customerPhone: "1234567890",
  tableId: 1,
  tableNo: "1",
  guests: 2,
  orderType: "dine-in",
  items: [
    {
      menuItemId: 1,
      quantity: 2,
      notes: "Extra hot"
    },
    {
      menuItemId: 3,
      quantity: 1
    }
  ],
  paymentMethod: "cash",
  paymentStatus: "paid"
};

fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(orderData)
});
```

### Get Menu with Categories
```javascript
fetch('/api/menu/categories')
  .then(response => response.json())
  .then(data => {
    console.log('Menu categories:', data.data);
  });
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Default Users (Created by Seeder)

- **Admin**: admin@cafio.com / admin123
- **Staff**: staff@cafio.com / admin123

## 🌱 Database Seeding

The application automatically seeds the database with:
- 7 menu categories
- 35+ menu items
- 15 tables
- Default admin and staff users

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name
JWT_SECRET=your_secure_jwt_secret
```

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server.js --name "coffee-pos-backend"
pm2 save
pm2 startup
```

## 📊 Database Migrations

To update the database schema:
```bash
# Update schema without losing data
npm run migrate:alter

# Reset database (WARNING: This will delete all data)
npm run migrate:force
```

## 🔍 Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## 📈 Monitoring

- Health check endpoint: `GET /`
- Server logs include timestamps and emojis for easy reading
- Database connection status logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Check the API documentation
- Review the error logs
- Ensure database connection is working
- Verify environment variables are set correctly 