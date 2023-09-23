// const amountElement = document.querySelector('.quantity')
// const amount = amountElement.value
// const price = document.querySelector('.product_price').innerHTML
// const plus = document.querySelector('.plus')
// const minus = document.querySelector('.minus')
// const total = document.querySelector('.price_total')
// const totalPayment = document.querySelector('.total_payment')
// const check = document.querySelector('.select_check')


// const render = (amount) => {
//     amountElement.value = amount
// }

// var quantity = 1;
// var totalprice

// plus.addEventListener('click', function() {
//     quantity++
//     render(quantity)
//     totalprice = price * quantity
//     total.innerHTML = totalprice
//     total.style.color = 'red'
//     if(check.checked) {
//         totalPayment.innerHTML = totalprice
//     }
// })

// minus.addEventListener('click', function() {
//     if(quantity > 1) {
//         quantity--
//         render(quantity)
//         totalprice = price * quantity
//         total.innerHTML = totalprice
//         total.style.color = 'red'
//         if(check.checked) {
//             totalPayment.innerHTML = totalprice
//         }
//     }
// })

// check.addEventListener('click', function() {
//     if (this.checked && amount === '1') {
//         totalPayment.innerHTML = total.innerHTML
//         console.log(total.innerHTML)
//     }
//     else if (this.checked) {
//         totalPayment.innerHTML = totalprice
//     }
//     else if (!this.check) {
//         totalPayment.innerHTML = 0
//     }
//     else {
//         totalPayment.innerHTML = 0
//     }
// })


// amountElement.addEventListener('input', () => {
//     var tmp = amountElement.value
//     quantity = parseInt(tmp)
//     totalprice = price * quantity
//     total.innerHTML = totalprice
//     if(check.checked) {
//         totalPayment.innerHTML = totalprice
//     }
// })


function changeQuantity(action, quantityInput) {
    var currentQuantity = parseInt(quantityInput.value, 10);

    if (action === "minus" && currentQuantity > 1) {
        currentQuantity--;
    } else if (action === "plus") {
        currentQuantity++;
    }

    quantityInput.value = currentQuantity;
}

// Lấy tất cả các phần tử có class "quantity-control"
var quantityControls = document.querySelectorAll('.cart');

// Lặp qua từng phần tử và gán sự kiện onclick
quantityControls.forEach(function(control) {
    var minusButton = control.querySelector('.minus');
    var plusButton = control.querySelector('.plus');
    var quantityInput = control.querySelector('.quantity');

    minusButton.onclick = function() {
        changeQuantity("minus", quantityInput);
    };

    plusButton.onclick = function() {
        changeQuantity("plus", quantityInput);
    };
});

