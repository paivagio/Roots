const togglePassword = document.querySelector('#togglePassword');
const fullname = document.querySelector('#name');
const address = document.querySelector('#address');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submit = document.querySelector('#submitButton');
storage = window.localStorage;

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    //change the icon
    const icon = document.querySelector('#togglePassword img')
    const src = icon.getAttribute('src') === '../images/visibility_off.svg' ? '../images/visibility.svg' : '../images/visibility_off.svg';
    icon.setAttribute('src', src);
});

fullname.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        register();
    }
});

address.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        register();
    }
});

username.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        register();
    }
});

password.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        register();
    }
});

submit.addEventListener('click', function (e) {
    register();
});

function register() {
    var database = JSON.parse(storage.getItem('users'));

    const newUser = {
        "username": username.value,
        "password": password.value,
        "name": fullname.value,
        "address": address.value,
        "cart": {
            "count": 0,
            "products": [],
        }
    };
    var loggingFromCart = JSON.parse(storage.getItem('loggingFromCart'));
    if (loggingFromCart) {
        newUser.cart = JSON.parse(storage.getItem('nonLoggedUser')).cart;
        storage.setItem('loggingFromCart', false);
    }

    database.push(newUser)
    storage.setItem('users', JSON.stringify(database));
    window.location = '../pages/login.html'
}