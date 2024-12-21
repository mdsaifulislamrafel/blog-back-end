# Blogging Platform Backend

This project is a backend system for a blogging platform built using **TypeScript**, **Node.js**, **Express.js**, and **MongoDB**. The platform allows users to perform CRUD operations on blogs, with role-based access control for Admin and User roles.

---

## Features

### 1. User Roles
- **Admin**:
  - Can delete any blog.
  - Can block users.
  - Cannot update blogs.
- **User**:
  - Can register, log in, create, update, and delete their own blogs.
  - Cannot perform admin actions.

### 2. Authentication & Authorization
- Secure authentication using JWT.
- Role-based access control to differentiate between Admin and User actions.

### 3. Blog API
- Public API for reading blogs with:
  - **Search**: Search blogs by title or content.
  <!-- - **Sort**: Sort blogs by fields like `createdAt` or `title`. -->
  <!-- - **Filter**: Filter blogs by author ID. -->

---

## Models

### User Model
```typescript
{
  name: string;
  email: string;
  password: string;
  role: "admin" | "user"; // Default: "user"
  isBlocked: boolean; // Default: false
  createdAt: Date;
  updatedAt: Date;
}
```

### Blog Model
```typescript
{
  title: string;
  content: string;
  author: ObjectId; // Reference to User model
  isPublished: boolean; // Default: true
  createdAt: Date;
  updatedAt: Date;
}
```

---

## API Endpoints

### 1. Authentication

#### 1.1 Register User
**POST** `/api/auth/register`

- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "statusCode": 201,
    "data": {
      "_id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

#### 1.2 Login User
**POST** `/api/auth/login`

- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "statusCode": 200,
    "data": {
      "token": "string"
    }
  }
  ```

### 2. Blog Management

#### 2.1 Create Blog
**POST** `/api/blogs`

- **Request Header:**
  ```
  Authorization: Bearer <token>
  ```
- **Request Body:**
  ```json
  {
    "title": "My First Blog",
    "content": "This is the content of my blog."
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Blog created successfully",
    "statusCode": 201,
    "data": {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  }
  ```

#### 2.2 Update Blog
**PATCH** `/api/blogs/:id`

- **Request Header:**
  ```
  Authorization: Bearer <token>
  ```
- **Request Body:**
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated content."
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Blog updated successfully",
    "statusCode": 200,
    "data": {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  }
  ```

#### 2.3 Delete Blog
**DELETE** `/api/blogs/:id`

- **Request Header:**
  ```
  Authorization: Bearer <token>
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Blog deleted successfully",
    "statusCode": 200
  }
  ```

#### 2.4 Get All Blogs (Public)
**GET** `/api/blogs`

- **Query Parameters:**
  - `search`: Search blogs by title or content.
  - `sortBy`: Sort by fields like `createdAt` or `title`.
  - `sortOrder`: Sorting order (`asc` or `desc`).
  - `filter`: Filter by author ID.

- **Example Request:**
  ```
  /api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=authorId
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Blogs fetched successfully",
    "statusCode": 200,
    "data": [
      {
        "_id": "string",
        "title": "string",
        "content": "string",
        "author": { "details" }
      }
    ]
  }
  ```

### 3. Admin Actions

#### 3.1 Block User
**PATCH** `/api/admin/users/:userId/block`

- **Request Header:**
  ```
  Authorization: Bearer <admin_token>
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "User blocked successfully",
    "statusCode": 200
  }
  ```

#### 3.2 Delete Blog
**DELETE** `/api/admin/blogs/:id`

- **Request Header:**
  ```
  Authorization: Bearer <admin_token>
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Blog deleted successfully",
    "statusCode": 200
  }
  ```

---

## Getting Started

### Prerequisites
- **Node.js**
- **MongoDB**

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mdsaifulislamrafel/blog-back-end
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-platform-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Scripts
- `npm run dev`: Start the development server with hot-reloading.
- `npm run build`: Build the project for production.
- `npm start`: Start the production server.

---

## License
This project is licensed under the MIT License.
