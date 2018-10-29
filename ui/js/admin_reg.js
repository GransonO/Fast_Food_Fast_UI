//Fetch API script for usage in the front end pages

//Register an Admin
document.getElementById("admin_register").addEventListener("click",adminDetails);
const loading = document.getElementById("loader_image");

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
            
            let output =`
            <div class="modal-content">
              <h3 style="color:red;"> Please ensure all fields are filled</h3>
            </div>
            `;              
        document.getElementById("modal-item").innerHTML = output;
        modal_view.style.display = "block";

        }
    }else{
        let output =`
        <div class="modal-content">
          <h3 style="color:red;"> Your Passwords don't match</h3>
        </div>
        `;              
    document.getElementById("modal-item").innerHTML = output;
    modal_view.style.display = "block";
    }
}

function registerAdmin(username, email, phone, vendor, local, password){
    loading.style.display = "block";
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

    fetch("https://fast-food-fast-c4.herokuapp.com/auth/signup",options)
    .then((response) => response.json())
      .then((result) => {
        loading.style.display = "none";
          if(result.status == 0){
              let output =`
              <div class="modal-content">
                <h3 style="color:red;"> ${result.response}</h3>
              </div>
              `;              
          document.getElementById("modal-item").innerHTML = output;
          modal_view.style.display = "block";
          }else{
            let output =`
            <div class="modal-content">
              <h3 style="color:green;"> ${result.response}</h3>
              <hr>
              <h4>Your registration details</h4>
              <p><strong>Username</strong> : ${result.data.name}</p>
              <!-- p><strong>Vendor ID</strong> : ${result.data.vendor_id}</p -->
              <p><strong>Email</strong> : ${result.data.email}</p>
              <p><strong>Phone Number</strong> : ${result.data.phone_no}</p>
              <p><strong>Vendor Name</strong> : ${result.data.vendor_name}</p>
              <p><strong>Location</strong> : ${result.data.location}</p>
              <p><strong>Registration Date</strong> : ${result.data.reg_date}</p>
              
              <a href="login.html"><input class="custom-input-button top-margin" type ="button" value="Login"></a>              
            </div>
            `;                
          document.getElementById("modal-item").innerHTML = output;  
          modal_view.style.display = "block";    
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