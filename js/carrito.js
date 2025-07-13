document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');
  
  botonesAgregar.forEach(btn => {
    btn.addEventListener('click', () => {
      const producto = {
        nombre: btn.dataset.nombre,
        precio: parseFloat(btn.dataset.precio),
        imagen: btn.dataset.imagen,
        cantidad: 1
      };

      agregarAlCarrito(producto);
    });
  });

  // Si estamos en carrito.html, mostrarlo
  if (document.getElementById('carrito-items')) {
    mostrarCarrito();
  }
});

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const index = carrito.findIndex(p => p.nombre === producto.nombre);
  if (index !== -1) {
    carrito[index].cantidad++;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
}

function mostrarCarrito() {
  const contenedor = document.getElementById('carrito-items');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  contenedor.innerHTML = '';

  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    document.getElementById('carrito-total').textContent = '0.00';
    return;
  }

  carrito.forEach(producto => {
    const item = document.createElement('div');
    item.classList.add('card', 'mb-3');
    item.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: S/. ${producto.precio.toFixed(2)}</p>
            <p class="card-text">Cantidad: ${producto.cantidad}</p>
            <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  document.getElementById('carrito-total').textContent = total.toFixed(2);
}

function eliminarProducto(nombre) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(p => p.nombre !== nombre);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContador();
}

function vaciarCarrito() {
  localStorage.removeItem('carrito');
  mostrarCarrito();
  actualizarContador();
}

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);
  const contador = document.getElementById('contador-carrito');
  if (contador) contador.textContent = totalItems;
}
