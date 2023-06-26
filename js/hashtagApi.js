const APIURL = "https://api.github.com/users/";
const search = document.getElementById("search-3");
const form = document.getElementById("form-3");
const Social_Search = "https://api.social-searcher.com/v2/users?";
const APISocial = "deac8b5598ef2545a6b1dec5bbae52ba";
const APIKey = "d5a3b24b86msh040f5a74f539948p18082bjsnaac02aa9047b";
var YouTube =
  "https://www.freepnglogos.com/uploads/youtube-circle-icon-png-logo-14.png";
var user_length = [];
var sentiment_lenth = [];
var positive = 0;
var negative = 0;
var neutral = 0;
var images =[];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  $(".navbar-2").show()

  const user = search.value;
  getHashtag(Head, user, APISocial, "youtube");
  getHashtag(Head, user, APISocial, "instagram");
  getHashtag(Head, user, APISocial, "twitter");
  getHashtag(Head, user, APISocial, "linkedin");
  var startTime = new Date().getTime();
  var interval = setInterval(function () {
    if (new Date().getTime() - startTime > 10000) {
      clearInterval(interval);
      return;
    } else {
      graph();
      console.log(positive, negative, neutral);
    }
    //do whatever here..
  }, 1000);
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
    ["instagram", user_length[1], "green"],
    ["youtube", user_length[2], "yellow"],
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
const Head = {
  method: "GET",
};
async function getHashtag(options, user, APISocial, network) {
  var URL1 = `https://api.social-searcher.com/v2/search?q=${user}&key=${APISocial}&network=${network}`;
  fetch(URL1, options)
    .then((response) => response.json())
    .then((response) => {
      user_length.push(response.posts.length);
      console.log("facebook :", response.posts);
      if (network == "twitter") {
        createHashtag(response.posts, network);

      } else if (network == "instagram") {
        createHashtagInsta(response.posts, network);
      } else if (network == "youtube") {
        createHashtag(response.posts, network);
      }
    })
    .catch((err) => console.error(err));
}

let container = document.querySelector(".main-3");
function createHashtagInsta(response, network) {
  if (network == "twitter") {
    var facebook_img = `https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-in-blue-circle-design-twitter-icon-15.png`;
  } else if (network == "instagram") {
    var facebook_img = `https://img.icons8.com/color/48/000000/instagram-new--v1.png`;
  }

  for (let i = 0; i < response.length; i++) {
    var lang_2=response[i].lang;
    const base64 = "https://www.kindpng.com/picc/m/24-248383_ffentlich-bestellter-und-vereidigter-sachverstndiger-hd-png-download.png";
    images.push(base64)
    if (response[i].sentiment == "positive") {
      positive = positive + 1;
    } else if (response[i].sentiment == "negative") {
      negative = negative + 1;
    } else {
      neutral = neutral + 1;
    }
    let div = document.createElement("div");
    div.classList.add(
      "m-3",
      "col-xl-3",
      "col-lg-3",
      "col-md-2",
      "wow",
      "zoomIn",
      "justify-content-center",
      "container-div",`${network}`,`${lang}`
    );
    div.innerHTML = `
                                            <div class=" wow zoomIn justify-content-center"
                            style="visibility: visible; animation-name: zoomIn;">
                            <div class="" data-wow-delay="0.3s id=" 1"="">
                           
                                <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                                <img class="twitter-logo image-22" src=${facebook_img} width="200" alt="twitter logo in blue circle design, twitter icon"/>
                                    <div class="text-bio">
                                        
                                        <p>${response[i].text}
                                        </p>
                                        
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <img class="img-fluid flex-shrink-0 rounded-circle" src=${base64}
                                            style="width: 50px; height: 50px;">
                                        <div class="user text-left">
                                            <h6 class=" mb-1">${response[i].user.userid}</h6>
                                            
                                            <a class="btn px-3 mt-auto mx-auto" href=${response[i].url}> Profile Page</a>
                                        </div>
                                        
                                        
                                    </div>
    
                                </div>
                            </div>
                        </div>`;
    container.appendChild(div);
  }
}
function createHashtag(response, network) {
  console.log(response, network);
  if (network == "twitter") {
    var facebook_img = `https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-in-blue-circle-design-twitter-icon-15.png`;
  } else {
    var facebook_img = YouTube;
  }
  for (let i = 0; i < response.length; i++) {
   
    if (network == "twitter") {
      var user_image = response[i].user.image;
      var lang=response[i].lang
      images.push(user_image)
    } else if (network == "youtube") {
      var user_image = response[i].image;
      var lang=response[i].lang;
      images.push(user_image)
    }
    if (response[i].sentiment == "positive") {
      positive = positive + 1;
    } else if (response[i].sentiment == "negative") {
      negative = negative + 1;
    } else {
      neutral = neutral + 1;
    }
    let div = document.createElement("div");
    div.classList.add(
      "m-3",
      "col-xl-3",
      "col-lg-3",
      "col-md-2",
      "wow",
      "zoomIn",
      "justify-content-center",
      "container-div",`${network}`,`${lang}`
    );
    div.innerHTML = `
                        <div class="  wow zoomIn justify-content-center"
                        style="visibility: visible; animation-name: zoomIn;">
                        <div class="" data-wow-delay="0.3s id=" 1"="">
                       
                            <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                            <img class="twitter-logo" src=${facebook_img} width="200" alt="twitter logo in blue circle design, twitter icon"/>
                                <div class="text-bio">

                                    <p>${response[i].text}
                                    </p>
                                </div>
                                <div class="d-flex align-items-center">
                                    <img class="img-fluid flex-shrink-0 rounded-circle" src=${user_image}
                                        style="width: 50px; height: 50px;">
                                    <div class="user text-left search">
                                        <h6 class=" mb-1">${response[i].user.name}</h6>
                                        
                                        <a class="btn px-3 mt-auto mx-auto" href=${response[i].url}>Profile Page</a>
                                    </div>
                                  
                                    
                                </div>

                            </div>
                        </div>
                    </div>`;
    container.appendChild(div);
  }
}
// *********image Url convert to basse 64

