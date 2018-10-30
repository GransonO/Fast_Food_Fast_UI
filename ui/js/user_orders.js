//Fetch API script for usage in the front end pages
const user_token = localStorage.getItem("Fast_Food_Cookie");
const modal_view = document.getElementById("modal-item");
const loading = document.getElementById("loader_image");

window.addEventListener("load",getNewOrders); //Collect all new orders

var url_string = window.location.href;
var url = new URL(url_string);
var item_id = url.searchParams.get("id");
var category = url.searchParams.get("category");
//Global Variables
var vendor_id;
var item_price;
var item_name;
var vendor_name;
var item_details;
var item_image;

window.addEventListener("load",itemOfInterest); //Collect all related Items
window.addEventListener("load",getRelatedItems); //Collect all related Items

document.getElementById("order_now").addEventListener("click",orderItems);

function itemOfInterest(){
    loading.style.display = "block";
    options = {
        method: 'GET',
        mode : "cors" 
    }

    fetch("https://fast-food-fast-c4.herokuapp.com/menu/" + item_id,options)
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
                    <p> Please login to access this information </p>
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
              document.getElementById("new-table").innerHTML = output; //Append to table

              }
          }else{     
            console.log(result);
            vendor_id = result.data.vendor_id.vendor_id;
            item_price = result.data.price;
            item_name = result.data.item_name;
            vendor_name = result.data.vendor_id.vendor_name;
            item_details = result.data.details;
            item_image = result.data.image_url;

            document.getElementById("item-price").innerHTML ="Ksh " + item_price;
            document.getElementById("item-name").innerHTML = item_name;
            document.getElementById("item-details").innerHTML = item_details;
            document.getElementById("item-by").innerHTML = "by " + vendor_name;
            document.getElementById("order_image").src = 'data:image/png;base64,' + item_image;
          
          }
      })
      .catch((error) => {
        loading.style.display = "none";
        console.log(error)
      });
}

function orderItems(){
    var quantity = document.getElementById("order_quantity").value;
   
    if(quantity < 1){
        let output =`
        <div class="modal-content">
            <h3 style="color:orange;"> Quantity request</h3>
            <p>How many ${item_name} would you like to order?</p>
        </div>
        `;              
        document.getElementById("modal-item").innerHTML = output;
        modal_view.style.display = "block";
    }else{
        
            let output =`
            <div class="modal-content">
                <h3 style="color:orange;"> Ordering :</h3>
                <p>Item Name: ${item_name}</p>
                <!-- p>Item Id: ${item_id}</p -->
                <p>Item Quantity: ${quantity} </p>
                <p>Order Price: ${item_price * quantity} </p>
                <hr>
                <p>From : ${vendor_name}</p>
                <button class="cancel_okay" onclick="dismissModal()">Cancel</button>
                <button class="cancel" onclick="placeOrder(${item_id},${item_price * quantity},${quantity})">Order</button>

            </div>
            `;              
        document.getElementById("modal-item").innerHTML = output;
        modal_view.style.display = "block";
        }
    
}

function placeOrder(item_id,item_price,order_quantity){
    loading.style.display = "block";
    options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'APP-LOGIN-KEY' : user_token
        },
        body:JSON.stringify({
            "order_to": vendor_id,
            "order_amount": item_price,
            "order_quantity": order_quantity,
            "item_id": item_id
        }),
        mode: "cors" 
    }
    fetch("https://fast-food-fast-c4.herokuapp.com/users/orders",options)
    .then((response) => response.json())
      .then((result) => {
        loading.style.display = "none";
          console.log(result);
          if(result.status == 0){
            if(result.data == 'Token passed is invalid'){
                //Request to login
                let modal_output =`
                <div class="modal-content">
                  <h3 style="color:red;"> You are not logged in </h3>
                  <hr>                    
                  <p> Please login to continue </p>
                  <a href="../login.html"><input class="custom-input-button top-margin" type ="button" value="Login"></a>
                </div>
                `;              
            document.getElementById("modal-item").innerHTML = modal_output;
            modal_view.style.display = "block";

            }else{
                let output =`
                <div class="modal-content">
                    <h3 style="color:red;"> ${result.response}</h3>
                    <P>${result.data}</P>
                </div>
                `;              
            document.getElementById("modal-item").innerHTML = output;
            modal_view.style.display = "block";
            }
          }else{
              console.log(result)
              let output =`
              <div class="modal-content">
                <h3 style="color:green;"> Order Posted</h3>
                <p"> Thank you for ordering from ${vendor_name}</p>
                  <button class="custom-input-button" onclick="doneNow()">Done</button>
      
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

function doneNow(){
    window.open("home.html","_self");
}

function dismissModal(){
    modal_view.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal_view) {
        modal_view.style.display = "none";
    }
}

function getNewOrders(){
    loading.style.display = "block";
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'APP-LOGIN-KEY' : user_token
        },
        mode : "cors" 
    }

    fetch("https://fast-food-fast-c4.herokuapp.com/users/orders/new",options)
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
                    <p> Please login to access this information </p>
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
              document.getElementById("new-table").innerHTML = output; //Append to table

              }else{
                let output =`                        
                        <tr>
                            <h4 style="color:red;"> ${result.data}</h4>
                        </tr> 
                        `;                
                document.getElementById("new-table").innerHTML = output; //Append to table
              }
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
                </td>
                <td class="items-table history-details">
                <h3 class="complete-txt">${item.order_status}</h3>
                </td>
            </tr> 
                `;
            });
            document.getElementById("new-table").innerHTML = output; //Append to table
          
          }
      })
      .catch((error) => {
        loading.style.display = "none";
        console.log(error)
      });
}

function getRelatedItems(){
    loading.style.display = "block";
    options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            "item_id" : item_id,
            "item_category": category
        }),
        mode: "cors" 
    }

    fetch("https://fast-food-fast-c4.herokuapp.com/related", options)
    .then((response) => response.json())
    .then((result) => {
        loading.style.display = "none";
        //Processed data
        console.log(result);        
        let output = "";

        if(result.status == 0){
            result.related_list.forEach(function(item) {
            output =`
                <td>
                    <h2 style="color:orange;"> No relate Items </h2>                        
                </td>
                `;
            });
            document.getElementById("tr").innerHTML = output;
            
        }else{
            result.related_list.forEach(function(item) {
            output +=`
                <td>
                    <div class="related-orders">
                        <img class="food-img" src="data:image/png;base64,${item.image_url}" alt="Food Item" width=300>
                        <h3 class="text-right">Ksh ${item.price}</h3>
                        <h3 class="food-name">${item.item_name}</h3>
                        <a href="order.html?id=${item.item_id}&category=${item.category}"><img class="cart" src="../img/cart.png" alt="cart" width=50></a>
                        <h4 class="text-left"> by ${item.vendor_id.vendor_name}</h4>
                    </div>                        
                </td>
                `;
            });
            document.getElementById("tr").innerHTML = output;
        } 
    })
}

document.getElementById("logout_btn").addEventListener("click", signOut);

function signOut(){

    //Allow logout
    var c_name = "Fast_Food_Cookie";
    localStorage.removeItem(c_name) //Remove item from the local storage

    let output = ` 
        <div class="modal-content">
        <h3 style="color:green;"> You have been logged out successfully </h3>
        <a href="../index.html"><button class="custom-input-button"> Okay </button> </a>
        </div>
    `;
    modal_view.innerHTML = output;
    modal_view.style.display = "block";

}