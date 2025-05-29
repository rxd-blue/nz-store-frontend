const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let filter = {};
let cartItems = [];

const allProducts = [
  { name: "Samsung A23", category: "Phones", brand: "Samsung", details: "128GB, 6.6-inch screen", price: "$349" },
  { name: "LG WashPro", category: "Washers", brand: "LG", details: "9kg, White", price: "$899" },
  { name: "Xiaomi Note 12", category: "Phones", brand: "Xiaomi", details: "6GB RAM, 6.4-inch screen", price: "$299" }
];

// Filter API
app.post('/api/filter', (req, res) => {
  const { category, brand } = req.body;
  filter = { category, brand };
  console.log('📤 Filter applied:', filter);
  res.sendStatus(200);
});

app.get('/api/filter', (req, res) => {
  res.json(filter);
});

// Cart API
app.post('/api/cart/named', (req, res) => {
  const names = req.body.names;
  if (!Array.isArray(names)) {
    return res.status(400).json({ error: 'names must be an array' });
  }

  // Find products by name and add to cart
  const newItems = allProducts.filter(p => names.includes(p.name));
  
  // Check if items are already in cart
  const existingNames = cartItems.map(item => item.name);
  const filteredNewItems = newItems.filter(item => !existingNames.includes(item.name));
  
  cartItems = [...cartItems, ...filteredNewItems];
  
  console.log('🛒 Cart updated:', cartItems);
  res.sendStatus(200);
});

app.get('/api/cart', (req, res) => {
  res.json(cartItems);
});

app.post('/api/cart/reset', (req, res) => {
  cartItems = [];
  console.log('🛒 Cart reset');
  res.sendStatus(200);
});

// Root endpoint for health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'API is running',
    endpoints: {
      filter: {
        get: '/api/filter',
        post: '/api/filter'
      },
      cart: {
        get: '/api/cart',
        post: {
          addNamed: '/api/cart/named',
          reset: '/api/cart/reset'
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)); 