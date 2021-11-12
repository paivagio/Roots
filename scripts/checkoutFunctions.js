const paymentInput = document.getElementsByName("payment-selected");
const divCardRegistration = document.querySelector('.card-registration');
const cardInputs = document.querySelector('.card-registration form');
storage = window.localStorage;
const exit = document.querySelector('#exitIcon');
const profileIcon = document.querySelector('#profileIcon');
const usernameDecoration = document.querySelector('.status-acount');
const username = document.querySelector('.status-acount span');
const resume = document.querySelector('.order-summary-value span');
const totalAmount = document.querySelector('.order-total-value span');
const cart = document.querySelector('#cart-count');
const cart_num = document.querySelector('#cart-count span');

window.onload = () => {

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

  var numProducts = user.cart.count;
  //console.log(numProducts)
  if (numProducts > 0) {
    cart_num.textContent = numProducts.toString();
    cart.style.opacity = "1";
  }
}
// console.log(cardInput[1].checked);

function showCardRegistration() {
  if (paymentInput[1].checked === true) {
    divCardRegistration.style.display = 'flex';
  }
}

function hideCardRegistration() {
  if (paymentInput[1].checked === false) {
    divCardRegistration.style.display = 'none';
  }
}

function checkoutValidate() {
  if (paymentInput[0].checked === false && paymentInput[1].checked === false && paymentInput[2].checked === false && paymentInput[3].checked === false) {
    alert("Selecione um método de pagamento!")

  } else if (paymentInput[1].checked === true) {
    var cardInfo = cardInputs.elements;
    for (const input of cardInfo) {
      //console.log(input.value);
      if (input.value === "") {
        alert("Favor preencher os dados do cartão")
        return;
      }
    }
    window.location.href = "checkoutConfirmation.html"
  } else {
    window.location.href = "checkoutConfirmation.html"
  }
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