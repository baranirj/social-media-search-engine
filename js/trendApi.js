const APIURL = "https://api.github.com/users/";
const search = document.getElementById("search-2");
const form = document.getElementById("form-2");
const Social_Search = "https://api.social-searcher.com/v2/users?";
const APISocial = "deac8b5598ef2545a6b1dec5bbae52ba";
const APIKey = "c43a80a032cf700d353027a6f17f9df5";
var YouTube =
  "https://www.freepnglogos.com/uploads/youtube-circle-icon-png-logo-14.png";
var container = document.querySelector(".main-2");
var user_length = [];
var sentiment_lenth = [];
var positive = 0;
var negative = 0;
var neutral = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  $(".navbar-2").show()

  const user = search.value;
  getUserFaceBook(facebookHead, user, APISocial, "twitter");
  getUserFaceBook(facebookHead, user, APISocial, "youtube");
  getUserFaceBook(facebookHead, user, APISocial, "instagram");
  var startTime = new Date().getTime();
  var interval = setInterval(function () {
    if (new Date().getTime() - startTime > 8000) {
      clearInterval(interval);
      return;
    } else {
      graph();
      console.log(positive, negative, neutral);
    }
    //do whatever here..
  }, 2000);
});

// ******* Instagram ********
function graph() {
  var arr_data_1 = [
    ["Task", "recent Treanding sentiment"],
    ["Positive", positive],
    ["Negative", negative],
    ["Netural", neutral],
  ];
  function drawChart1() {
    var data_1 = google.visualization.arrayToDataTable(arr_data_1);

    var options_1 = {
      title: "sentiment Analysis",
      is3D: true,
    };

    var chart_1 = new google.visualization.PieChart(
      document.getElementById("piechart_3d")
    );
    chart_1.draw(data_1, options_1);
  }

  var arr_data = [
    ["Element", "users", { role: "style" }],
    ["twitter", user_length[0], "red"],
    ["youtube", user_length[1], "green"],
    ["instagram", user_length[2], "yellow"],
  ];
  console.log(arr_data);
  google.charts.load("current", { packages: ["bar"] });
  google.charts.setOnLoadCallback(drawChart);
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart1);
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

const facebookHead = {
  method: "GET",
};
async function getUserFaceBook(options, user, APISocial, network) {
  const URL1 = `https://api.social-searcher.com/v2/trends?q=${user}&key=${APISocial}&network=${network}`;
  console.log(URL1);
  fetch(URL1, options)
    .then((response) => response.json())
    .then((response) => {
      console.log("facebook :", response);
      if (network == "twitter" || network == "youtube") {
        createUserFaceBook(response.posts, network);
        user_length.push(response.posts.length);
      } else {
        createUserFaceBook(response, network);
        user_length.push(response.length);
      }
    })
    .catch((err) => console.error(err));
}

function createUserFaceBook(response, network) {
  if (network == "twitter") {
    var lang1=response[i].lang;
    var facebook_img =
      "img/twitter-logo-in-blue-circle-design-twitter-icon-15.png"; 
  } else if (network == "instagram") {
    var facebook_img = `https://img.icons8.com/color/48/000000/instagram-new--v1.png`;
    var lang1=response[i].lang;
  } else {
    var facebook_img = YouTube;
    var lang1=response[i].lang;
  }
  for (let i = 0; i < response.length; i++) {
    if (network == "twitter") {
      var lang=response[i].lang
      var user_image = response[i].user.image;
      var user_name = response[i].user.name;
      var url = response[i].user.url;
      var like = response[i].popularity[1].count;
      var comment = response[i].popularity[0].count;
      if (response[i].sentiment == "positive") {
        positive = positive + 1;
      } else if (response[i].sentiment == "negative") {
        negative = negative + 1;
      } else {
        neutral = neutral + 1;
      }
    } else if (network == "instagram") {
      var lang=response[i].lang
      var user_name = response[i].user.userid;
      console.log("the image is working",response[i].image)
      var user_image = "https://www.kindpng.com/picc/m/24-248383_ffentlich-bestellter-und-vereidigter-sachverstndiger-hd-png-download.png";
      var url = response[i].url;
      var like = response[i].popularity[1].count;
      var comment = response[i].popularity[0].count;
      if (response[i].sentiment == "positive") {
        positive = positive + 1;
      } else if (response[i].sentiment == "negative") {
        negative = negative + 1;
      } else {
        neutral = neutral + 1;
      }
    } else {
      var user_image = response[i].image;
      var user_name = response[i].user.name;
      var url = response[i].user.url;
      var like = 0;
      var comment = 0;
      if (response[i].sentiment == "positive") {
        positive = positive + 1;
      } else if (response[i].sentiment == "negative") {
        negative = negative + 1;
      } else {
        neutral = neutral + 1;
      }
    }

    let div = document.createElement("div");
    div.classList.add("d-flex", "justify-content-center", "mt-5",`${lang}`);
    div.innerHTML = `
                                        <div class="col-lg-8 col-md-6 wow zoomIn justify-content-center"
                        style="visibility: visible; animation-name: zoomIn;">
                        <div class="" data-wow-delay="0.3s id=" 1"="">
                       
                            <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                            <img class="twitter-logo1 image-2" src=${facebook_img} width="200" alt="twitter logo in blue circle design, twitter icon" />
                                <div class="text-bio">
                                    <p>${response[i].text}
                                    </p>
                          
                                </div>
                                <div class="d-flex align-items-center">
                                    <img class="img-fluid flex-shrink-0 rounded-circle" src=${user_image}
                                        style="width: 50px; height: 50px;">
                                    <div class="user text-left">
                                        <h6 class=" mb-1">${user_name}</h6>
                                        <a class="url" href=${url}>${url}</a>
                                    </div>
                                    <div class="">
                                        <img src="asstes/social-logo/heart-svgrepo-com.svg" class="m-2" width="6%"
                                            alt="">
                                        <span>${like}</span>
                                    </div>
                                    <div class="">
                                        <img src="asstes/social-logo/retweet-svgrepo-com.svg" class="m-2" width="6%"
                                            alt="">
                                        <span>${comment}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>`;
    container.appendChild(div);
  }
}

function loadImage(element) {
  console.log("the function calling is working")
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
  console.log(encodeURI(t))
  return encodeURI(t);
}
$(".navbar-2").hide()
