const signUpButton = document.getElementById('signUp')
const signInButton = document.getElementById('signIn')
const container = document.getElementById('container')

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active")
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active")
});

const campos = document.querySelectorAll('.required')
const spans = document.querySelectorAll('.span-required')
const spansNull = document.querySelectorAll('.spans-null')
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const spanInvalid = document.getElementsByClassName('span-invalid')

function login(){
    firebase.auth().signInWithEmailAndPassword(forms.emailLogin().value, forms.passwordLogin().value).then(response => {
        console.log('success', response)
        window.location.href = "index.html"
    }).catch(error => {
        console.log('error', error)
        getErrorMessage(error)
    })

}

function getErrorMessage(error){
    if (error.code == "auth/wrong-password"){
        campos[3].style.border = '2px solid #e63636'
        campos[4].style.border = '2px solid #e63636'
        spanInvalid[1].style.display = 'block'
    }

    if (error.code == "auth/invalid-email"){
        campos[3].style.border = '2px solid #e63636'
        spanInvalid[0].style.display = 'block'
    }
}

function register(){
    if(userValidate() && emailValidate() && mainPasswordValidate()){
        window.location.href = "index.html"
    }
}

btn.addEventListener('click', (event) =>{
    event.preventDefault()
    userValidate()
    emailValidate()
    mainPasswordValidate()
})

function nullField(login_cadastro){
    campos[login_cadastro].style.border = '2px solid #e63636'
    spansNull[login_cadastro].style.display = 'block'
    spans[login_cadastro].style.display = 'none'
}

function setEror(login_cadastro){
    campos[login_cadastro].style.border = '2px solid #e63636'
    spans[login_cadastro].style.display = 'block'
    spansNull[login_cadastro].style.display = 'none'
}

function removeError(login_cadastro){
    campos[login_cadastro].style.border = ''
    spans[login_cadastro].style.display = 'none'
}

function userValidate(){
    const user = forms.user().value

    if(!user){
        nullField(0)
        return false
    }else if(campos[0].value.length < 3){
        setEror(0)
        return false
    }else{
        removeError(0)
        return true
    }
}

function emailValidate(){
    const email = forms.emailRegister().value

    if(!email){
        nullField(1)
        return false
    }else if(!emailRegex.test(campos[1].value)){
        setEror(1)
        return false 
    }else{
        removeError(1)
        return true 
    }
}

function mainPasswordValidate(){
    const password = forms.passwordRegister().value

    if(!password){
        nullField(2)
        return false
    }else if(campos[2].value.length < 8){
        setEror(2)
        return false
    }else{
        removeError(2)
        return true
    }
}


const forms = {
    user: () => document.getElementById('user'),
    emailRegister: () => document.getElementById('emailRegister'),
    passwordRegister: () => document.getElementById('passwordRegister'),
    emailLogin: () => document.getElementById('emailLogin'),
    passwordLogin: () => document.getElementById('passwordLogin')
}