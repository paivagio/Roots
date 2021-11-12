storage = window.localStorage;

window.onload = () => {
  loadCart();
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

  for (const product of cart.products) {
    var item = ""
    item += '<div class="order-item">'
    item += '<div>'
    item += '<img src="../images/products/'+ product.img +'.jpg" alt="salmon_salad">'
    item += '</div>'
    item += '<div class="order-info">'
    item += '<p><b>'+ product.name +'</b></p>'
    item += '<p>Categoria: <b>'+ product.category +'</b></p>'
    item += '<p>Peso: <b>250g</b></p>'
    item += '</div>'

    item += '<div class="order-price">'
    item += '<span>R$ '+ product.price +'</span>'
    item += '</div>'

    item += '<div class="order-amount">'
    item += '<p>Quantidade:</p>'
    item += '<input type="number"/>'
    item += '</div>'
  }

  document.querySelector('.order-content').innerHTML += item
}