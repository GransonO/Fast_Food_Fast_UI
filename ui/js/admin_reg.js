//Fetch API script for usage in the front end pages

//Register an Admin
document.getElementById("admin_register").addEventListener("click",adminDetails);

const modal_view = document.getElementById("modal-item");

function adminDetails(){
    username = document.getElementById("user").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    vendor = document.getElementById("vendor").value;
    local = document.getElementById("local").value;
    pass_original = document.getElementById("pass_original").value;
    pass_confirm = document.getElementById("pass_confirm").value;
    if(pass_confirm == pass_original){
        //Check if data entered correctly
        if( username != "" && email != "" && phone != "" && vendor != "" && local != "" && pass_original != "" ){
            registerAdmin(username, email, phone, vendor, local, pass_original)

        }else{
            alert("Please ensure all fields are filled.");

        }
    }else{
        alert("Your Passwords don't match");
    }
}

function registerAdmin(username, email, phone, vendor, local, password){
    options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            "type": "ADMIN",
            "name": username,
            "vendor_name": vendor,
            "password": password,
            "about": "This is about me",
            "location": local,
            "image_url": "NON",
            "phone_no": phone,
            "email": email
        }),
        mode: "cors" 
    }

    fetch("http://127.0.0.1:5000/auth/signup",options)
    .then((response) => response.json())
      .then((result) => {
          if(result.status == 0){
              let output =`
              <div class="modal-content">
                <span id="close_modal" class="close">&times;</span>
                <h3 style="color:red;"> ${result.response}</h3>
                <hr>
                <p>${result.data}</p>
              </div>
              `;              
          document.getElementById("modal-item").innerHTML = output;
          modal_view.style.display = "block";
          }else{
            let output =`
            <div class="modal-content">
              <span id="close_modal" class="close">&times;</span>
              <h3 style="color:green;"> ${result.response}</h3>
              <hr>
              <p>${result.data}</p>
            </div>
            `;                
          document.getElementById("modal-item").innerHTML = output;  
          modal_view.style.display = "block";    
          }
      })
      .catch((error) => {
        console.log(error)
      });
}

const close_ico = document.getElementById("close_modal");
const twitter = document.getElementById("twitter");
const google = document.getElementById("google");

google.onclick = function() {
    modal_view.style.display = "none";
}
twitter.onclick = function() {
    modal_view.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal_view) {
        modal_view.style.display = "none";
    }
}