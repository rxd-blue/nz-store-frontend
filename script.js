const API_URL = 'https://33996a5c-37cb-4fe4-b733-0d54b16752bf-00-18t9sdi58ywf1.janeway.replit.dev'; // Replit backend URL

let lastFilter = {};
let currentCart = [];

// Apply product filters
function filterProducts(category, brand) {
  const products = document.querySelectorAll('.product');
  let visibleCount = 0;
  
  products.forEach(p => {
    const cat = p.dataset.category;
    const br = p.dataset.brand;
    const visible = (!category || cat === category) && (!brand || br === brand);
    
    p.style.display = visible ? 'block' : 'none';
    if (visible) visibleCount++;
  });
  
  // Add a message if no products match the filter
  const container = document.getElementById('product-list');
  const noResults = container.querySelector('.no-results');
  
  if (visibleCount === 0) {
    if (!noResults) {
      const message = document.createElement('div');
      message.className = 'no-results';
      message.textContent = 'No products match the selected filters.';
      container.appendChild(message);
    }
  } else if (noResults) {
    container.removeChild(noResults);
  }
}

// Calculate cart total
function calculateCartTotal(items) {
  return items.reduce((total, item) => {
    const price = item.price || '$0';
    const numericPrice = parseFloat(price.replace('$', ''));
    return total + numericPrice;
  }, 0);
}

// Show slide-in cart
function showSlideInCart(items) {
  console.log('Showing cart with items:', items);
  const cartSlide = document.getElementById('cart-slide');
  const container = document.getElementById('cart-content');
  container.innerHTML = '';

  if (!items.length) {
    cartSlide.classList.remove('visible');
    cartSlide.classList.add('hidden');
    return;
  }

  items.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${item.name}</strong>
      <p>${item.details}</p>
      <p class="product-price">${item.price || '$0'}</p>
      <hr>
    `;
    container.appendChild(div);
  });

  // Update cart total
  const total = calculateCartTotal(items);
  document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;

  // Make cart visible
  cartSlide.classList.remove('hidden');
  // Use setTimeout to ensure the transition works properly
  setTimeout(() => {
    cartSlide.classList.add('visible');
  }, 10);
}

// Checkout and reset cart
function completeCheckout() {
  if (currentCart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  fetch(`${API_URL}/api/cart/reset`, { method: 'POST' })
    .then(() => {
      const cartSlide = document.getElementById('cart-slide');
      cartSlide.classList.remove('visible');
      cartSlide.classList.add('hidden');
      currentCart = [];
      alert('Order placed! Thank you for shopping with us.');
    })
    .catch(err => {
      console.error('Checkout error:', err);
      alert('Failed to complete checkout. Please try again.');
    });
}

// Add click event for products
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, adding click events to products');
  const products = document.querySelectorAll('.product');
  
  // Initialize cart slide state
  const cartSlide = document.getElementById('cart-slide');
  cartSlide.classList.add('hidden');
  
  products.forEach(product => {
    product.addEventListener('click', () => {
      const name = product.dataset.name;
      console.log('Product clicked:', name);
      
      fetch(`${API_URL}/api/cart/named`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: [name] })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return fetch(`${API_URL}/api/cart`);
      })
      .then(response => response.json())
      .then(cart => {
        console.log('Cart updated from click:', cart);
        currentCart = cart;
        showSlideInCart(cart);
      })
      .catch(err => {
        console.error('Error adding to cart:', err);
        alert('Failed to add item to cart. Please try again.');
      });
    });
  });

  // Initial cart fetch
  fetch(`${API_URL}/api/cart`)
    .then(response => response.json())
    .then(cart => {
      console.log('Initial cart:', cart);
      currentCart = cart;
      if (cart.length > 0) {
        showSlideInCart(cart);
      } else {
        const cartSlide = document.getElementById('cart-slide');
        cartSlide.classList.add('hidden');
        cartSlide.classList.remove('visible');
      }
    })
    .catch(err => {
      console.error('Error getting initial cart:', err);
      const cartSlide = document.getElementById('cart-slide');
      cartSlide.classList.add('hidden');
      cartSlide.classList.remove('visible');
    });
});

// Poll API every 2 seconds
setInterval(async () => {
  try {
    // Check for filter changes
    const res = await fetch(`${API_URL}/api/filter`);
    const filter = await res.json();

    if (JSON.stringify(filter) !== JSON.stringify(lastFilter)) {
      console.log('Filter updated:', filter);
      lastFilter = filter;
      filterProducts(filter.category, filter.brand);
    }

    // Check for cart changes
    const cartRes = await fetch(`${API_URL}/api/cart`);
    const newCart = await cartRes.json();

    if (JSON.stringify(newCart) !== JSON.stringify(currentCart)) {
      console.log('Cart updated from polling:', newCart);
      currentCart = newCart;
      showSlideInCart(newCart);
    }
  } catch (err) {
    console.error('Polling error:', err);
  }
}, 2000); 