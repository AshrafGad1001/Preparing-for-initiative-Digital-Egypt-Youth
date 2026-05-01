var username = "Ashraf Alaa Gad";

console.log(username);

var username = "Ashraf Alaa Gad";

console.log(username);





function sayHello(name) {
    console.log("Hello " + name);
}

sayHello("Ahmed"); // Hello Ahmed

// Features:

// You can use it before you write it — because of the Hoisting.
// She always has a name.
// The most famous and obvious





var sayHello = function(name) {
    console.log("Hello " + name);
};

sayHello("Ahmed"); // Hello Ahmed

// Difference from Declaration:

// Don't put it before the code — you should know it first
// You deal with it like any variable




var sayHello = function greet(name) {
    console.log("Hello " + name);
};

sayHello("Ahmed"); // Hello Ahmed






// Passed directly as argument — no name
setTimeout(function() {
    console.log("1 second passed!");
}, 1000);

// Or used in forEach
var nums = [1, 2, 3];
nums.forEach(function(num) {
    console.log(num * 2);
});







// Regular function
var add = function(a, b) {
    return a + b;
};

// Arrow function — same thing, shorter
var add = (a, b) => a + b;

add(3, 4); // 7

// No parameters
var sayHi = () => console.log("Hi!");

// One parameter — no brackets needed
var double = num => num * 2;

// Multiple lines — need curly braces and return
var add = (a, b) => {
    var result = a + b;
    return result;
};


(function() {
    console.log("I run immediately!");
})();
// "I run immediately!"


// Problem — x is global, anyone can change it
var x = 10;

// Solution — x is locked inside IIFE
(function() {
    var x = 10; // only exists here
    console.log(x); // 10
})();

console.log(x); // ❌ ReferenceError — x doesn't exist here




function Employee(name, salary) {
    this.name   = name;
    this.salary = salary;
}

var emp1 = new Employee("Ahmed", 5000);


function doWork(task, callback) {
    console.log("Doing: " + task);
    callback(); // run the function that was passed
}

function done() {
    console.log("Work is done!");
}

doWork("Cleaning", done);
// Doing: Cleaning
// Work is done!


var nums = [1, 2, 3, 4, 5];

nums.filter(function(num) {   // ← هنا الـ function دي callback
    return num > 3;
});
// [4, 5]




// Takes a function as argument — Higher Order
function repeat(action, times) {
    for (var i = 0; i < times; i++) {
        action();
    }
}

repeat(function() {
    console.log("Hello!");
}, 3);
// Hello!
// Hello!
// Hello!



// Returns a function — also Higher Order
function multiplier(x) {
    return function(num) {
        return num * x;
    };
}

var double = multiplier(2);
var triple = multiplier(3);

double(5); // 10
triple(5); // 15




function countDown(num) {
    if (num <= 0) {
        console.log("Done!");
        return;
    }
    console.log(num);
    countDown(num - 1); // calls itself
}

countDown(3);
// 3
// 2
// 1
// Done!










