function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".view-cart-button span").textContent =
      "(" + productNumbers + ")";
  }
}

onLoadCartNumbers();

document
  .getElementsByClassName("paymentProceed-btn")[0]
  .addEventListener("click", paymentProceedClicked);

function paymentProceedClicked() {
  alert("Thank you for your purchase!");
  localStorage.clear();
}
