# NZ Store Frontend

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
| Backend API | Node.js (Express)       | **Replit**       |

## 🚀 Deployment Guide

### Frontend (Vercel)

1. Create a Vercel account at https://vercel.com
2. Import this GitHub repo
3. Deploy your project
4. **Important:** Update the `API_URL` in `script.js` with your Replit backend URL

## 📱 UI Features

- Responsive grid layout
- Hover effects on products
- Animated slide-in cart
- Mobile-friendly design
- Auto-calculated cart totals

## 🔌 API Documentation

### Product Filtering

```bash
# Filter products by category and brand
POST https://your-api.replit.dev/api/filter
Content-Type: application/json

{
  "category": "Phones",
  "brand": "Samsung"
}

# Filter products by category only
POST https://your-api.replit.dev/api/filter
Content-Type: application/json

{
  "category": "Phones"
}

# Reset filters
POST https://your-api.replit.dev/api/filter
Content-Type: application/json

{}
```

### Cart Management

```bash
# Add products to cart by name
POST https://your-api.replit.dev/api/cart/named
Content-Type: application/json

{
  "names": ["Samsung A23", "LG WashPro"]
}

# Get current cart
GET https://your-api.replit.dev/api/cart

# Reset cart
POST https://your-api.replit.dev/api/cart/reset
```

## Backend Repository

The backend for this project is available at [nz-store-backend](https://github.com/rxd-blue/nz-store-backend)

## 🛠️ Customization

- Update the product data in backend to add more products
- Modify CSS variables in `style.css` to change the color scheme
- Add more filtering options by extending the filter API
