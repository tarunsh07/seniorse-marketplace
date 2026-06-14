<div align="center">
  <img src="public/assets/favicon.webp" alt="SeniorSe Logo" height="80">
  <h1>SeniorSe - Campus Marketplace for Students</h1>
  <p><strong>A full-stack web application where college students can buy, sell, and exchange pre-owned essentials within their campus network.</strong></p>

  <p>
    <a href="https://seniorse-marketplace.onrender.com/"><img src="https://img.shields.io/badge/Live_Demo-Render-46E3B7?style=for-the-badge" alt="Live Demo"></a>
    <img src="https://img.shields.io/badge/Node.js-v24.12.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/Express-v5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
    <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
    <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  </p>

  <p>
    <a href="https://seniorse-marketplace.onrender.com/">View Live Site</a>
    &nbsp;&middot;&nbsp;
    <a href="#getting-started">Getting Started</a>
    &nbsp;&middot;&nbsp;
    <a href="#api-routes">API Routes</a>
  </p>
</div>

---

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [API Routes](#api-routes)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Author](#author)

---

## About the Project

**SeniorSe** (Senior + se, meaning "from seniors" in Hindi) is a peer-to-peer campus marketplace built to solve a real problem: students waste money buying brand-new items every semester when seniors have perfectly good ones gathering dust.

This platform provides a trusted, students-only environment where users can list items for sale, rent, or even give them away for free — from calculators and textbooks to lab coats and electronics. To ensure authenticity, registration is strictly restricted to active students using a 6-digit OTP verification sent exclusively to their official college email addresses (e.g., `@nsut.ac.in`).

**Live Demo:** [https://seniorse-marketplace.onrender.com/](https://seniorse-marketplace.onrender.com/)

---

## Key Features

| Feature | Description |
|---|---|
| **Student-Only Verification** | Strict platform access using Brevo API to send 6-digit OTPs exclusively to official college email addresses (e.g., `@nsut.ac.in`) |
| **User Authentication** | Secure signup/login with Passport.js using salted password hashing via `passport-local-mongoose` |
| **Full CRUD Operations** | Create, Read, Update, and Delete listings with image uploads |
| **Cloud Image Storage** | All listing images are uploaded to and served from Cloudinary CDN |
| **Category Filtering** | Filter listings by category (Calculator, Books, Notes, Electronics, Apparel, Others) via navbar icons |
| **Full-Text Search** | Search listings dynamically by title or description using case-insensitive MongoDB Regex matching |
| **Listing Types** | Support for three listing types — *For Sale*, *For Rent (Per Day)*, and *Free* |
| **Availability Status** | Owners can toggle availability; unavailable items are visually greyed out with a "Not Available" overlay |
| **Review and Rating System** | Logged-in users can leave reviews with an interactive animated emoji-based rating picker (1-5 scale) |
| **Authorization Guards** | Only listing owners can edit/delete their listings; only review authors can delete their reviews |
| **Server-Side Validation** | Joi schema validation on both listings and reviews to prevent malformed data |
| **Rate Limiting** | `express-rate-limit` middleware on authentication routes to prevent brute-force and spam attacks |
| **Contact Integration** | Sellers provide email (mailto link) and optional WhatsApp number on each listing |
| **Flash Messages** | User-friendly success/error notifications using `connect-flash` |
| **Post-Login Redirect** | Users are redirected back to the page they originally intended to visit after login |
| **Persistent Sessions** | Sessions stored in MongoDB Atlas via `connect-mongo` to survive server restarts |
| **Responsive Design** | Mobile-friendly layouts with Bootstrap 5.3, custom CSS, and Google Material Symbols |
| **Custom Error Handling** | Centralized error handler with a dedicated `ExpressError` class and a custom error page |
| **Legal Pages** | Privacy Policy and Terms and Conditions pages included |

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** (v24) | JavaScript runtime |
| **Express.js** (v5) | Web application framework |
| **Mongoose** (v9) | MongoDB ODM for data modeling |
| **Passport.js** | Authentication middleware |
| **Brevo API** | Sending OTP emails via HTTP to bypass cloud SMTP restrictions |
| **Joi** | Request payload validation |
| **Express Rate Limit**| API rate limiting to prevent brute-force attacks |
| **Multer** | Multipart form-data / file upload handling |

### Frontend
| Technology | Purpose |
|---|---|
| **EJS** + **ejs-mate** | Server-side templating with layout support |
| **Bootstrap 5.3** | Responsive UI components and grid system |
| **Font Awesome 7** | Icon library |
| **Google Material Symbols** | Category navigation icons |
| **Plus Jakarta Sans** | Custom Google Font for modern typography |

### Cloud and Infrastructure
| Technology | Purpose |
|---|---|
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Cloudinary** | Image upload, storage, and CDN delivery |
| **Render** | Cloud hosting and CI/CD deployment |

---

## Architecture

The application follows the **MVC (Model-View-Controller)** design pattern with a clear separation of concerns:

```
Client Request
      |
      v
+-----------+     +---------------+     +--------------+
|  Routes   |---->|  Middleware    |---->| Controllers  |
|           |     | (Auth, Joi)   |     |              |
+-----------+     +---------------+     +------+-------+
                                               |
                                       +-------v-------+
                                       |    Models      |
                                       |  (Mongoose)    |
                                       +-------+-------+
                                               |
                                       +-------v-------+
                                       |  MongoDB Atlas |
                                       +---------------+
```

- **Routes** — Define RESTful endpoints and chain appropriate middleware
- **Middleware** — Handles authentication (`isLoggedIn`), authorization (`isOwner`, `isReviewAuthor`), and validation (`validateListing`, `validateReview`)
- **Controllers** — Contain the business logic for each route handler
- **Models** — Define Mongoose schemas with relationships (User -> Listing -> Review)

---

## Project Structure

```
seniorse-marketplace/
|-- app.js                    # Application entry point and Express configuration
|-- cloudConfig.js            # Cloudinary + Multer storage configuration
|-- middleware.js              # Custom middleware (auth, authorization, validation)
|-- schema.js                 # Joi validation schemas
|-- package.json              # Dependencies and scripts
|-- .env                      # Environment variables (not committed)
|-- .gitignore                # Git ignore rules
|-- .npmrc                    # NPM configuration
|
|-- models/
|   |-- listing.js            # Listing schema (title, price, category, image, reviews, owner)
|   |-- review.js             # Review schema (rating, comment, author)
|   +-- user.js               # User schema (email, username, password via passport)
|
|-- controllers/
|   |-- listings.js           # CRUD logic for listings
|   |-- reviews.js            # Create/Delete logic for reviews
|   +-- users.js              # Signup, Login, Logout logic
|
|-- routes/
|   |-- listing.js            # RESTful routes for /listings
|   |-- review.js             # Routes for /listings/:id/reviews
|   +-- user.js               # Routes for /signup, /login, /logout
|
|-- utils/
|   |-- ExpressError.js       # Custom error class with HTTP status codes
|   +-- wrapAsync.js          # Async error wrapper to eliminate try-catch blocks
|
|-- views/
|   |-- layouts/
|   |   +-- boilerplate.ejs   # Master layout template
|   |-- includes/
|   |   |-- navbar.ejs        # Navigation bar with category filters
|   |   |-- footer.ejs        # Site footer with social links
|   |   +-- flash.ejs         # Flash message alerts
|   |-- listings/
|   |   |-- index.ejs         # All listings grid view
|   |   |-- show.ejs          # Individual listing detail page
|   |   |-- new.ejs           # Create listing form
|   |   +-- edit.ejs          # Edit listing form
|   |-- users/
|   |   |-- signup.ejs        # Registration form
|   |   +-- login.ejs         # Login form
|   |-- pages/
|   |   |-- privacy.ejs       # Privacy Policy
|   |   +-- terms.ejs         # Terms and Conditions
|   |-- home.ejs              # Landing page with hero video
|   +-- error.ejs             # Custom error page
|
|-- public/
|   |-- css/
|   |   |-- style.css         # Global styles, layout, components
|   |   +-- rating.css        # Animated emoji rating picker styles
|   |-- js/
|   |   |-- script.js         # Bootstrap form validation
|   |   +-- rating.js         # Interactive rating picker logic
|   +-- assets/               # Static assets (logos, backgrounds, videos)
|
+-- init/
    |-- data.js               # Seed data template
    +-- index.js              # Database seeding script
```

---

## Data Models

### User
```javascript
{
  email:    { type: String, required: true },
  username: String,   // Managed by passport-local-mongoose
  password: String    // Salted + hashed by passport-local-mongoose
}
```

### Listing
```javascript
{
  title:       { type: String, required: true },
  description: String,
  image:       { filename: String, url: String },
  price:       Number,
  category:    { type: String, enum: ["Calculator", "Books", "Notes", "Electronics", "Apparel", "Others"] },
  listingType: { type: String, enum: ["For Sale", "For Rent (Per Day)", "Free"] },
  isAvailable: { type: Boolean, default: true },
  contact:     { email: String, whatsapp: String },
  reviews:     [{ type: ObjectId, ref: "Review" }],
  owner:       { type: ObjectId, ref: "User" }
}
```
> **Cascade Delete:** A Mongoose `post("findOneAndDelete")` hook automatically deletes all associated reviews when a listing is removed.

### Review
```javascript
{
  comment:   String,
  rating:    { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now() },
  author:    { type: ObjectId, ref: "User" }
}
```

---

## API Routes

### Listings
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/listings` | View all listings (with optional `?category=` filter) | No |
| `GET` | `/listings/new` | Render create listing form | Yes |
| `POST` | `/listings` | Create a new listing | Yes |
| `GET` | `/listings/:id` | View a specific listing | No |
| `GET` | `/listings/:id/edit` | Render edit form | Yes (Owner) |
| `PUT` | `/listings/:id` | Update a listing | Yes (Owner) |
| `DELETE` | `/listings/:id` | Delete a listing | Yes (Owner) |

### Reviews
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/listings/:id/reviews` | Add a review to a listing | Yes |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete a review | Yes (Author) |

### Users
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/signup` | Render signup form |
| `POST` | `/signup` | Register a new user |
| `GET` | `/login` | Render login form |
| `POST` | `/login` | Authenticate user |
| `GET` | `/logout` | Log out current user |

### Pages
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Landing page |
| `GET` | `/privacy` | Privacy Policy |
| `GET` | `/terms` | Terms and Conditions |

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local instance or Atlas account)
- **Cloudinary** account (free tier is sufficient)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tarunsh07/seniorse-marketplace.git
   cd seniorse-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) below).

4. **Start the development server**
   ```bash
   node app.js
   ```

5. **Open in browser**
   ```
   http://localhost:8080
   ```

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
BREVO_API_KEY=your_brevo_api_key
```

> **Important:** Never commit the `.env` file to version control. It is already included in `.gitignore`.

---

## Deployment

This application is deployed on **[Render](https://render.com)** with automatic CI/CD.

**Live URL:** [https://seniorse-marketplace.onrender.com/](https://seniorse-marketplace.onrender.com/)

The deployment workflow is as follows:

1. Push changes to the `main` branch on GitHub.
2. Render automatically detects the push, rebuilds, and redeploys the application.
3. Environment variables are configured securely in the Render dashboard.

**Build Command:** `npm install`
**Start Command:** `node app.js`

---

## Screenshots

<img width="1895" height="931" alt="Screenshot 2026-06-14 143752" src="https://github.com/user-attachments/assets/92213680-bf63-47f1-afd5-cd747d051451" />
<img width="1891" height="932" alt="Screenshot 2026-06-14 143835" src="https://github.com/user-attachments/assets/3f93abec-c36f-4fbf-8bbc-2844ac50aed0" />
<img width="1920" height="934" alt="Screenshot (718)" src="https://github.com/user-attachments/assets/121c2f91-2716-4930-9b9a-df59fff154e2" />
<img width="1918" height="928" alt="Screenshot 2026-06-14 144105" src="https://github.com/user-attachments/assets/68346bb9-64ca-4237-b8f5-eca1e43671d6" />

<!-- 
Uncomment and add screenshots when available:
| Home Page | Listings Page |
|---|---|
| ![Home](screenshots/home.png) | ![Listings](screenshots/listings.png) |

| Listing Detail | Create Listing |
|---|---|
| ![Detail](screenshots/show.png) | ![Create](screenshots/new.png) |
-->

---

## Future Enhancements

- [ ] Real-time chat between buyers and sellers using WebSockets (Socket.io)
- [x] Full-text search with fuzzy matching across listings
- [ ] Advanced filtering (price range, availability, listing type)
- [ ] User profile pages with listing history
- [ ] Image carousel for multi-image listings
- [ ] Email notifications on new reviews
- [ ] Wishlist / Save for Later functionality
- [ ] Admin dashboard for content moderation

---

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## Author

**Tarun Sharma**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tarunsh07/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tarunsh07)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:seniorse.help@gmail.com)

---

<div align="center">
  <p>If you found this project helpful, please consider giving it a star.</p>
</div>
