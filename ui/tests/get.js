var axios = require('axios');

all_function = {
     //Test for get methods
fetchGet : () => 
            axios.get('https://fast-food-fast-c4.herokuapp.com/test')
            .then(response => response.data)
            .catch(error => 'error')
,

//Test for get methods
fetchPut : () => 
            axios.get('https://fast-food-fast-c4.herokuapp.com/test')
            .then(response => response.data)
            .catch(error => 'error')
     
}

module.exports = all_function