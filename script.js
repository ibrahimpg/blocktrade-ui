//add ability to post multiple images, ability to click on image in post and swipe through multiple images, filter top
//image so that images aren't so jarring on the page and fit in more with brand

//think of anti-spam measures in general, validation of inputs, etc
//also make Account and Post Ad render on the UI by display: none others and disply: block themselves (instead of modals)
//maybe give accounts a max # of concurrent ad postings at any one time (later on can pay to increase limit?)

//make city filter case-insensitive

//add searchbar/key terms - basically just a filter for "content"

//--------------------------------------------------------------------------->
//global inits
let token = sessionStorage.getItem("token");
let id = sessionStorage.getItem("id");
console.log(token + " " + id);
let searchLimit = 10;
let StateFilter = document.querySelector('select[name="StateFilter"]').value;
let CryptoFilter = document.querySelector('select[name="CryptoFilter"]').value;
let CategoryFilter = document.querySelector('select[name="CategoryFilter"]').value;
let CityFilter = "A_L_L-CITY";
let ContentFilter = "";
let HiddenPosts = [];
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//GET all ads and render into contentList AKA the front page AKA our web app
function fetchAds() {
  let token = localStorage.getItem('token');
fetch('https://protected-dusk-41462.herokuapp.com/api/articles/', {
  headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + token}
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let filtered = data
                    .filter(obj => {return obj.content.toLowerCase().includes(`${ContentFilter}`.toLowerCase())})
                    .filter(obj => {return obj.state.includes(`${StateFilter}`)})
                    .filter(obj => {return obj.crypto.includes(`${CryptoFilter}`)})
                    .filter(obj => {return obj.category.includes(`${CategoryFilter}`)})
                    .filter(obj => {return obj.city.includes(`${CityFilter}`)})
                    .filter(obj => !`${HiddenPosts}`.includes(obj._id));
      document.getElementById("contentList").innerHTML = `
        ${filtered.slice(0,searchLimit).map(ad => `<div style="margin-bottom: 40px; padding: 20px 10px; background-color: var(--brand-color-two); width: 100%;">
        <div class="detailsWrapper">
          <h5>${ad.crypto.join(", ").slice(7, 100)}</h5>
          <h5>${ad.email}</h5>
        </div>
        <br>
        <h3>${ad.content}</h3>
${ad.postImage ? `<br><img src="https://protected-dusk-41462.herokuapp.com/${ad.postImage}" style="width: 100%; max-width: 300px">
<br><br>` : ``}
        <br>
        <div class="detailsWrapper">
          <h5>${ad.city.split(",")[0]}, ${ad.state.split(",")[1]}</h5>
          <h5>${ad.date.slice(0,10)}</h5>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; margin: 0; padding: 0;">
          <h6 id="report" style="cursor:pointer" onclick="reportPost('${ad._id}')">Report</h6>
          <h6 style="padding:0px 2px;">/</h6>
          <h6 id="hide" style="cursor:pointer" onclick="hidePost('${ad._id}')">Hide</h6>
        </div>
        </div>`).join("")}
      `;
  });
}
fetchAds();
//run fetchAds(); every 1 minute or whatever to show real time updates?
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//Load More Posts button. fetchAds uses searchLimit as max number of posts in .slice method
function listenLoad() {
  document.getElementById("load").addEventListener("click", function() {
  if (searchLimit < 1000) {
    searchLimit += 10;
  } else {
    document.getElementById("load").innerHTML = "Limit Reached";
  }
    fetchAds();
  });
}
listenLoad();
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//hide post functionality, triggered from within GET ALL POSTS template literal .map rendering
function hidePost(adId) {
  HiddenPosts.push(adId);
  fetchAds();
}
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//toggle "Post Ad" form display
function listenToggle() {
  const center = document.getElementById("center");
  document.getElementById("togglePost").addEventListener("click", function(){
    if (center.style.display == "block") {
      center.style.display = "none";
    } else {
      center.style.display = "block";
    }
  });
};
listenToggle();
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//count the number of chars remaining in textarea
let textBox = document.getElementById("tArea");
let someVar = textBox.value.length + "chars left";
document.getElementById("tArea").addEventListener("keyup", () => {
  someVar = 320 - textBox.value.length; 
  document.getElementById("charsLeft").innerHTML = someVar + " chars left";

  if (someVar < 20) {
    document.getElementById("charsLeft").style.color = "red";
  } else {
    document.getElementById("charsLeft").style.color = "black";
  }
});
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//listen for changes to the various filter options in filterBox.js
document.getElementById("ContentFilter").addEventListener("keyup", () => {
  ContentFilter = document.querySelector('input[name="ContentFilter"]').value; 
  fetchAds();
});
document.getElementById("StateFilter").addEventListener("change", () => {
  StateFilter = document.querySelector('select[name="StateFilter"]').value; 
  fetchAds();
});
document.getElementById("CryptoFilter").addEventListener("change", () => {
  CryptoFilter = document.querySelector('select[name="CryptoFilter"]').value; 
  fetchAds();
});
document.getElementById("CategoryFilter").addEventListener("change", () => {
  CategoryFilter = document.querySelector('select[name="CategoryFilter"]').value;
  fetchAds();
});
document.getElementById("CityFilter").addEventListener("keyup", () => {
if (document.querySelector('input[name="CityFilter"]').value == "") {
  CityFilter = "A_L_L-CITY";
} else {
  CityFilter = document.querySelector('input[name="CityFilter"]').value;
}
fetchAds();
});
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//report post functionality
function reportPost(reportedId){
  document.getElementById("reportId").value = reportedId;
  document.getElementsByClassName("modal")[3].style.display = "block";
  document.getElementsByClassName("closeBtn")[3].addEventListener("click", function(){
    document.getElementsByClassName("modal")[3].style.display = "none";
  });
}
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//fetch articles made by the logged in user in their My Account section
function fetchMyArticles() {
fetch("https://protected-dusk-41462.herokuapp.com/api/articles/myposts/", {
  headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + token}
  })
  .then((response) => response.json())
  .then((data) => {
      document.getElementById("myaccountstuff").innerHTML = `
        <div style="height: 50vh; overflow:scroll; overflow-x: hidden;">
        ${data.map(myListings => `
<h3>${myListings.content}<br>
<span style="color:red; cursor:pointer;" onclick="deletePost('${myListings._id}')"> Delete</span></h3>
<br>
        `).join("")}
        </div><br>
        <h5 style="color: var(--brand-color-three);" onclick="deleteUser()"><span style="cursor: pointer;">Delete My Account</span></h5>
      `;
  });
}
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//delete post functionality
function deletePost(postid){
  fetch("https://protected-dusk-41462.herokuapp.com/api/articles/"+postid,
  {method: 'DELETE', headers: {'Authorization': "Bearer " + token }} )
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  fetchMyArticles();
  fetchMyArticles();
  fetchAds();
  fetchAds();
  });
}
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//delete user functionality
function deleteUser(){
  fetch("https://protected-dusk-41462.herokuapp.com/api/users/",
  {method: 'DELETE', headers: {'Authorization': `Bearer ${token}`}})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  sessionStorage.clear();
  window.location.replace('https://blocktrade.ibrahimpg.com');
  })
}
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
//render how various aspects of the UI appear depending on logged in or not
document.getElementById("jwt").value = token;
function renderUI(){
  let token = sessionStorage.getItem('token');
  if (token === null) {
    document.getElementById("LogRegNav").innerHTML = `<p id="login">Login</p><p id="register">Register</p>`;
    //opening
    document.getElementById("login").addEventListener("click", () => {
      document.getElementsByClassName("modal")[0].style.display = "block";
    });
    document.getElementById("register").addEventListener("click", () => {
      document.getElementsByClassName("modal")[1].style.display = "block";
    });
    //closing
    document.getElementsByClassName("closeBtn")[0].addEventListener("click", function(){
      document.getElementsByClassName("modal")[0].style.display = "none";
    });
    document.getElementsByClassName("closeBtn")[1].addEventListener("click", function(){
      document.getElementsByClassName("modal")[1].style.display = "none";
    });
    //render POST functionality as "Login to post"
    document.getElementById("center").innerHTML = `<h1>Register or Log in to make a post!</h1>`
  } else {
    //myaccount
    document.getElementById("LogRegNav").innerHTML = `<p id="myAccount">Account</p><p id="logout">Logout</p>`;
    //logout
    document.getElementById("logout").addEventListener("click", () => {
      sessionStorage.clear();
      window.location.replace('https://blocktrade.ibrahimpg.com');
    });
    //view account details
    document.getElementById("myAccount").addEventListener("click", () => {
      document.getElementsByClassName("modal")[2].style.display = "block";
    });
    //close account details
    document.getElementsByClassName("closeBtn")[2].addEventListener("click", function(){
      document.getElementsByClassName("modal")[2].style.display = "none";
    });
    fetchMyArticles();
  }
};
renderUI();
//--------------------------------------------------------------------------->