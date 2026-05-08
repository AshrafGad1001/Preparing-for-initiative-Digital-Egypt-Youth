// rest and spread operator



// rest operator :Collect Values into an array
/*
- Must be the last parameter in the function
- you cant't have more than one rest parameter in a function
- rest inside a function is an array,
*/


function Calc(operation, ...numbers) {
    return (eval(numbers.join(operation)));
}


// spread operator :Expand an array into individual elements
/*
- n array Whem use spreed operator
- in function call 
*/