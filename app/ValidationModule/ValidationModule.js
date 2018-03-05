const emailValidationRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validateEmail = (email) => {
   return emailValidationRegExp.test(String(email).toLocaleLowerCase());
}

const passwordValidationRegExp = /^(?=.*\d).{4,}$/

const validatePassword = (password) => {
   return passwordValidationRegExp.test(String(password).toLocaleLowerCase());
}

module.exports = {
    validateEmail,
    validatePassword
}
