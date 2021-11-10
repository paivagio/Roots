const logo = document.querySelector('#logo');
const username = document.querySelector('#login a');
const icon = document.querySelector('#login img');
const cart = document.querySelector('#cart-count');
const cart_num = document.querySelector('#cart-count span');
storage = window.localStorage;

window.onload = function (e) {
    var firstTime = JSON.parse(storage.getItem('firstTime'));
    if (firstTime) {
        storage.setItem('access', false);
        storage.setItem('firstTime', false);
    }

    var access = JSON.parse(storage.getItem('access'));
    console.log(access);
    if (access) {
        var currentUser = JSON.parse(storage.getItem('currentUser'));

        username.textContent = currentUser.username;
        username.href = '';
        icon.src = 'images/user_icon_signed.svg';

        let numProducts = currentUser.cart.count;
        if (numProducts > 0) {
            cart_num.textContent = numProducts.toString();
            cart.style.opacity = "1";
        }
    }
};

logo.addEventListener('click', function (e) {
    storage.setItem('access', false);
    username.textContent = 'Entrar';
    username.href = 'pages/login.html';
    icon.src = 'images/user_icon.svg';
    cart.style.opacity = "0";
});