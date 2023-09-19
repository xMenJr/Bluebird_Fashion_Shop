const show = document.querySelector('.login_showPass--icon')

const pass = document.querySelector('#passWord')

show.addEventListener('click', function() {
    if(pass.type == 'text') {
        pass.type = 'password'
    }
    else {
        pass.type = 'text'
    }
})