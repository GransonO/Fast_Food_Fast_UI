//Fetch API script for usage in the front end pages

//Register a User
document.getElementById("login").addEventListener("click",userLogin);
const loading = document.getElementById("loader_image");

const modal_view = document.getElementById("modal-item");

function userLogin(){
    type = document.getElementById("account").value;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    
    if(type == '#'){
        let output =`
        <div class="modal-content">
            <h3 style="color:red;"> Your Account is not indicated !</h3>
        </div>
        `;              
    document.getElementById("modal-item").innerHTML = output;
    modal_view.style.display = "block"; 

    }else{
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

}

function registerUser(username, password, type){
    loading.style.display = "block";
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

    fetch("https://fast-food-fast-c4.herokuapp.com/auth/login",options)
    .then((response) => response.json())
      .then((result) => {
          if(result.status == 0){
              let output =`
              <div class="modal-content">
                <h3 style="color:red;"> ${result.response}</h3>
              </div>
              `;       
          loading.style.display = "none";       
          document.getElementById("modal-item").innerHTML = output;
          modal_view.style.display = "block";
          }else{
            //Allow login
            var c_name = "Fast_Food_Cookie";
            var c_value = result.login_token;
            localStorage.setItem(c_name, c_value);  //Store token using Html Local Storage   
            
            loading.style.display = "none";
            if(type == "ADMIN"){
                window.open("admin/admin-home.html","_self");

            }else{
                window.open("users/home.html","_self");
            }          
            
        }
      })
      .catch((error) => {
        loading.style.display = "none";
        console.log(error)
        let modal_output =`
        <div class="modal-content">
          <h3 style="color:red;"> An error occurred ${error} </h3>
          <hr>                    
          <p> Our server may be experiencing some issues<br> Please try again later, or contact this guy:<br>
          Granson Oyombe<br>O712 288 371 <br>(He might Help!) </p>
        </div>
        `;              
          document.getElementById("modal-item").innerHTML = modal_output;
          modal_view.style.display = "block";
      });
}

window.onclick = function(event) {
    if (event.target == modal_view) {
        modal_view.style.display = "none";
    }
}