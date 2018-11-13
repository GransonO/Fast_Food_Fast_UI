var axios = require('axios');

const all_logic = {
     multiply : function(num1,num2) { //Base test for experimentation
         return num1 * num2;
     }
    ,
     //Test for get methods
    fetchGet : () => 
        axios.get('https://fast-food-fast-c4.herokuapp.com/test')
        .then(response => response.data)
        .catch(error => 'error')
        ,
    //Test for put method
    fetchPut : () => 
        axios.put('https://fast-food-fast-c4.herokuapp.com/test')
        .then(response => response.data)
        .catch(error => 'error')
        ,
    //Test for post method
    fetchPost : () => 
        axios.post('https://fast-food-fast-c4.herokuapp.com/test')
        .then(response => response.data)
        .catch(error => 'error')
        ,
    //Test for delete method
    fetchDelete : () => 
        axios.delete('https://fast-food-fast-c4.herokuapp.com/test')
        .then(response => response.data)
        .catch(error => 'error')
    
}

module.exports = all_logic;
