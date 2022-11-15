function login(username, password, email){
    setCookie("username", username, 186);
    setCookie("password", password, 186);
    setCookie("email", email, 186);
    if(checkCookie()){
        window.location.href = "/cloud/home.html";
    } else{
        window.location.reload();
    }
};

function setLogin(){
    password = document.getElementById("loginEmail");
    email = document.getElementById("loginPassword");
    username = document.getElementById("loginName");
    login(username, password, email);
};

function setRegister(){
    password = document.getElementById("registerEmail");
    email = document.getElementById("registerPassword");
    username = document.getElementById("registerName");
    login(username, password, email);
};

function switchToLogin(){
    loginDiv = document.getElementById("LOGIN");
    registerDiv = document.getElementById("SIGNUP");
    if(!loginDiv.classList.contains("active")){
        loginDiv.classList.add("active")
        registerDiv.classList.add("inactive")
    };
};

function switchToRegister(){
    loginDiv = document.getElementById("LOGIN");
    registerDiv = document.getElementById("SIGNUP");
    if(loginDiv.classList.contains("active")){
        loginDiv.classList.remove("active")
        registerDiv.classList.remove("inactive")
    };
};