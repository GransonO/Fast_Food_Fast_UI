//Fetch API script for usage in the front end pages
const user_token = localStorage.getItem("Fast_Food_Cookie");//gets user generated token

const modal_view = document.getElementById("modal-item");
const loading = document.getElementById("loader_image");

window.addEventListener("load",getNewOrders)
window.addEventListener("load",getProcessingCompleteOrders)
window.addEventListener("load",getCompleteOrders)
window.addEventListener("load",getCancelledOrders)

function getNewOrders(){
    loading.style.display = "block";
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'ADMIN-KEY' : user_token
        },
        mode : "cors" 
    }

    fetch("https://fast-food-fast-c4.herokuapp.com/orders/new",options)
    .then((response) => response.json())
      .then((result) => {
        loading.style.display = "none";
          if(result.status == 0){
              if(result.data == 'Admin token passed is invalid'){
                  //No valid token passed
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
                      <h4 style="color:red;"> Could not load this information</h4>
                  </tr> 
                  `;                
                document.getElementById("new_orders").innerHTML = output; //Append to table
              }else{
                let output =`                        
                    <tr>
                        <h4 style="color:red;">${result.data}</h4>
                    </tr> 
                    `;                
                document.getElementById("new_orders").innerHTML = output; //Append to table
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
            result.data.adm_orders_list.forEach(function(item) {
            output +=`            
                <tr>
                    <td class="items-table">
                        <img class="admin-history-img" src="data:image/png;base64,${item.item_details.image_url}" alt="user">
                    </td>
                    <td class="items-table admin-history-details">                    
                        <p><strong>${item.item_details.item_name}</strong></p>
                        <p> by ${item.order_from.customer_name}, ${item.order_from.phone_number}</p>
                        <p> ${item.order_from.location}</p>
                        <p> ${item.order_date}</p>
                    </td>
                    <td class="items-table admin-history-details">
                        <button class="action-okay" onclick="acceptOrder(${item.order_id})">Confirm</button>
                        <button class="action-cancel" onclick="rejectOrder(${item.order_id})">Reject</button>
                    </td>
                </tr> 
                `;
            });
            document.getElementById("new_orders").innerHTML = output; //Append to table
          
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

function acceptOrder(order_id){
    let modal_output= `
        <div class="modal-content">
            <h3 style="color:green;"> Confirming this order?</h3>
            <p>Order Id No: ${order_id}</p>
            <button class="cancel" onclick="dismissModal()">Cancel</button>
            <button class="okay" onclick="updateOrderID(${order_id},1)">Confirm</button>

        </div>
    `;  
    document.getElementById("modal-item").innerHTML = modal_output;  
    modal_view.style.display = "block"; 
}

function rejectOrder(order_id){
    let modal_output= `
        <div class="modal-content">
            <h3 style="color:red;"> Rejecting this order?</h3>
            <p>Order Id No: ${order_id}</p>
            <button class="cancel_okay" onclick="dismissModal()">Cancel</button>
            <button class="cancel" onclick="updateOrderID(${order_id},0)">Reject</button>

        </div>
    `;  
    document.getElementById("modal-item").innerHTML = modal_output;  
    modal_view.style.display = "block";
}

function getProcessingCompleteOrders(){
    loading.style.display = "block";
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'ADMIN-KEY' : user_token
        },
        mode : "cors" 
    }

    fetch("https://fast-food-fast-c4.herokuapp.com/orders/processing",options)
    .then((response) => response.json())
      .then((result) => {
        loading.style.display = "none";
          if(result.status == 0){
            let output =`                        
                    <tr>
                        <h4 style="color:red;"> ${result.data}</h4>
                    </tr> 
                    `;                
          document.getElementById("processing_orders").innerHTML = output; //Append to table
          }else{     
            console.log(result);
            let output = `<th> 
                            #
                        </th>
                        <th> 
                            Details
                        </th>
                        <th> 
                            Status
                        </th> `
                        ;
            result.data.adm_orders_list.forEach(function(item) {
            output +=`            
                <tr>
                    <td class="items-table">
                        <img class="admin-history-img" src="data:image/png;base64,${item.item_details.image_url}" alt="user">
                    </td>
                    <td class="items-table admin-history-details">                    
                        <h4>${item.item_details.item_name}</h4>
                        <p> by ${item.order_from.customer_name}, ${item.order_from.phone_number}</p>
                        <p> ${item.order_from.location}</p>
                        <p><small> Ordered: ${item.order_date}</small></p>
                        <p><small> Processed: ${item.status_changed}</small></p>
                    </td>
                    <td class="items-table admin-history-details">
                        <h3 class="running-txt">${item.order_status}</h3>
                        <button id="icu" class="action-process" onclick="completeOrder(${item.order_id})">Complete</button>
                    </td>
                </tr> 
                `;
            });
            document.getElementById("processing_orders").innerHTML = output; //Append to table
            
          }
      })
      .catch((error) => {
        loading.style.display = "none";
        console.log(error)
      });
}

function completeOrder(order_id){
    let modal_output= `
        <div class="modal-content">
            <h3 style="color:orange;"> Completing this order?</h3>
            <p>Order Id No: ${order_id}</p>
            <button class="cancel" onclick="dismissModal()">Cancel</button>
            <button class="okay" onclick="updateOrderID(${order_id},2)">Complete</button>

        </div>
    `;  
    document.getElementById("modal-item").innerHTML = modal_output;  
    modal_view.style.display = "block";
}


function updateOrderID(order_id,status){
    //Updated the orders
    loading.style.display = "block";
    switch (status) {
        case 0:
           status = "CANCELLED";
            break;

        case 1:
            status = "PROCESSING";            
            break;

        case 2:
            status = "COMPLETED";            
            break;
    
        default:
            status = "NEW"
            break;
    }
    options = {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'ADMIN-KEY' : user_token
        },
        body:JSON.stringify({
            "status": status
        }),
        mode: "cors" 
    }

    fetch("https://fast-food-fast-c4.herokuapp.com/orders/"+order_id,options)
    .then((response) => response.json())
      .then((result) => {
        loading.style.display = "none";
          console.log(result)
          if(result.status == 0){
              let output =`
              <div class="modal-content">
                <h3 style="color:red;"> ${result.response}</h3>
              </div>
              `;              
          document.getElementById("modal-item").innerHTML = output;
          modal_view.style.display = "block";
          }else{
            //Refresh table
            window.open("admin-orders.html","_self");
            
        }
      })
      .catch((error) => {
        loading.style.display = "none";
        console.log(error)
      });    

}

function getCompleteOrders(){
    loading.style.display = "block";
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'ADMIN-KEY' : user_token
        },
        mode : "cors" 
    }

    fetch("https://fast-food-fast-c4.herokuapp.com/orders/completed",options)
    .then((response) => response.json())
      .then((result) => {
        loading.style.display = "none";
          console.log(result)
          if(result.status == 0){
            let output =`                        
                    <tr>
                        <h4 style="color:red;">${result.data}</h4>
                    </tr> 
                    `; 
                var outcome = document.getElementById("processing_orders").innerHTML + output; //Append to table
                document.getElementById("processing_orders").innerHTML = outcome;
                
                }else{     
            console.log(result);
            let output = `<th> 
                            #
                        </th>
                        <th> 
                            Details
                        </th>
                        <th> 
                            Status
                        </th> `
                        ;
            result.data.adm_orders_list.forEach(function(item) {
            output +=`            
                <tr>
                    <td class="items-table">
                        <img class="admin-history-img" src="data:image/png;base64,${item.item_details.image_url}" alt="user">
                    </td>
                    <td class="items-table admin-history-details">                    
                        <h4>${item.item_details.item_name}</h4>
                        <p> by ${item.order_from.customer_name}, ${item.order_from.phone_number}</p>
                        <p> ${item.order_from.location}</p>
                        <p><small> Ordered: ${item.order_date}</small></p>
                        <p><small> Completed: ${item.status_changed}</small></p>
                    </td>
                    <td class="items-table admin-history-details">
                        <h3 class="complete-txt">${item.order_status}</h3>
                    </td>
                </tr> 
                `;
            });
            var outcome = document.getElementById("processing_orders").innerHTML + output; //Append to table
            document.getElementById("processing_orders").innerHTML = outcome;          
          }
      })
      .catch((error) => {
        loading.style.display = "none";
        console.log(error)
      });
}


function getCancelledOrders(){
    loading.style.display = "block";
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'ADMIN-KEY' : user_token
        },
        mode : "cors" 
    }

    fetch("https://fast-food-fast-c4.herokuapp.com/orders/cancelled",options)
    .then((response) => response.json())
      .then((result) => {
        loading.style.display = "none";
          console.log(result)
          if(result.status == 0){
            let output =`                        
                    <tr>
                        <h3 style="color:red; text-align:center;">${result.data}</h3>
                    </tr> 
                    `; 
                document.getElementById("cancelled").innerHTML = output;
                
                }else{     
            console.log(result);
            let output ="";
            result.data.adm_orders_list.forEach(function(item) {
            output +=`            
                <tr>
                    <td class="items-table">
                        <img class="admin-history-img" src="data:image/png;base64,${item.item_details.image_url}" alt="user">
                    </td>
                    <td class="items-table admin-history-details">                    
                        <h4>${item.item_details.item_name}</h4>
                        <p> by ${item.order_from.customer_name}, ${item.order_from.phone_number}</p>
                        <p> ${item.order_from.location}</p>
                        <p><small> Ordered: ${item.order_date}</small></p>
                        <p><small> Cancelled: ${item.status_changed}</small></p>
                    </td>
                    <td class="items-table admin-history-details">
                        <h3 class="complete-txt">${item.order_status}</h3>
                    </td>
                </tr> 
                `;
            });
            document.getElementById("cancelled").innerHTML = output;          
          }
      })
      .catch((error) => {
        loading.style.display = "none";
        console.log(error)
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