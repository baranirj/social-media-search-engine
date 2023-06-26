
var email_id=document.getElementById("email");
var password=document.getElementById("password");
var form_2=document.getElementById("login_form")


// function display(){
//    document.getElementById("register").style.display="none"
// }

// document.getElementById("loginClick").addEventListener("click", display)
// function display(){
//     document.getElementById("register").style.display="block";
//     document.getElementById("login").style.display  ="none";
// }
    
form_2.addEventListener("submit", (e) => {
    var data = { email_id: email_id.value, password:password.value }
    fetch('http://localhost:3000/api/v1/login', {
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
  
    

})







function loginmodule(data){

}