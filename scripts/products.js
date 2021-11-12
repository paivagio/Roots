tabela = document.querySelector('#productsTable');
tabela_compra = document.querySelector('#carrinho_compra')

storage = window.localStorage;
const cart = document.querySelector('#cart-count');
const cart_num = document.querySelector('#cart-count span');
const exit = document.querySelector('#exitIcon');
const total_price_local = document.querySelector('#total_price');
const opcao = document.getElementById('Dropdown');

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

opcao.addEventListener("change", function(){
  var html = '';
  for (var i = 0; i < produtos.length; i++) {
      dados = produtos[i];
      console.log(opcao)
      if (dados.category == opcao.value || opcao.value == "todos"){
        html += '<div id="product-card">';
        html +=    '<div>';
        html +=        '<img id="product-image" src="' + dados.img + '" alt=""></img>';
        html +=    '</div>';
        html +=    '<div>';
        html +=        '<span id="product-category">' + dados.category + '</span>';
        html +=        '<p id="product-name">' + dados.name + '</p>';
        html +=        '<span id="product-price">R$' + dados.price + '</span>';
        html +=    '</div>';
        html +=    '<a onclick="addToCart(this)">';
        html +=        '<span id="product-symbol">+</span>';
        html +=     '</a>';
        html += '</div>';
      }
  }
  tabela.innerHTML = html;
})

window.onload = function (e) {
  var html = '';
  for (var i = 0; i < produtos.length; i++) {
      dados = produtos[i];
      console.log(opcao)
      if (dados.category == opcao.value || opcao.value == "todos"){
        html += '<div id="product-card">';
        html +=    '<div>';
        html +=        '<img id="product-image" src="' + dados.img + '" alt=""></img>';
        html +=    '</div>';
        html +=    '<div>';
        html +=        '<span id="product-category">' + dados.category + '</span>';
        html +=        '<p id="product-name">' + dados.name + '</p>';
        html +=        '<span id="product-price">R$' + dados.price + '</span>';
        html +=    '</div>';
        html +=    '<a onclick="addToCart(this)">';
        html +=        '<span id="product-symbol">+</span>';
        html +=     '</a>';
        html += '</div>';
      }
  }
  tabela.innerHTML = html;
  
  var access = JSON.parse(storage.getItem('access'));
  //console.log(access);
  if (access) {
      var currentUser = JSON.parse(storage.getItem('currentUser'));
      document.querySelector('#profileIcon').src = '../images/user_icon_signed.svg';
      document.querySelector('#exitIcon').style.display = 'block';
      var numProducts = currentUser.cart.count;
      if (numProducts > 0) {
          cart_num.textContent = numProducts.toString();
          cart.style.opacity = "1";
      }
  }
  preenche_tabela();
};

function preenche_tabela() {
  var access = JSON.parse(storage.getItem('access'));
  var user = access ? JSON.parse(storage.getItem('currentUser')) : JSON.parse(storage.getItem('nonLoggedUser'));
  var cartt = user.cart;
  var groupedProducts = [];
  let counts = {};
  cartt.products.forEach(el => counts[el.name] = 1 + (counts[el.name] || 0));
  for (const product of cartt.products) {
    var newProduct = product;
    newProduct.count = counts[product.name];
    var match = false;
    for (const p of groupedProducts) {
      if (p.name === newProduct.name) {
        match = true;
      }
    }

    if (!match) {
      groupedProducts.push(newProduct);
    }
  }

  console.log(groupedProducts)

  var html = '';
  var total_price = 0;

  for (var i = 0; i < groupedProducts.length; i++) {
      dados_compra = groupedProducts[i];     
      html += '<tr>'
      html +=    '<td style="width: 40%;">'
      html +=        dados_compra.name
      html +=    '</td>'
      html +=    '<td style="width: 10%;" class="td-right">'
      html +=        dados_compra.count.toString()
      html +=    '</td>'
      html +=    '<td style="width: 40%;" class="td-right">'
      html +=        dados_compra.price
      html +=    '</td>'
      html += '</tr>'
  }
  tabela_compra.innerHTML = html;

  var html = '';

  for (const product of user.cart.products) {
    var cleanPrice = product.price.replace(/(R\$ )|(R\$)/g, '');
    total_price += parseFloat(cleanPrice);
  }
  total_price = Number(total_price.toFixed(2));
  total_price = total_price.toString();
  if (total_price.split('.').at(-1).length !== 2) {
    total_price = total_price + '0';
  }
  if (total_price.length == 2) {
    total_price = '0.00';
  }
  html += '<p>TOTAL: R$ ' + total_price + '</p>';
  console.log(total_price)
  total_price_local.innerHTML = html;
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
      "name": name.textContent,
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
