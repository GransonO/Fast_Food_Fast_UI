var axios = require('axios');

all_function = {
     //Test for get methods
fetchGet : () => 
            axios.get('http://127.0.0.1:5000/test')
            .then(response => response.data)
            .catch(error => 'error')
,

//Test for get methods
fetchPut : () => 
            axios.get('http://127.0.0.1:5000/test')
            .then(response => response.data)
            .catch(error => 'error')
     
}

module.exports = all_function