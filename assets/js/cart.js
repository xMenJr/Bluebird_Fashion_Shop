// Contact

function openContact() {
    var overlay = document.getElementById('overlay')
    var contact = document.getElementById('contact');
    overlay.style.display = 'block';
    contact.style.display = 'block';
}
  
function closeContact() {
    var overlay = document.getElementById('overlay')
    var contact = document.getElementById('contact');
    overlay.style.display = 'none';
    contact.style.display = 'none';
}

// Tính tiền từng sản phẩm

const plusButton = document.querySelectorAll('.plus')

plusButton.forEach(plus => {
    plus.onclick = function() {
        document.querySelector('.plus.main').classList.remove('main')
        this.classList.add('main')
        
    }
})