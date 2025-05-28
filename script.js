const API_URL = 'https://silk-little-scaffold.glitch.me'; // Glitch backend URL

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
  const container = document.getElementById('cart-content');
  container.innerHTML = '';

  if (!items.length) {
    document.getElementById('cart-slide').classList.remove('visible');
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

  document.getElementById('cart-slide').classList.add('visible');
}

// Checkout and reset cart
function completeCheckout() {
  if (currentCart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  fetch(`${API_URL}/api/cart/reset`, { method: 'POST' })
    .then(() => {
      document.getElementById('cart-slide').classList.remove('visible');
      alert('✅ Order placed! Thank you for shopping with us.');
    })
    .catch(err => console.error('Checkout error:', err));
}

// Add click event for products
document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    product.addEventListener('click', () => {
      const name = product.dataset.name;
      
      fetch(`${API_URL}/api/cart/named`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: [name] })
      })
      .catch(err => console.error('Error adding to cart:', err));
    });
  });
});

// Poll API every 2 seconds
setInterval(async () => {
  try {
    const res = await fetch(`${API_URL}/api/filter`);
    const filter = await res.json();

    if (JSON.stringify(filter) !== JSON.stringify(lastFilter)) {
      lastFilter = filter;
      filterProducts(filter.category, filter.brand);
    }

    const cartRes = await fetch(`${API_URL}/api/cart`);
    const newCart = await cartRes.json();

    if (JSON.stringify(newCart) !== JSON.stringify(currentCart)) {
      currentCart = newCart;
      showSlideInCart(currentCart);
    }
  } catch (err) {
    console.error('Polling error:', err);
  }
}, 2000); 
