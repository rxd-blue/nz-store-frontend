# NZ Store - API-Powered Product Filtering & Dynamic Cart

A responsive, intelligent storefront UI that displays products with filtering based on category & brand, and accepts external API requests to filter products and trigger a slide-in cart.

## 🎯 Features

- 🔍 Filter products via external API (`POST /api/filter`)
- 🛒 Display a smart cart via API with product names (`POST /api/cart/named`)
- ⏱️ Real-time sync with the backend (polling)
- ✨ Slide-in cart interface (CSS animation)
- 🛍️ Click products to add them to cart
- 💰 Cart total calculation
- ✅ No page reloads needed

## 🧱 Stack

| Component   | Technology              | Hosting Platform |
| ----------- | ----------------------- | ---------------- |
| Frontend UI | HTML + CSS + JavaScript | **Vercel**       |
| Backend API | Node.js (Express)       | **Glitch**       |

## 🚀 Deployment Guide

### Frontend (Vercel)

1. Create a Vercel account at https://vercel.com
2. Create a new GitHub repository and push this code to it
3. In Vercel, import your GitHub repo
4. Deploy your project

### Backend (Glitch)

1. Create a Glitch account at https://glitch.com
2. Create a new project
3. Upload `server.js` and `package.json` files to your project
4. Once deployed, Glitch will give you a live backend URL
5. **Important:** Update the `API_URL` variable in `script.js` with your Glitch URL

## 🖥️ Local Development

1. Clone the repository
2. Install backend dependencies:
   ```
   npm install
   ```
3. Start the backend:
   ```
   node server.js
   ```
4. Open `index.html` in a browser

## 🔌 API Documentation

### Product Filtering

```bash
# Filter products by category and brand
POST https://your-api.glitch.me/api/filter
Content-Type: application/json

{
  "category": "Phones",
  "brand": "Samsung"
}

# Filter products by category only
POST https://your-api.glitch.me/api/filter
Content-Type: application/json

{
  "category": "Phones"
}

# Reset filters
POST https://your-api.glitch.me/api/filter
Content-Type: application/json

{}
```

### Cart Management

```bash
# Add products to cart by name
POST https://your-api.glitch.me/api/cart/named
Content-Type: application/json

{
  "names": ["Samsung A23", "LG WashPro"]
}

# Get current cart
GET https://your-api.glitch.me/api/cart

# Reset cart
POST https://your-api.glitch.me/api/cart/reset
```

## 📱 UI Features

- Responsive grid layout
- Hover effects on products
- Animated slide-in cart
- Mobile-friendly design
- Auto-calculated cart totals

## 🛠️ Customization

- Update the product data in `server.js` to add more products
- Modify CSS variables in `style.css` to change the color scheme
- Add more filtering options by extending the filter API 