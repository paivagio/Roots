const togglePassword = document.querySelector('#togglePassword');
const submit = document.querySelector('#submitButton');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const remember = document.querySelector('#rememberMe');
storage = window.localStorage;

window.onload = () => {
    console.log(JSON.parse(storage.getItem('users')));
}

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    //change the icon
    const icon = document.querySelector('#togglePassword img')
    const src = icon.getAttribute('src') === '../images/visibility_off.svg' ? '../images/visibility.svg' : '../images/visibility_off.svg';
    icon.setAttribute('src', src);
});

username.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        login();
    }
});

password.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        login();
    }
});

submit.addEventListener('click', function (e) {
    login();
});

function login(e) {
    if (!username.value) {
        username.style.outline = '2px solid red';
        username.style.setProperty("--c", "red");
    }
    else if (!password.value) {
        password.style.outline = '2px solid red';
        username.style.outline = 'transparent';
        username.style.setProperty("--c", "#7A7878");
        password.style.setProperty("--c", "red");
    }
    else {
        var loggingFromCart = JSON.parse(storage.getItem('loggingFromCart'));
        password.style.outline = 'transparent';
        var database = JSON.parse(storage.getItem('users'));
        var token = false;
        var currentUser = null;
        for (var i = 0; i < database.length; i++) {
            if (database[i].username === username.value && database[i].password === password.value) {
                token = true;
                if (loggingFromCart) {
                    database[i].cart = JSON.parse(storage.getItem('nonLoggedUser')).cart;
                    storage.setItem('users', JSON.stringify(database));
                    storage.setItem('loggingFromCart', false);
                }
                currentUser = database[i];
                break;
            }
        }

        if (token) {
            storage.setItem('access', true);
            storage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href = "../index.html";
        }
        else {
            //console.log(storage.getItem('access'));
            window.alert("Usu??rio ou senha incorreto!")
        }
    }

};