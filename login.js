let lEmail = document.getElementById("loginEmail").value;
let lPW = document.getElementById("loginPW").value;

let rEmail = document.getElementById("regEmail").value;
let rPW = document.getElementById("regPW").value;

let loginURL = "https://protected-dusk-41462.herokuapp.com/api/users/login";
let loginData = {loginEmail: `${lEmail}`, loginPW: `${lPW}`};

let registerURL = "https://protected-dusk-41462.herokuapp.com/api/users/register";
let registerData = {regEmail: `${rEmail}`, regPW: `${rPW}`};

//listening for value changes in the text fields of login/register
function listenLoginEmailChange() {
    document.getElementById("loginEmail").addEventListener("change", function(){
      lEmail = document.getElementById("loginEmail").value;
          //console.log(lEmail);
    });
};
listenLoginEmailChange();

function listenLoginPWChange() {
    document.getElementById("loginPW").addEventListener("change", function(){
      lPW = document.getElementById("loginPW").value;
          //console.log(lPW);
    });
};
listenLoginPWChange();

function listenRegEmailChange() {
    document.getElementById("regEmail").addEventListener("change", function(){
      rEmail = document.getElementById("regEmail").value;
          //console.log(rEmail);
    });
};
listenRegEmailChange();

function listenRegPWChange() {
    document.getElementById("regPW").addEventListener("change", function(){
      rPW = document.getElementById("regPW").value;
          //console.log(rPW);
    });
};
listenRegPWChange();

//firing off the post fetch requests
function listenLogin() {
  document.getElementById("loginClick").addEventListener("click", postLogin);
};
listenLogin();

function listenRegister() {
  document.getElementById("registerClick").addEventListener("click", postRegister);
};
listenRegister();

function postLogin () {
  loginData = {loginEmail: `${lEmail}`, loginPW: `${lPW}`};
  fetch(loginURL, {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers:{'Content-Type': 'application/json'}
  })
.then(res => res.json())
.then((data) => {
  if (data.message.includes("Successful")) {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("id", data.id);
    document.getElementById("loginMessage").innerHTML = `${data.message}`
    window.location.replace('https://blocktrade.ibrahimpg.com');
  } else {
    document.getElementById("loginMessage").innerHTML = `${data.message}`
  }
})
}

function postRegister () {
  registerData = {regEmail: `${rEmail}`, regPW: `${rPW}`};
  fetch(registerURL, {
    method: 'POST',
    body: JSON.stringify(registerData),
    headers:{'Content-Type': 'application/json'}
  })
.then(res => res.json())
.then((data) => {
  //console.log(data);
  if (data.message.includes("Created")) {
    document.getElementById("regMessage").innerHTML = `${data.message}<br><br>You may now log in with your new account.`
  } else {
    document.getElementById("regMessage").innerHTML = `${data.message}`
  }
})
}





// formData crap that refuses to work with multer
/*
//initializing Post Ad variables
let formContent = "";
let formState = "";
let formCity = "";
let formEmail = "";
let formCategory = "";
let formCrypto = Array.from(document.querySelectorAll(".checks"))
          .filter(input => input.checked)
          .map(input => [input.checked && input.value]);
let formCryptoSplitted = [];
let fileInput = document.getElementById("imgInput");
let file = "";

//listening for value changes in the Post Ad box
function formDataChange() {
    document.getElementById("tArea").addEventListener("change", function(){
      formContent = document.getElementById("tArea").value;
    });
    document.getElementById("state").addEventListener("change", function(){
      formState = document.getElementById("state").value;
    });
    document.getElementById("city").addEventListener("change", function(){
      formCity = document.getElementById("city").value;
    });
    document.getElementById("email").addEventListener("change", function(){
      formEmail = document.getElementById("email").value;
    });
    document.getElementById("category").addEventListener("change", function(){
      formCategory = document.getElementById("category").value;
    });

    //fileInput.addEventListener("change", function(){
      //file = Array.from(fileInput.files);
      //console.log(file);
    //});

    let checkers = document.querySelectorAll('.checks');
    Array.from(checkers).forEach(bawx => {
        bawx.addEventListener('change', function() {
            formCrypto = Array.from(document.querySelectorAll(".checks"))
              .filter(input => input.checked)
              .map(input => input.checked && input.value);
        });
    });
};
formDataChange();

//listen for POST button
function listenPostArticle() {
  document.getElementById("postArticle").addEventListener("click", postArticle);
};
listenPostArticle();

//fire off POST request
function postArticle () {

let formdata = new FormData();

formdata.append("content", formContent);
formdata.append("state", `A_L_L-S,${formState}`);
formdata.append("city", `${formCity},A_L_L-CITY`);
formdata.append("crypto", formCrypto);
formdata.append("email", formEmail);
formdata.append("category",`ALL-CAT,${formCategory}`);
formdata.append("postImage", fileInput.files[0]);


// fileInput.forEach((f) => {
//   formdata.append("image[]", f);
//   console.log(formdata.image);
// })

  fetch("http://localhost:5000/api/articles/", {
    method: 'POST',
    body: formdata,
    headers:{'Authorization': 'Bearer ' + token}
  })
.then(res => res.json())
.then((data) => {
  console.log(data);
  fetchAds();
  fetchAds();
  console.log("https://facebook.com");
})

}*/