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
                        <h3 style="color:red;"> ${result.data}</h3>
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
                        <h4>${item.item_details.item_name}</h4>
                        <p> by ${item.order_from.customer_name}</p>
                        <p> ${item.order_from.location}</p>
                    </td>
                    <td class="items-table admin-history-details">
                        <button class="action-okay">Confirm</button>
                        <button class="action-cancel">Reject</button>
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