var axios = require('axios');

const all_logic = {
     multiply : function(num1,num2) { //Base test for experimentation
         return num1 * num2;
     }
    ,
     //Test for get methods
    fetchGet : () => 
        axios.get('http://127.0.0.1:5000/test')
        .then(response => response.data)
        .catch(error => 'error')
        ,
    //Test for put method
    fetchPut : () => 
        axios.put('http://127.0.0.1:5000/test')
        .then(response => response.data)
        .catch(error => 'error')
        ,
    //Test for post method
    fetchPost : () => 
        axios.post('http://127.0.0.1:5000/test')
        .then(response => response.data)
        .catch(error => 'error')
        ,
    //Test for delete method
    fetchDelete : () => 
        axios.delete('http://127.0.0.1:5000/test')
        .then(response => response.data)
        .catch(error => 'error')
    
}

module.exports = all_logic;

