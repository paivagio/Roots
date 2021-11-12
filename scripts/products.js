tabela = document.querySelector('#productsTable');
tabela_compra = document.querySelector('#carrinho_compra')

storage = window.localStorage;
const cart = document.querySelector('#cart-count');
const cart_num = document.querySelector('#cart-count span');
const exit = document.querySelector('#exitIcon');

produtos = [{
  "name": "Salada César",
  "img": "../images/products/cesar_salad.png",
  "category": "SALADAS",
  "price": "15.90"
},
{
  "name": "Salada Mista",
  "img": "../images/products/mixed_salad.png",
  "category": "SALADAS",
  "price": "20.90"
},
{
  "name": "Salada c/ Salmão",
  "img": "../images/products/salmon_salad.jpg",
  "category": "SALADAS",
  "price": "23.90"
},
{
  "name": "Sanduíche de Presunto",
  "img": "../images/products/sanduiche_presunto.jpg",
  "category": "SANDUÍCHES",
  "price": "12.90"
},
{
  "name": "Sanduíche de Peito de Peru",
  "img": "../images/products/sanduiche_peito_peru.jpg",
  "category": "SANDUÍCHES",
  "price": "14.90"
},
{
  "name": "Misto Quente",
  "img": "../images/products/sanduiche_misto_quente.jpg",
  "category": "SANDUÍCHES",
  "price": "9.90"
},
{
  "name": "Suco de Laranja Natural",
  "img": "../images/products/suco_laranja.jpg",
  "category": "BEBIDAS",
  "price": "6.90"
},
{
  "name": "Suco de Uva Integral",
  "img": "../images/products/suco-de-uva-natural.jpeg",
  "category": "BEBIDAS",
  "price": "6.90"
},
{
  "name": "Água Mineral",
  "img": "../images/products/agua_mineral.jpg",
  "category": "BEBIDAS",
  "price": "4.90"
}]

carrinho = [{}]

window.onload = function (e) {
  var html = '';
  for (var i = 0; i < produtos.length; i++) {
    dados = produtos[i];

    html += '<div id="product-card">';
    html += '<div>';
    html += '<img id="product-image" src="' + dados.img + '" alt=""></img>';
    html += '</div>';
    html += '<div>';
    html += '<span id="product-category">' + dados.category + '</span>';
    html += '<p id="product-name">' + dados.name + '</p>';
    html += '<span id="product-price">R$' + dados.price + '</span>';
    html += '</div>';
    html += '<a onclick="addToCart(this)">';
    html += '<span id="product-symbol">+</span>';
    html += '</a>';
    html += '</div>';
  }
  tabela.innerHTML = html;


  var access = JSON.parse(storage.getItem('access'));
  //console.log(access);
  if (access) {
    var currentUser = JSON.parse(storage.getItem('currentUser'));
    document.querySelector('#profileIcon').src = '../images/user_icon_signed.svg';
    document.querySelector('#exitIcon').style.display = 'block';
    var numProducts = currentUser.cart.count;
    console.log(numProducts)
    if (numProducts > 0) {
      cart_num.textContent = numProducts.toString();
      cart.style.opacity = "1";
    }
  }

  preenche_tabela();

};

function preenche_tabela() {
  var html = ''
  var access = JSON.parse(storage.getItem('access'));
  var user = access ? JSON.parse(storage.getItem('currentUser')) : JSON.parse(storage.getItem('nonLoggedUser'));
  const carrinho = user.cart;
  for (var i = 0; i < carrinho.products.length; i++) {
    dados_compra = carrinho.products[i];
    html += '<tr>'
    html += '<td style="width: 50%;">'
    html += dados_compra.name
    html += '</td>'
    html += '<td style="width: 10%;" class="td-right">'
    html += '1'
    html += '</td>'
    html += '<td style="width: 40%;" class="td-right">'
    html += dados_compra.price
    html += '</td>'
    html += '</tr>'
  }
  tabela_compra.innerHTML = html;
}


function dropDownFunction() {
  document.getElementById("Dropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("Dropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function addToCart(obj) {
  const parent = obj.parentElement;
  var access = JSON.parse(storage.getItem('access'));
  var user = access ? JSON.parse(storage.getItem('currentUser')) : JSON.parse(storage.getItem('nonLoggedUser'));
  //console.log(user);
  console.log(user.cart);
  const category = parent.querySelector('#product-category');
  const imageSrc = parent.querySelector('#product-image');
  const name = parent.querySelector('#product-name');
  const price = parent.querySelector('#product-price');
  const symbol = parent.querySelector('#product-symbol');

  console.log(imageSrc.src.split("/"))
  const product = {
    "name": name.textContent.toLowerCase(),
    "img": imageSrc.src.split('/').at(-1),
    "category": category.textContent,
    "price": price.textContent
  }

  if (symbol.textContent === '✖') { //remove
    var products = user.cart.products;
    for (var i = 0; i < products.length; i++) {
      if (products[i].name === product.name) {
        products.splice(i, 1);
      }
    }
    user.cart.products = products;
    user.cart.count -= 1
    symbol.textContent = '+';
    symbol.style.fontSize = '3rem';
  } else {
    user.cart.products.push(product);
    user.cart.count += 1
    symbol.textContent = '✖';
    symbol.style.fontSize = '1.5rem';
  }

  var numProducts = user.cart.count;
  console.log(user.cart);
  console.log(numProducts);
  if (numProducts <= 0) {
    cart.style.opacity = "0";
    user.cart.count = 0;
  } else {
    cart_num.textContent = numProducts.toString();
    cart.style.opacity = "1";
  }

  if (access) {
    storage.setItem('currentUser', JSON.stringify(user));
  } else {
    storage.setItem('nonLoggedUser', JSON.stringify(user));
  }

  preenche_tabela();

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


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modalButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}