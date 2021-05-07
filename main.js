let carts = document.querySelectorAll(".addToCart-btn");

let products = [
  // =========
  // APPETISERS
  // ===========
  {
    name: "Caesar Salad",
    tag: "salad-1",
    price: 8.99,
    inCart: 0,
  },

  {
    name: "Garden Salad",
    tag: "salad-2",
    price: 6.99,
    inCart: 0,
  },

  {
    name: "French Onion Soup",
    tag: "soup-1",
    price: 4.99,
    inCart: 0,
  },

  // =========
  // MAINS
  // ===========

  {
    name: "Olive & Basil Pizza",
    tag: "pizza-1",
    price: 11.99,
    inCart: 0,
  },

  {
    name: "Seafood Pho",
    tag: "pho-1",
    price: 7.99,
    inCart: 0,
  },

  {
    name: "Mixed Fried Rice",
    tag: "rice-1",
    price: 10.99,
    inCart: 0,
  },

  // =========
  // DESSERT
  // ===========
  {
    name: "Chocolate Cake",
    tag: "cake-1",
    price: 10.99,
    inCart: 0,
  },

  {
    name: "Caramel Crepe",
    tag: "crepe-1",
    price: 14.99,
    inCart: 0,
  },

  {
    name: "Blackberry Tart",
    tag: "tart-1",
    price: 8.99,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    alert("Item has been added to cart");
    // totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".view-cart-button span").textContent =
      "(" + productNumbers + ")";
  }
}

// increase cart number on icon

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".view-cart-button span").textContent =
      "(" + (productNumbers + 1) + ")";
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".view-cart-button span").textContent =
      "(" + 1 + ")";
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }

    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// function totalCost(product) {
//   // console.log("The product price is ", product.price);
//   let cartCost = localStorage.getItem("totalCost");

//   console.log("My cartCost is", cartCost);

//   if (cartCost != null) {
//     cartCost = parseInt(cartCost);
//     localStorage.setItem("totalCost", cartCost + product.price);
//   } else {
//     localStorage.setItem("totalCost", product.price);
//   }
// }

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".cart-items");
  if (cartItems && productContainer) {
    productContainer.innerHTML = " ";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-img" src="./images/${item.tag}.jpeg">

                    <span class="cart-item-title">${item.name}</span>
              
                </div>

                <span class="cart-price cart-column">${item.price}</span>

                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="${item.inCart}">
                    
                    
                    <button class="remove-btn btn btn-danger" type="button">REMOVE</button>
                </div>

        `;
    });
  }
}

onLoadCartNumbers();
displayCart();
updateCartTotal();

// ==========
//FUNCTIONS
//============== //

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("remove-btn");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  document
    .getElementsByClassName("paymentProceed-btn")[0]
    .addEventListener("click", paymentProceedClicked);
}
function paymentProceedClicked() {
  alert("Thank you for your purchase!");
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;

  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    console.log(quantity);
    total = total + quantity * price;
    console.log(total);
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$ " + total;
}
