
function ShowHidenPass() {
    const show = document.getElementById('login_showPass--icon')
    const pass = document.getElementById('passWord')
    const hidenPass = document.getElementById("login_hidenPass--icon");
    if(pass.type == 'text') {
        pass.type = 'password';
        hidenPass.style.display = "block";
        show.style.display = "none";
    }
    else {
        pass.type = 'text';
        hidenPass.style.display = "none";
        show.style.display = "block";
    }
}