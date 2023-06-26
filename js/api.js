const APIURL = "https://api.github.com/users/";
const GitLogo = `https://img.icons8.com/color-glass/48/000000/github--v1.png`;
const instaLogo = `https://img.icons8.com/color/48/000000/instagram-new--v1.png`;
const linkinLogo = `iconmonstr-linkedin-5.svg`;
const TwitterLogo = `https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-in-blue-circle-design-twitter-icon-15.png`;
const FacebookLogo = `iconmonstr-facebook-4.svg`;
const search = document.getElementById("search");
const main = document.getElementById("main");
const form = document.getElementById("form");
const Social_Search = "https://api.social-searcher.com/v2/users?";
const APISocial = "deac8b5598ef2545a6b1dec5bbae52ba";
const APIKey = "c43a80a032cf700d353027a6f17f9df5";
var gitUser = 0;
var instaUser = 0;
var faceUser = 0;
var LinkedinUser = 0;
var twitter = 0;
// ******* Instagram ********
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  //   getUserInsta(InstaHead, user);
  getUserFaceBook(facebookHead, user, APISocial, "facebook");
  getUserFaceBook(facebookHead, user, APISocial, "linkedin");
  getUserInsta(user);
  getUsertwitter(user);
  getGitUser(user);
  var startTime = new Date().getTime();
  var interval = setInterval(function () {
    if (new Date().getTime() - startTime > 9000) {
      clearInterval(interval);
      return;
    } else {
      graph();
    }
    //do whatever here..
  }, 3000);
});
const facebookHead = {
  method: "GET",
};
async function getUserFaceBook(options, user, APISocial, network) {
  const URL1 = `https://api.social-searcher.com/v2/users?q=${user}&key=${APISocial}&network=${network}`;
  console.log(URL1);
  fetch(URL1, options)
    .then((response) => response.json())
    .then((response) => {
      if (network == "facebook") {
        faceUser = response.posts.length;
      } else {
        LinkedinUser = response.posts.length;
      }
      createUserFaceBook(response.posts, network);
    })
    .catch((err) => console.error(err));
}

function graph() {
  var arr_data = [
    ["Element", "users", { role: "style" }],
    ["twitter", twitter, "red"],
    ["instagram", instaUser, "green"],
    ["linkedin", LinkedinUser, "yellow"],
    ["facebook", faceUser, "yellow"],
    ["github", gitUser, "yellow"],
  ];
  console.log(
    "insta",
    instaUser + "twitter",
    twitter + "face",
    faceUser + "linked",
    LinkedinUser + "github",
    gitUser
  );
  google.charts.load("current", { packages: ["bar"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(arr_data);

    var options = {
      chart: {
        title: "Trends User data Graph",
        subtitle: "",
      },
    };

    var chart = new google.charts.Bar(
      document.getElementById("columnchart_material")
    );

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}
// ********* facebook *******
function getUserInsta(user) {
  const options1 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d5a3b24b86msh040f5a74f539948p18082bjsnaac02aa9047b",
      "X-RapidAPI-Host": "instagram-looter2.p.rapidapi.com",
    },
  };
  fetch(
    `https://instagram-looter2.p.rapidapi.com/profile?username=${user}`,
    options1
  )
    .then((response) => response.json())
    .then((response) => {
      var base64 = "https://www.kindpng.com/picc/m/24-248383_ffentlich-bestellter-und-vereidigter-sachverstndiger-hd-png-download.png";
      console.log(response);
      createUser(
        response.biography,
        base64,
        response.username,
        instaLogo,
        "www.instagram.com"
      );
    })
    .catch((err) => console.error(err));
}
// ******** twitter ********
function getUsertwitter(user) {
  const options2 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d5a3b24b86msh040f5a74f539948p18082bjsnaac02aa9047b",
      "X-RapidAPI-Host": "twitter135.p.rapidapi.com",
    },
  };

  fetch(`https://twitter135.p.rapidapi.com/AutoComplete/?q=${user}`, options2)
    .then((response) => response.json())
    .then((response) => {
      console.log("twitter :", response);

      twitter = response.users.length;
      createUsertwitter(response.users);
    })
    .catch((err) => console.error(err));
}
//********** github *********

async function getGitUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    console.log(data);

    createUser(data.bio, data.avatar_url, data.login, GitLogo, data.html_url);

    console.log(data.html_url);
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
}

