const all_logic = require('./logic')

test('multiply 5 * 5 to equal 10', ()=>{
    expect(all_logic.multiply(5,5)).toBe(25);
});

//Get Test
test('Sends a get request to server',() =>{ 
   return all_logic.fetchGet().then(data => {  
       console.log(data) //Show what has been returned
       console.log(data.response) //Shows what is being tested       
       expect(data.response).toBe('This is a get test');
   });
});

//Get put
test('Sends a put request to server',() =>{ 
    return all_logic.fetchPut().then(data => {  
        console.log(data) //Show what has been returned
        console.log(data.response) //Shows what is being tested       
        expect(data.response).toBe('This is a put test');
    });
});

//Get post
test('Sends a post request to server',() =>{ 
    return all_logic.fetchPost().then(data => {  
        console.log(data) //Show what has been returned
        console.log(data.response) //Shows what is being tested       
        expect(data.response).toBe('This is a post test');
    });
});

//Get delete
test('Sends a delete request to server',() =>{ 
    return all_logic.fetchDelete().then(data => {  
        console.log(data) //Show what has been returned
        console.log(data.response) //Shows what is being tested       
        expect(data.response).toBe('This is a delete test');
    });
});