const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    //change the icon
    const icon = document.querySelector('#togglePassword img')
    const src = icon.getAttribute('src') === '../images/visibility_off.svg' ? '../images/visibility.svg' : '../images/visibility_off.svg';
    icon.setAttribute('src', src);
});

