//Fetch API script for usage in the front end pages

//Register a User
document.getElementById("login").addEventListener("click",userLogin);

const modal_view = document.getElementById("modal-item");

function userLogin(){
    type = document.getElementById("account").value;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    
    //Check if data entered correctly
    if( username != "" && password != ""){
        registerUser(username, password, type)

    }else{
        let output =`
        <div class="modal-content">
            <h3 style="color:orange;"> Please ensure all fields are filled</h3>
        </div>
        `;              
    document.getElementById("modal-item").innerHTML = output;
    modal_view.style.display = "block";

    }
}

function registerUser(username, password, type){
    options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            "type": type,
            "name": username,
            "password": password
        }),
        mode: "cors" 
    }

    fetch("http://127.0.0.1:5000/auth/login",options)
    .then((response) => response.json())
      .then((result) => {
          if(result.status == 0){
              let output =`
              <div class="modal-content">
                <h3 style="color:red;"> ${result.response}</h3>
              </div>
              `;              
          document.getElementById("modal-item").innerHTML = output;
          modal_view.style.display = "block";
          }else{
            //Allow login
            var c_name = "Fast_Food_Cookie";
            var c_value = result.login_token;
            localStorage.setItem(c_name, c_value);  //Store token using Html Local Storage   
            if(type == "ADMIN"){
                window.open("admin/admin-home.html","_self");

            }else{
                window.open("admin/home.html","_self");
            }          
            
        }
      })
      .catch((error) => {
        console.log(error)
      });
}

window.onclick = function(event) {
    if (event.target == modal_view) {
        modal_view.style.display = "none";
    }
}