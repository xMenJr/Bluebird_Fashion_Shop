const show = document.querySelector('.login_showPass--icon')

const hide = document.querySelector('.login_hidePass--icon')

const pass = document.querySelector('#passWord')


show.addEventListener('click', function() {
    if(pass.type == 'text') {
        pass.type = 'password'
        show.style.display = 'none'
        hide.style.display = 'block'
    }
    else {
        pass.type = 'text'
        show.style.display = 'block'
        hide.style.display = 'none'
    }
})

hide.addEventListener('click', function() {
    if(pass.type == 'password') {
        pass.type = 'text'
        show.style.display = 'block'
        hide.style.display = 'none'
    }
})
