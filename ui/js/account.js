//Fetch API script for usage in the front end pages
const user_token = localStorage.getItem("Fast_Food_Cookie");
const modal_view = document.getElementById("modal-item");

window.addEventListener("load",getAllOrders); //Collect all new orders

function dismissModal(){
    modal_view.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal_view) {
        modal_view.style.display = "none";
    }
}

function getAllOrders(){
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
          if(result.status == 0){
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
                    <img class="history-img" src="../img/foods/chinese.jpg" alt="user">
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
      })
      .catch((error) => {
        console.log(error)
      });
}