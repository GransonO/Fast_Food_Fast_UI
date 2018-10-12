//Fetch API script for usage in the front end pages
const user_token = localStorage.getItem("Fast_Food_Cookie");
const modal_view = document.getElementById("modal-item");

window.addEventListener("load",getNewOrders); //Collect all new orders

var url_string = window.location.href;
var url = new URL(url_string);
var vendor_id = url.searchParams.get("vid");
var item_id = url.searchParams.get("id");
var item_price = url.searchParams.get("price");
var item_name = url.searchParams.get("name");
var vendor_name = url.searchParams.get("vendor_name");
var item_details = url.searchParams.get("item_details");

document.getElementById("item-price").innerHTML="Ksh " + item_price;
document.getElementById("item-name").innerHTML=item_name;
document.getElementById("item-details").innerHTML=item_details;
document.getElementById("item-by").innerHTML="by " + vendor_name;

document.getElementById("order_now").addEventListener("click",orderItems);

function orderItems(){    
       alert(user_token);
        let output =`
        <div class="modal-content">
            <h3 style="color:orange;"> Ordering :</h3>
            <p>Item Name: ${item_name}</p>
            <p>Item Id: ${item_id}</p>
            <hr>
            <p>From : ${vendor_name}</p>
            <button class="cancel_okay" onclick="dismissModal()">Cancel</button>
            <button class="cancel" onclick="placeOrder(${item_id},${item_price})">Order</button>

        </div>
        `;              
    document.getElementById("modal-item").innerHTML = output;
    modal_view.style.display = "block";
    
}

function placeOrder(item_id,item_price){
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
            "order_detail": item_id
        }),
        mode: "cors" 
    }
    fetch("http://127.0.0.1:5000/users/orders",options)
    .then((response) => response.json())
      .then((result) => {
          console.log(result);
          if(result.status == 0){
              let output =`
              <div class="modal-content">
                <h3 style="color:red;"> ${result.response}</h3>
                <P>${result.data}</P>
              </div>
              `;              
          document.getElementById("modal-item").innerHTML = output;
          modal_view.style.display = "block";
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
        console.log(error)
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
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'APP-LOGIN-KEY' : user_token
        },
        mode : "cors" 
    }

    fetch("http://127.0.0.1:5000/users/orders/new",options)
    .then((response) => response.json())
      .then((result) => {
          if(result.status == 0){
            let output =`                        
                    <tr>
                        <h4 style="color:red;"> ${result.data}</h4>
                    </tr> 
                    `;                
          document.getElementById("new-table").innerHTML = output; //Append to table
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
        console.log(error)
      });
}