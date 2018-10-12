//Fetch API script for usage in the front end pages
const user_token = localStorage.getItem("Fast_Food_Cookie");
//document.getElementById("user_register").addEventListener("click",userDetails);

const modal_view = document.getElementById("modal-item");

window.addEventListener("load",getAdminItems)

function getAdminItems(){
    options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'ADMIN-KEY' : user_token
        },
        mode : "cors" 
    }

    fetch("http://127.0.0.1:5000/admin/menu",options)
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
            let output = `<h2>All Foods</h2>`;
            result.data.items_list.forEach(function(item) {
            output +=`
                    <div class="home-item" style="float:left;">
                        <img class="food-img" src="../img/foods/chinese.jpg" alt="Food Item" width=250>
                        <h3 class="text-right">Ksh ${item.price}</h3>
                        <h3 class="food-name">${item.item_name}</h3>
                        <p>${item.details}.</p>
                        <img id="delete" name=${item.item_id} class="delete" onclick="confirmDeleteItemID(${item.item_id})" src="../img/logo/delete.png" alt="delete">
                        <!-- img id="edit" name=${item.item_id} class="edit" onclick="editItemID(${item.item_id})" src="../img/logo/edit.png" alt="edit"-->
                    </div>
                `;
            });
            document.getElementById("tr").innerHTML = output;      

          }
      })
      .catch((error) => {
        console.log(error)
      });
}

function confirmDeleteItemID(id){
    let modal_output= `
        <div class="modal-content">
        <h3 style="color:red;"> Do you really want to delete this item?</h3>
        <p>Item Id No: ${id}</p>
        <button class="okay" onclick="dismissModal()">Cancel</button>
        <button class="cancel" onclick="deleteItemID(${id})">Delete</button>

        </div>
    `;  
    document.getElementById("modal-item").innerHTML = modal_output;  
    modal_view.style.display = "block"; 
}

function deleteItemID(id){
    options = {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'ADMIN-KEY' : user_token
        },
        mode : "cors" 
    }

    fetch("http://127.0.0.1:5000/admin/menu/"+id,options)
    .then((response) => response.json())
      .then((result) => {
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
            window.open("admin-home.html","_self");
          }
      })
      .catch((error) => {
        console.log(error)
      });

}

document.getElementById("submit").addEventListener("click",addItems);

function addItems(){    
    //item_cat = document.getElementById("item_cat").value;
    name = document.getElementById("name").value;
    price = document.getElementById("price").value;
    detail = document.getElementById("detail").value;

    if(name != "" && price != "" && detail != ""){
        addMenuItemsToTable(name,price,detail)
    }else{        
        let output =`
        <div class="modal-content">
            <h3 style="color:orange;"> Please ensure all fields are filled</h3>
        </div>
        `;              
    document.getElementById("modal-item").innerHTML = output;
    modal_view.style.display = "block";
    }
    
}

function addMenuItemsToTable(name,price,detail){
    options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'ADMIN-KEY' : user_token
        },
        body:JSON.stringify({
            "item_name": name,
            "details": detail,
            "price": price,
            "image_url": "NON"
        }),
        mode: "cors" 
    }
    fetch("http://127.0.0.1:5000/menu",options)
    .then((response) => response.json())
      .then((result) => {
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
              window.open("admin-home.html","_self");
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