function loadImage(name) {
  var url = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg';
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

//  ********search 

$(document).ready(function(){
  $("#Input").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#main-3 .text-bio p").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
   
  }); 
});



var fixmeTop = $('#navbar-2').offset();
$(window).scroll(function() {
    var currentScroll = $(window).scrollTop();
    if (currentScroll >= fixmeTop) {
        $('#navbar-2').css({
            position: 'fixed',
            top: '0',
            left: '0'
        });
    } else {
        $('#navbar-2').css({
            'position': 'static'
        });
    }
});



$("#imclick").click(function(){

  var image_container=document.getElementById("im")
  for (let i = 0; i < images.length; i++) {
    let div = document.createElement("div");
    div.classList.add("image-1")
    div.innerHTML = `
                        <div class=" wow zoomIn justify-content-center "
                        style=" animation-name: zoomIn;">
                           <img src=${images[i]} />
                    </div>`;
                    image_container.appendChild(div);               
  }  
  $(".instagram").hide();
  $(".twitter").hide();
  $(".youtube").hide();
  $(".facebook").hide();
  $("#graph").hide();
  $(".image-1").show();
  
})
  // else {
  //   x.style.display = "none";
  // }

  $("#en").click(function(){
    $(".ta").show();
    $(".te").hide();
    $(".kn").hide();
    $(".en").hide();
    $(".hi").hide();
    $("#graph").hide();
});
$("#twit").click(function(){
  $(".ta").hide();
    $(".te").show();
    $(".kn").hide();
    $(".en").hide();
    $(".hi").hide();
    $("#graph").hide();
});
$("#fa").click(function(){
  $(".ta").hide();
  $(".te").hide();
  $(".kn").hide();
  $(".en").show();
  $(".hi").show();
  $("#graph").hide();
});
$("#you").click(function(){
  $(".ta").hide();
  $(".te").hide();
  $(".kn").show();
  $(".en").show();
  $(".hi").hide();
  $("#graph").hide();
});
$("#all").click(function(){
  $(".ta").show();
  $(".te").show();
  $(".kn").show();
  $(".en").show();
  $(".hi").show();
  $("#graph").show();
});
$("#all1").click(function(){

   $(".image-1").hide();
  $(".instagram").show();
  $(".twitter").show();
  $(".youtube").show();
  $(".facebook").show();
  $("#graph").show();
 
});

$(".navbar-2").hide()



