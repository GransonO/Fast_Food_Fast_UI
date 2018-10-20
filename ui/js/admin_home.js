//Fetch API script for usage in the front end pages
const user_token = localStorage.getItem("Fast_Food_Cookie");
//document.getElementById("user_register").addEventListener("click",userDetails);

const modal_view = document.getElementById("modal-item");

window.addEventListener("load",getAdminItems)


window.onclick = function(event) {
    if (event.target == modal_view) {
        modal_view.style.display = "none";
    }
}


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
                        <img id="delete" name=${item.item_id} class="delete" onclick="confirmDeleteItemID(${item.item_id},${item.price},'${item.item_name}','${item.details}')" src="../img/logo/delete.png" alt="delete">
                        <img id="edit" name=${item.item_id} class="edit" onclick="editItemID(${item.item_id},${item.price},'${item.item_name}','${item.details}')" src="../img/logo/edit.png" alt="edit">
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

function confirmDeleteItemID(id,price,name,details){
    let modal_output= `
        <div class="modal-content">
            <h3 style="color:red;"> Do you really want to delete this item?</h3>
            <p><strong>Item Id No: ${id}</strong></p>
            <p><strong>Item Name : ${name}</strong></p>
            <p><strong>Item Price : ${price}</strong></p>        
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


function editItemID(id,price,name,details){
    let modal_output= `
        <div class="modal-content">
        <h3 style="color:orange;"> Do you really want to Edit this item?</h3>
        <p><strong>Item Id No: ${id}</strong></p> 
        <p><strong>Item Name : </strong><input id='update_name' type='text' class="admin-custom-input" value='${name}'></p>
        <p><strong>Item Price : </strong><input id='update_price' type='number' class="admin-custom-input" value='${price}'></p>
        <p><strong>Item Details : </strong><textarea id="update_detail" class="admin-custom-textarea" type="text" placeholder='${details}'></textarea></p>
        <button class="okay" onclick="UpdateItemID(${id},${price},'${name}','${details}')">Edit</button>
        <button class="cancel" onclick="dismissModal()">Cancel</button>
        </div>
    `;  
    document.getElementById("modal-item").innerHTML = modal_output;  
    modal_view.style.display = "block"; 
}

function UpdateItemID(id,u_price,u_name,u_details){
    var name = document.getElementById('update_name').value;
    var price = document.getElementById('update_price').value;
    var detail = document.getElementById('update_detail').value;

    if(name == ''){
        name = u_name;

    }if(price == ''){
        price = u_price;

    }if(detail == ''){
        detail = u_details;

    }

    //alert("ID : " + id + " > " + name + " : " + price + " : " + detail);
    options = {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'ADMIN-KEY' : user_token
        },
        body:JSON.stringify({
            "item_name": name,
            "details": detail,
            "price": price,
            "image_url": "NON",
            "item_id": id
        }),
        mode : "cors" 
    }

    fetch("http://127.0.0.1:5000/menu", options)
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
            let output =`
            <div class="modal-content">
            <h3 style="color:green;"> ${result.response}</h3>
            <h5 style="color:green;"> Update Details </h5>
            <p> <strong>Item Name : </strong> <br>${result.data.item_name}</p>
            <p> <strong>Item Description : </strong> <br>${result.data.details}</p>
            <p> <strong>Item price : </strong> <br>${result.data.price}</p>
            
            <input id="refresh_btn" class="custom-input-button top-margin" type ="button" value="Refresh Page">
            </div>
            `;                
          document.getElementById("modal-item").innerHTML = output;  
          modal_view.style.display = "block";  
          document.getElementById("refresh_btn").addEventListener("click",refresh_page)
          }
      })
      .catch((error) => {
        console.log(error)
      });

}

function refresh_page(){
    window.open("admin-home.html","_self");
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