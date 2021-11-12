storage = window.localStorage;

window.onload = () => {
  var access = JSON.parse(storage.getItem('access'));
  var user = access ? JSON.parse(storage.getItem('currentUser')) : JSON.parse(storage.getItem('nonLoggedUser'));
  user.cart.count = 0;
  user.cart.products = [];
  if (access) {
    storage.setItem('currentUser', JSON.stringify(user));
  } else {
    storage.setItem('nonLoggedUser', JSON.stringify(user));
  }

  setTimeout(() => { window.location.href = "../index.html" }, 3000)
}