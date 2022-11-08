
var myApp = angular.module("myApp", []);
// Register Service
myApp.service("RegisterService" , function(){
    var uid = 1;
    var users = [{
        'id' : 0,
        'name' : '',
        'email' : '',
        'password': '',
        'phone' : ''}];

    // Save User
    this.save = function(user)
    {
        if(user.id == null)
        {
            user.id = uid++;
            users.push(user);
        }
        else
        {
            for(var i in users)
            {
                if(users[i].id == user.id)
                {
                    users[i] = user;
                }
            }
        }
    };

    // List Users
    this.list = function()
    {
        return users;
    };
});

// Register Controller
myApp.controller("RegisterController" , function($scope , RegisterService){
    console.clear();
    $scope.ifSearchUser = false;
    $scope.title ="User List";
    $scope.users = RegisterService.list();
    $scope.saveUser = function()
    {
        console.log($scope.newuser);
        if($scope.newuser == null || $scope.newuser == angular.undefined)
            return;
        RegisterService.save($scope.newuser);
        $scope.newuser = {};
    };
})

let css=(css) => document.querySelector(css);

const usernameEl = css('#username'),
emailEl = css('#email'),
passwordEl = css('#password'),
confirmPasswordEl = css('#confirm-password'),
form = css('#signup');

const checkUsername = () => {
    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if(!isRequired(username)){
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length,min,max)){
        showError(usernameEl,`Username must be beetween ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if(!isRequired(email)){
        showError(emailEl,'Email cannot be blank');
    }else if (!isEmailValid(email)){
        showError(emailEl,'Email is not valid');
    }else{
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if(!isRequired(password)){
        showError(passwordEl,'Password cannot be blank.');
    } else if(!isPasswordSecure(password)){
        showError(passwordEl,'Password must has at least 8 characters that' +
        'include at least 1 lowercase character ....');
    }else{
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};


const isEmailValid = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}

const isRequired = value => value === '' ? false : true;
const isBetween = (length,min,max) => length < min || length > max ? false : true;

const showError = (input,message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
};

form.addEventListener('submit',function(e){
    e.preventDefault();

    let isUsenameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsenameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if(isFormValid){

    }
});

const debounce = (fn,delay = 1) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        },delay);
    };
};

form.addEventListener('input',debounce(function(e){
    switch(e.target.id){
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));
