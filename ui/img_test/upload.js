var image_name;

function upload(){
    var myInput = document.getElementById('file_input');

    var data = new FormData()
    data.append('file', myInput.files[0])

    options = {
        method: 'POST',
        body: data,
        mode: "cors" 
    };

    fetch('http://127.0.0.1:5000/image', options)
    .then((data)=>data.json())
    .then((response)=>{
        console.log(response);
        image_name = response.data
        // var objectURL = URL.createObjectURL(myBlob); 
        // myImage.src = objectURL; 
    });
}

function preview(){
    var myImage = document.getElementById('myImage');

    options = {
        method: 'GET',
        mode: "cors" 
    };

    fetch('http://127.0.0.1:5000/image/' + image_name, options)
    .then((data)=>data.json())
    .then((result)=>{
        alert('This is the result : ' + result.image);
        //var enc = window.atob(result.image);
        //var objectURL = URL.createObjectURL(enc); 
        myImage.src = 'data:image/png;base64,'+ result.image; 
    });
    
}

function previewImage(fileInput) {
    var file = fileInput.files[0];
          
        var img=document.getElementById("thumbnail");            
        img.file = file;    
        var reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                aImg.src = e.target.result; 
            }; 
        })(img);
        reader.readAsDataURL(file);
}