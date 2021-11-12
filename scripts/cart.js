storage = window.localStorage;
const exit = document.querySelector('#exitIcon');
const profileIcon = document.querySelector('#profileIcon');
const usernameDecoration = document.querySelector('.status-acount');
const username = document.querySelector('.status-acount span');
const resume = document.querySelector('.order-summary-value span');
const totalAmount = document.querySelector('.order-total-value span');

window.onload = () => {
  loadCart();

  var access = JSON.parse(storage.getItem('access'));
  var user = access ? JSON.parse(storage.getItem('currentUser')) : JSON.parse(storage.getItem('nonLoggedUser'));
  //console.log(access);
  if (access) {
    profileIcon.src = '../images/user_icon_signed.svg';
    exit.style.display = 'block';
    profileIcon.parentElement.href = '../index.html';
    username.textContent = user.name.toUpperCase();
    username.style.color = '#FFFF';
    usernameDecoration.style.backgroundColor = '#009C8E';
  }
  var total = 0;
  for (const product of user.cart.products) {
    var cleanPrice = product.price.replace(/R\$ |R\$/g, '');
    total += parseFloat(cleanPrice);
  }
  total = Number(total.toFixed(2));
  total = total.toString();
  if (total.length < 5) {
    total = total + '0';
  }
  resume.textContent = 'R$ ' + total;
  totalAmount.textContent = 'R$ ' + total;
}

function loadCart() {
  var cart = JSON.parse(storage.getItem('currentUser')).cart;

  // "products": [
  //   {
  //       "name": 'Salada c/ salmão',
  //       "img": 'salmon_salad.jpg',
  //       "category": 'SALADAS',
  //       "price": 23.90
  //   }
  // ],
  var item = ""
  for (const product of cart.products) {
    item += '<div class="order-item">'
    item += '<div>'
    item += '<img src="../images/products/' + product.img + '" alt="">'
    item += '</div>'
    item += '<div class="order-info">'
    item += '<p><b>' + product.name + '</b></p>'
    item += '<p>Categoria: <b>' + product.category + '</b></p>'
    item += '<p>Peso: <b>250g</b></p>'
    item += '</div>'

    item += '<div class="order-price">'
    item += '<span>' + product.price + '</span>'
    item += '</div>'

    item += '<div class="order-amount">'
    item += '<p>Quantidade:</p>'
    item += '<input type="number" value="1"/>'
    item += '</div>'
    item += '</div>'
  }

  document.querySelector('.order-content').innerHTML = item
}

exit.addEventListener('click', function (e) {
  storage.setItem('access', false);

  const nonLoggedUser = {
    "username": 'offline',
    "password": 'offline',
    "name": 'offline',
    "address": 'offline',
    "cart": {
      "count": 0,
      "products": [],
    }
  }
  storage.setItem('nonLoggedUser', JSON.stringify(nonLoggedUser));
  window.location = "../index.html";
});