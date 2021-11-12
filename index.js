const logo = document.querySelector('#logo');
const username = document.querySelector('#login a');
const icon = document.querySelector('#login img');
const cart = document.querySelector('#cart-count');
const cart_num = document.querySelector('#cart-count span');
storage = window.localStorage;

window.onload = function (e) {
    var firstTime = JSON.parse(storage.getItem('firstTime'));
    //console.log(firstTime);
    if (!firstTime) {
        storage.setItem('access', false);
        storage.setItem('firstTime', true);
        const nonLoggedUser = {
            "username": 'offline',
            "password": 'offline',
            "name": 'offline',
            "address": 'offline',
            "cart": {
                "count": 0,
                "products": [],
            }
        };
        storage.setItem('nonLoggedUser', JSON.stringify(nonLoggedUser));
        console.log('Default non logged user created');

        const defaultUser = {
            "username": 'admin',
            "password": 'admin123',
            "name": 'admin',
            "address": 'admin',
            "cart": {
                "count": 1,
                "products": [
                    {
                        "name": 'Salada c/ salmão',
                        "img": 'salmon_salad.jpg',
                        "category": 'SALADAS',
                        "price": 'R$23.90'
                    }
                ],
            }
        };

        storage.setItem('users', JSON.stringify([defaultUser]));
    }

    var access = JSON.parse(storage.getItem('access'));
    //console.log(access);
    if (access) {
        var currentUser = JSON.parse(storage.getItem('currentUser'));
        username.textContent = currentUser.name.split(' ')[0];
        username.href = '';
        icon.src = 'images/user_icon_signed.svg';

        var numProducts = currentUser.cart.count;
        if (numProducts > 0) {
            cart_num.textContent = numProducts.toString();
            cart.style.opacity = "1";
        }
    }
};

logo.addEventListener('click', function (e) {
    storage.setItem('access', false);
    storage.setItem('firstTime', false);
    username.textContent = 'Entrar';
    username.href = 'pages/login.html';
    icon.src = 'images/user_icon.svg';
    cart.style.opacity = "0"
});

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

    const product = {
        "name": name.textContent.toLowerCase(),
        "img": imageSrc.src.split("/").at(-1),
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
    //console.log(user.cart);
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

}