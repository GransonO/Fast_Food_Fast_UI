//Fetch API script for usage in the front end pages
const user_token = localStorage.getItem("Fast_Food_Cookie");//gets user generated token

const modal_view = document.getElementById("modal-item");

window.addEventListener("load",getNewOrders)
//window.addEventListener("load",getProcessingCompleteOrders)
//window.addEventListener("load",getCanceledOrders)

function getNewOrders(){
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'ADMIN-KEY' : user_token
        },
        mode : "cors" 
    }

    fetch("http://127.0.0.1:5000/orders/new",options)
    .then((response) => response.json())
      .then((result) => {
          if(result.status == 0){
            let output =`                        
                    <tr>
                        <h4 style="color:red;"> ${result.data}</h4>
                    </tr> 
                    `;                
          document.getElementById("new_orders").innerHTML = output; //Append to table
          }else{     
            console.log(result);
            let output = "";
            result.data.adm_orders_list.forEach(function(item) {
            output +=`            
                <tr>
                    <td class="items-table">
                        <img class="admin-history-img" src="../img/foods/chinese.jpg" alt="user">
                    </td>
                    <td class="items-table admin-history-details">                    
                        <p><strong>${item.item_details.item_name}</strong></p>
                        <p> by ${item.order_from.customer_name}, ${item.order_from.phone_number}</p>
                        <p> ${item.order_from.location}</p>
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
        console.log(error)
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
            <button class="cancel" onclick="dismissModal()">Cancel</button>
            <button class="okay" onclick="updateOrderID(${order_id},0)">Reject</button>

        </div>
    `;  
    document.getElementById("modal-item").innerHTML = modal_output;  
    modal_view.style.display = "block";
}

function updateOrderID(order_id,status){
    //Updated the orders
    if (status == 1){
        status = "PROCESSING";
    }else{
        status = "CANCELLED";
    }
    alert(status)
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

    fetch("http://127.0.0.1:5000/orders/"+order_id,options)
    .then((response) => response.json())
      .then((result) => {
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
        console.log(error)
      });    

}


function dismissModal(){
    modal_view.style.display = "none";
}
