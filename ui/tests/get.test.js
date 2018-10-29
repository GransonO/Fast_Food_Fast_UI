const all_logic = require('./get')

//Get Test
test('Sends a get request to server',() =>{ 
    return all_logic.fetchGet().then(data => {  
        console.log(data) //Show what has been returned
        console.log(data.response) //Shows what is being tested       
        expect(data.response).toBe('This is a get test');
    });
 });
 