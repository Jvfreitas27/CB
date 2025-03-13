// Seleciona os elementos
const menuBtn = document.getElementById('menu-btn');
const navPanel = document.getElementById('nav-panel');

// Adiciona o evento de clique
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navPanel.classList.toggle('open');
});

