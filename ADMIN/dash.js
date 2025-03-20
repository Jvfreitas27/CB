const images = [];
let currentIndex = 0;

// Upload de imagens
document.getElementById('imageUpload').addEventListener('change', (e) => {
  images.length = 0;
  const files = e.target.files;

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      images.push(event.target.result);
      if (images.length === 1) {
        updatePreview();
      }
    };
    reader.readAsDataURL(file);
  }
});

function updatePreview() {
  const img = document.getElementById('previewImage');
  img.src = images[currentIndex];
  img.style.display = 'block';
}

// Salvar produto no localStorage
document.getElementById('addProduct').addEventListener('click', () => {
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  if (!price || !stock || !description || images.length === 0) {
    alert('Preencha todos os campos e envie uma imagem.');
    return;
  }

  const product = {
    category,
    description,
    price,
    stock,
    image: images[0] // Salva apenas a primeira imagem
  };

  // Pega os produtos existentes no localStorage
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products.push(product);

  // Salva no localStorage
  localStorage.setItem('products', JSON.stringify(products));

  alert('Produto adicionado com sucesso!');
  
  // Recarrega os produtos na lista do Dashboard
  loadProductsInDashboard();
});

// Carregar produtos na Dashboard
function loadProductsInDashboard() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  let products = JSON.parse(localStorage.getItem('products')) || [];

  if (products.length === 0) {
    grid.innerHTML = '<p>Nenhum produto cadastrado.</p>';
    return;
  }

  products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${product.image}" alt="Produto" />
      <input type="text" class="edit-description" value="${product.description}" />
      <input type="number" class="edit-price" value="${product.price}" />
      <input type="number" class="edit-stock" value="${product.stock}" />
      <select class="edit-category">
        <option value="relogio" ${product.category === 'relogio' ? 'selected' : ''}>Relógio</option>
        <option value="celular" ${product.category === 'celular' ? 'selected' : ''}>Celular</option>
        <option value="acessorio" ${product.category === 'acessorio' ? 'selected' : ''}>Acessório</option>
      </select>
      <button class="update-btn" data-index="${index}">Atualizar</button>
      <button class="remove-btn" data-index="${index}">Remover</button>
    `;

    // Evento para remover produto
    productCard.querySelector('.remove-btn').addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeProduct(index);
    });

    // Evento para editar produto
    productCard.querySelector('.update-btn').addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      updateProduct(index, productCard);
    });

    grid.appendChild(productCard);
  });
}

// Função para remover produto
function removeProduct(index) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  loadProductsInDashboard();
}

// Função para atualizar produto
function updateProduct(index, productCard) {
  let products = JSON.parse(localStorage.getItem('products')) || [];

  products[index] = {
    category: productCard.querySelector('.edit-category').value,
    description: productCard.querySelector('.edit-description').value,
    price: productCard.querySelector('.edit-price').value,
    stock: productCard.querySelector('.edit-stock').value,
    image: products[index].image
  };

  localStorage.setItem('products', JSON.stringify(products));
  alert('Produto atualizado com sucesso!');
  loadProductsInDashboard();
}

// Carregar os produtos automaticamente ao abrir o dashboard
document.addEventListener('DOMContentLoaded', () => {
  loadProductsInDashboard();
});
