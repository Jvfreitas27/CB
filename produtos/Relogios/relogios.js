document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
  });
  
  function loadProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
  
    // Pega os produtos salvos no localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
  
    // Filtra apenas os produtos da categoria "relogio"
    const filteredProducts = products.filter(product => product.category === 'relogio');
  
    if (filteredProducts.length === 0) {
      grid.innerHTML = '<p>Nenhum relógio disponível.</p>';
      return;
    }
  
    // Cria os cards para cada produto
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      productCard.innerHTML = `
        <img src="${product.image}" alt="Relógio" />
        <p>${product.description}</p>
        <p>R$ ${product.price}</p>
        <p>Estoque: ${product.stock}</p>
      `;
  
      grid.appendChild(productCard);
    });
  }
  