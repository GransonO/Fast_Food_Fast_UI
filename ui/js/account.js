//Fetch API script for usage in the front end pages
const user_token = localStorage.getItem("Fast_Food_Cookie");
const modal_view = document.getElementById("modal-item");
const loading = document.getElementById("loader_image");

window.addEventListener("load",getAllOrders); //Collect all new orders
window.addEventListener("load",getUserDetails)//Collects all the users details

function dismissModal(){
    modal_view.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal_view) {
        modal_view.style.display = "none";
    }
}

function getAllOrders(){
    loading.style.display = "block";
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'APP-LOGIN-KEY' : user_token
        },
        mode : "cors" 
    }

    fetch("http://127.0.0.1:5000/users/orders",options)
    .then((response) => response.json())
      .then((result) => {
        loading.style.display = "none";
          if(result.status == 0){

                if(result.data == 'Token passed is invalid'){
                    //Request to login
                    let modal_output =`
                    <div class="modal-content">
                    <h3 style="color:red;"> You are not logged in </h3>
                    <hr>                    
                    <p> Please login to load this information </p>
                    <a href="../login.html"><input class="custom-input-button top-margin" type ="button" value="Login"></a>
                    </div>
                    `;              
                document.getElementById("modal-item").innerHTML = modal_output;
                modal_view.style.display = "block";
                let output =`                        
                        <tr>
                            <h4 style="color:red;"> Login to see this </h4>
                        </tr> 
                        `;                
                document.getElementById("all-table").innerHTML = output; //Append to table

                }else{
                let output =`                        
                        <tr>
                            <h4 style="color:red;"> ${result.data}</h4>
                        </tr> 
                        `;                
                    document.getElementById("all-table").innerHTML = output; //Append to table
                }
          }else{  
            if(result.data == 'You have not ordered anything yet! '){
                let output =`                        
                        <tr>
                            <h4 style="color:red;"> ${result.data}</h4>
                        </tr> 
                        `;                
                    document.getElementById("all-table").innerHTML = output; //Append to table
            }else{

                console.log(result);
                let output =`<th> 
                                #
                            </th>
                            <th> 
                                Details
                            </th>
                            <th> 
                                Status
                            </th> `
                            ;
                result.data.orders_list.forEach(function(item) {
                output +=`            
                <tr>
                    <td class="items-table">
                        <img class="history-img" src="data:image/png;base64,${item.order_detail.image_url}" alt="user">
                    </td>
                    <td class="items-table history-details">                    
                        <h4>${item.order_detail.item_name}</h4>
                        <p> From ${item.order_to.vendor_name}</p>
                        <p> From ${item.order_date}</p>
                    </td>
                    <td class="items-table history-details">
                    <h3 class="complete-txt">${item.order_status}</h3>
                    </td>
                </tr>             
                <tr>
                    `;
                });
                document.getElementById("all-table").innerHTML = output; //Append to table
              

            }
          }
      })
      .catch((error) => {
        loading.style.display = "none";
        console.log(error)
        // let modal_output =`
        // <div class="modal-content">
        //   <h3 style="color:red;"> An error occurred ${error} </h3>
        //   <hr>                    
        //   <p> Our server may be experiencing some issues<br> Please try again later, or contact this guy:<br>
        //   Granson Oyombe<br>O712 288 371 <br>(He might Help!) </p>
        // </div>
        // `;              
        //   document.getElementById("modal-item").innerHTML = modal_output;
        //   modal_view.style.display = "block";
      });
}

function getUserDetails(){
    loading.style.display = "block";
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'APP-LOGIN-KEY' : user_token
        },
        mode : "cors" 
    }
    fetch('http://127.0.0.1:5000/user/profile',options)
    .then((response) => response.json())
    .then((data) => {
        loading.style.display = "none";
        if(data.status == 0){
            let output =`
            <div class="modal-content">
              <h3 style="color:red;"> ${result.response}</h3>
            </div>
            `;              
            document.getElementById("modal-item").innerHTML = output;
            modal_view.style.display = "block";
          }else{ 
              //Append values to the dom elements
              let output = `<button class="okay" onclick="editUserDetails('${data.data.customer_id}','${data.data.customer_name}','${data.data.email}','${data.data.phone_no}','${data.data.location}','${data.data.about}')">Edit</button>`
              document.getElementById("user-name").innerHTML= data.data.customer_name
              document.getElementById("username").value = data.data.customer_name
              document.getElementById("email").value = data.data.email
              document.getElementById("phone").value = data.data.phone_no
              document.getElementById("local").value = data.data.location
              document.getElementById("brief").innerHTML = data.data.about
              document.getElementById("action_btn").innerHTML = output
          }
    })
    .catch((error) => {
      loading.style.display = "none";
      console.log(error)
    });
}


function editUserDetails(id,name,email,phone_no,location,about){
    
    let output =`
    <div class="modal-content">
      <h3 style="color:orange;"> Editing ${name} Details</h3>
      <!-- p>${id}</p -->
      <p><strong>Username</strong> <br><input id='update_name' class="custom-input" value="${name}" ></p>
      <p><strong>email</strong>  <br><input id='update_email' class="custom-input" value="${email}"></p>
      <p><strong>phone</strong>  <br><input id='update_phone' class="custom-input" value="${phone_no}" ></p>
      <p><strong>local</strong>  <br><input id='update_location' class="custom-input" value="${location}" ></p>
      <p><strong>brief</strong>  <br><textarea id='update_about' class="custom-input" >${about}</textarea></p>
      <button class="okay" onclick="UpdateUser('${id}')">Edit</button>
      <button class="cancel" onclick="dismissModal()">Cancel</button>

    </div>`;
    document.getElementById("modal-item").innerHTML = output;
    modal_view.style.display = "block";
}

function UpdateUser(id){
    var name = document.getElementById('update_name').value;
    var email = document.getElementById('update_email').value;
    var phone = document.getElementById('update_phone').value;
    var location = document.getElementById('update_location').value;
    var about = document.getElementById('update_about').value;
    loading.style.display = "block";

    options = {
        'method' : 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'APP-LOGIN-KEY' : user_token
        },
        body:JSON.stringify({
            "customer_name": name,
            "email": email,
            "phone": phone,
            "location": location,
            "about": about
        }),
        mode : "cors" 
    }
    fetch("http://127.0.0.1:5000/user/profile",options)
    .then((response)=> response.json())
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
              <h3>New Details</h3>
              <p><strong>Username : ${result.data.customer_name}</strong></p>
              <p><strong>Email : ${result.data.email}</strong></p>
              <p><strong>Phone : ${result.data.phone}</strong></p>
              <p><strong>Location : ${result.data.location}</strong></p>
              <p><strong>About : ${result.data.about}</strong></p>
              <a href="account.html"><input class="custom-input-button top-margin" type ="button" value="Refresh page"></a>
            </div>
            `;              
            document.getElementById("modal-item").innerHTML = output;
            modal_view.style.display = "block";

          }
    })
    .catch((error) => {
      loading.style.display = "none";
      console.log(error)
    });
}


document.getElementById("logout_btn").addEventListener("click", signOut);

function signOut(){

    //Allow logout
    var c_name = "Fast_Food_Cookie";
    localStorage.removeItem(c_name) //Remove item from the local storage

    let output = ` 
        <div class="modal-content">
        <h3 style="color:green;"> You have been logged out successfully </h3>
        <a href="../index.html"><button class="custom-input-button"> Okay </button>
        </div>
    `;
    modal_view.innerHTML = output;
    modal_view.style.display = "block";

}