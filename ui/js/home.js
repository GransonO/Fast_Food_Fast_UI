//Fetch API script for usage in the front end pages
const modal_view = document.getElementById("modal-item");

window.addEventListener("load",getAllItems)

function getAllItems(){
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
          if(result.data.mess == 0){
              let output =`
              <div class="modal-content">
                <h3 style="color:orange;"> ${result.data.message}</h3>
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
                    <img class="food-img" src="../img/foods/chinese.jpg" alt="Food Item" width=300>
                    <h3 class="text-right">Ksh ${item.price}</h3>
                    <h3 class="food-name">${item.item_name}</h3>
                    <a href="order.html?id=${item.item_id}&vid=${item.vendor_id.vendor_id}&price=${item.price}&name=${item.item_name}&vendor_name=${item.vendor_id.vendor_name}&item_details=${item.details}"><img class="cart" src="../img/cart.png" alt="cart" width=50></a>
                    <h4 class="text-left"> by ${item.vendor_id.vendor_name}</h4>
                </div>
                `;
            });
            document.getElementById("home-container").innerHTML = output;      

          }
      })
      .catch((error) => {
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
