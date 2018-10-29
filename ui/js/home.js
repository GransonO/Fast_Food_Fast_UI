//Fetch API script for usage in the front end pages
const modal_view = document.getElementById("modal-item");
const loading = document.getElementById("loader_image");

window.addEventListener("load",getAllItems)

function getAllItems(){
    loading.style.display = "block";
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        },
        mode : "cors" 
    }

    fetch("http://127.0.0.1:5000/menu",options)
    .then((response) => response.json())
      .then((result) => {
          console.log(result)
          loading.style.display = "none";
          if(result.data.mess == 0){
              let output =`
              <div class="modal-content">
                <h3 style="color:orange;"> ${result.data.response}</h3>
              </div>
              `;              
          document.getElementById("modal-item").innerHTML = output;
          modal_view.style.display = "block";          
          document.getElementById("home-container").innerHTML = output;

          }else if(result.status == 0){
            let output =`
            <div class="modal-content">
              <h3 style="color:red;"> ${result.response}</h3>
            </div>
            `;                
          document.getElementById("modal-item").innerHTML = output;  
          modal_view.style.display = "block";    
          }else{     
            console.log(result);
            let output = "";
            result.data.items_list.forEach(function(item) {
            output +=`
                <div class="home-item">
                    <img class="food-img" src="data:image/png;base64,${item.image_url}" alt="Food Item" width=300>
                    <h3 class="text-right">Ksh ${item.price}</h3>
                    <h3 class="food-name">${item.item_name}</h3>
                    <a href="order.html?id=${item.item_id}&category=${item.category}"><img class="cart" src="../img/cart.png" alt="cart" width=50></a>
                    <h4 class="text-left"> by ${item.vendor_id.vendor_name}</h4>
                </div>
                `;
            });
            document.getElementById("home-container").innerHTML = output;      

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
          Granson Oyombe<br>O712 288 371 <br>(He may Help!) </p>
        </div>
        `;              
          document.getElementById("modal-item").innerHTML = modal_output;
          modal_view.style.display = "block";
      });
}

function dismissModal(){
    modal_view.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal_view) {
        modal_view.style.display = "none";
    }
}

function getOption(passed_info){
    if(passed_info == "account"){
        window.open("account.html","_self");
    }else{
        //Call data with specific details
        getDetailedItem(passed_info);
    }
}

function getDetailedItem(detail){
    loading.style.display = "block";
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        },
        mode : "cors" 
    }

    fetch("http://127.0.0.1:5000/menu/"+ detail, options)
    .then((response) => response.json())
      .then((result) => {
          console.log(result)
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
            console.log(result);
            let output = "";
            result.category_list.forEach(function(item) {
            output +=`
                <div class="home-item">
                    <img class="food-img" src="data:image/png;base64,${item.image_url}" alt="Food Item" width=300>
                    <h3 class="text-right">Ksh ${item.price}</h3>
                    <h3 class="food-name">${item.item_name}</h3>
                    <a href="order.html?id=${item.item_id}&category=${item.category}"><img class="cart" src="../img/cart.png" alt="cart" width=50></a>
                    <h4 class="text-left"> by ${item.vendor_id.vendor_name}</h4>
                </div>
                `;
            });
            document.getElementById("home-container").innerHTML = output;      

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
          Granson Oyombe<br>O712 288 371 <br>(He may Help!) </p>
        </div>
        `;              
          document.getElementById("modal-item").innerHTML = modal_output;
          modal_view.style.display = "block";
      });
}

function getVendors(){
    loading.style.display = "block";
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        },
        mode : "cors" 
    }

    fetch("http://127.0.0.1:5000/vendors", options)
    .then((response) => response.json())
      .then((result) => {
          console.log(result)
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
            console.log(result);
            let output = "";
            result.vendors_list.forEach(function(item) {
            output +=`
                   <button id="vendor_btn" class="custom-input-button" onclick="getVendorItem('${item.vendor_id}')"> ${item.vendor_name} </button>
                `;
            });
            
            var modal_item = '<div class="modal-content"><h4>Select a vendor to view. </h4><hr>'+ output + '</div>';            
            document.getElementById("modal-item").innerHTML = modal_item;
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
          Granson Oyombe<br>O712 288 371 <br>(He may Help!) </p>
        </div>
        `;              
          document.getElementById("modal-item").innerHTML = modal_output;
          modal_view.style.display = "block";
      });
}


function getVendorItem(vendor_id){
    loading.style.display = "block";  
    modal_view.style.display = "none";         
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        },
        mode : "cors" 
    }

    fetch("http://127.0.0.1:5000/vendor/"+ vendor_id, options)
    .then((response) => response.json())
      .then((result) => {
          console.log(result)
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
            console.log(result);
            let output = "";
            result.category_list.forEach(function(item) {
            output +=`
                <div class="home-item">
                    <img class="food-img" src="data:image/png;base64,${item.image_url}" alt="Food Item" width=300>
                    <h3 class="text-right">Ksh ${item.price}</h3>
                    <h3 class="food-name">${item.item_name}</h3>
                    <a href="order.html?id=${item.item_id}&category=${item.category}"><img class="cart" src="../img/cart.png" alt="cart" width=50></a>
                    <h4 class="text-left"> by ${item.vendor_id.vendor_name}</h4>
                </div>
                `;
            });
            document.getElementById("home-container").innerHTML = output;   
            modal_view.style.display = "none";         

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
          Granson Oyombe<br>O712 288 371 <br>(He may Help!) </p>
        </div>
        `;              
          document.getElementById("modal-item").innerHTML = modal_output;
          modal_view.style.display = "block";
      });
}
