function showInfor(elementId){
    let element = document.getElementById(elementId)
    if(element.style.display === "none"){
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
}

// Tăng, giảm số lượng
const decrementButton = document.getElementById("decrease");
const incrementButton = document.getElementById("increment");
const quantitySpan = document.getElementById("quantity");

// Số lượng ban đầu
let quantity = 1;
incrementButton.addEventListener("click", function() {
    quantity++;
    quantitySpan.textContent = quantity;
});
decrementButton.addEventListener("click", function() {
    if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
    }
});

let displayOverlay = document.getElementById('overlay');
let displayPaymentForm = document.getElementById('product_payment--form');
let displayPaymentInfor = document.getElementById('payment_form--infor');

function showPayment(){
    
    if(displayOverlay.style.display === "none" && displayPaymentForm.style.display === "none" ){
        displayOverlay.style.display = "block";
        displayPaymentForm.style.display = "block";
    }
    else{
        displayOverlay.style.display = "none";
        displayPaymentForm.style.display = "none";
    }
}

function showPaymentInfor(){
    displayPaymentInfor.style.display = "block";
}