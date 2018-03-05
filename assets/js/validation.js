window.onload = () => {
    const email = document.querySelector('#login');
    const password = document.querySelector('#pass');
    const passwordConfirm = document.querySelector('#passConf');

    const errorField = document.querySelector('#form-errors');
    

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const passwordRegex =  /^(?=.*\d).{4,}$/;


    email.addEventListener('keyup', (e) => {
        if (
            !emailRegex.test(String(e.target.value).toLocaleLowerCase()) && 
            e.target.value !== ''
        ) {
            
            errorField.innerHTML = 'Неправильный имейл.';
        }
        else {
            errorField.innerHTML = '';
        }
    });

    password.addEventListener('keyup', (e) => {
        if (
            !passwordRegex.test(String(e.target.value).toLocaleLowerCase()) &&
            e.target.value !== ''
        ) {
            errorField.innerHTML = 'Пароль должен содержать цифру и быть длиннее 4 символов.';
        }
        else {
            errorField.innerHTML = '';            
        }
        console.log(passwordRegex.test(String(email).toLocaleLowerCase()))
        
    });

    passwordConfirm.addEventListener('keyup', (e) => {
        if ( 
            e.target.value !== password.value && 
            e.target.value !== '' 
        ) {
            errorField.innerHTML = 'Пароли не совпадают.'
        }
        else {
            errorField.innerHTML = '';            
        }
    });
}