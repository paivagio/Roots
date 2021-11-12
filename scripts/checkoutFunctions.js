const paymentInput = document.getElementsByName("payment-selected");
const divCardRegistration = document.querySelector('.card-registration');

const cardInputs = document.querySelector('.card-registration form');

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
      console.log(input.value);
      if (input.value === "") {
        alert("Favor preencher os dados do cartão")
        return;
      }
    }
  } else {
    window.location.href = "checkoutConfirmation.html"
  }
}