let container = document.querySelector(".main");
function createUser(bio, avatar_url, name, logo, url) {
  if (bio != null && bio != undefined) {
    if (logo == instaLogo) {
      instaUser = 1;
    } else {
      gitUser = 1;
    }

    const userID = name;
    const userBio = bio ? `<p>${bio}</p>` : "";
    const profile = avatar_url;
    const github_img = `asstes/social-logo/${logo}`;
    // for (let i = 0; i <6; i++) {
    let div = document.createElement("div");
    div.classList.add("col-lg-4", "col-md-6", "wow", "zoomIn");
    div.innerHTML = `
                        <div class="" data-wow-delay="0.3s id="1">
                        <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                        <img  src=${logo} class="twitter_user_logo">   
                        <div class="service-icon flex-shrink-0">
                                    <img src="${avatar_url}" alt="${name}" class="avatar">
                            </div>
                            <h5 class="m-1">${userID}</h5>
                            <div >
                            <p height="4rem">${userBio}</p>
                            </div>
                            <a class="btn px-3 mt-auto mx-auto" href=${url}>Go To Profile Page</a>
                        </div>
                    </div>`;
    container.appendChild(div);
  } else {
    return false;
  }
}
// }

function createUserFaceBook(response, network) {
  if (network == "facebook") {
    var facebook_logo2 =
      "https://img.icons8.com/color/48/000000/facebook-circled--v1.png";
    var facebook_img = `https://cdn-icons-png.flaticon.com/512/1177/1177568.png`;
  } else {
    var facebook_logo2 =
      "https://img.icons8.com/color/48/000000/linkedin-circled--v1.png ";
    var facebook_img = `https://cdn-icons-png.flaticon.com/512/1177/1177568.png`;
  }
  for (let i = 0; i < response.length; i++) {
    let div = document.createElement("div");
    div.classList.add("col-lg-4", "col-md-6", "wow", "zoomIn");
    div.innerHTML = `
                                        <div class="" data-wow-delay="0.3s id="1">
                                        <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <img  src=${facebook_logo2} class="twitter_user_logo">  
                                        <div class="service-icon flex-shrink-0">
                                                    <img src=${facebook_img} alt="" class="avatar">
                                            </div>
                                            <h5 class="m-1">${response[i].name}</h5>
                                            <div class="user-info">
                                            </div>
                                            <div class="">
                                            <p>${response[i].description}</p>
                                            </div>
                                            <a class="btn px-3 mt-auto mx-auto" href=${response[i].url}>Go To Profile Page</a>
                                        </div>
                                    </div>`;
    container.appendChild(div);
  }
}

function createUsertwitter(response) {
  const twitter_img =
    "https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-in-blue-circle-design-twitter-icon-15.png";
  for (let i = 2; i < response.length; i++) {
    let div = document.createElement("div");
    div.classList.add("col-lg-4", "col-md-6", "wow", "zoomIn");
    div.innerHTML = `
                                        <div class="" data-wow-delay="0.3s id="1">
                                        <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <img  src=${twitter_img} class="twitter_user_logo">
                                            <div class="service-icon flex-shrink-0">
                                                    <img src=${response[i].profile_image_url_https} alt="" class="avatar">
                                            </div>
                                            <h5 class="m-1">${response[i].screen_name}</h5>
                                            <div class="user-info">
                                            </div>
                                            <div class="">
                                            <p>${response[i].result_context.display_string}</p>
                                            </div>
                                            <a class="btn px-3 mt-auto mx-auto" href="">Go To Profile Page</a>
                                        </div>
                                    </div>`;
    container.appendChild(div);
  }
}

// *********image Url convert to basse 64

function loadImage(element) {
  var url = element;
  p = url.split("/");
  t = "";
  for (let i = 0; i < p.length; i++) {
    if (i == 2) {
      t +=
        p[i].replaceAll("-", "--").replaceAll(".", "-") +
        atob("LnRyYW5zbGF0ZS5nb29n") +
        "/";
    } else {
      if (i != p.length - 1) {
        t += p[i] + "/";
      } else {
        t += p[i];
      }
    }
  }
  return encodeURI(t);
}

fetch('http://localhost:3000/api/v1/get_user', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
    'Authorization':'bXVydWdhOmFtbhbW1hYW1tYTEyM2FhMg',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  