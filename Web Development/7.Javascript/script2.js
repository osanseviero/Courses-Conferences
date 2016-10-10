if (3 > 2) {
    console.log("Good job");
}

var theNumber = Number(prompt("Pick a number: "));

if (!isNaN(theNumber)) {
    console.log("Your number is the square root of " + theNumber * theNumber);
    if (theNumber < 10) {
        console.log("Small");
    } else if (theNumber < 100) {
        console.log("Small");
    } else {
        console.log("Large");
    }
} else {
    console.log("Hey, that wasn't a number");
}


var num = 0;
while (num < 12) {
    console.log(num);
    num = num + 2;
}

for(var num = 0; num <= 12; num = num + 2) {
    console.log(num);
}

for(var num = 0; num <= 12; num += 2) {
    console.log(num);
}

for(var num = 0; num < 7; num += 1) {
    var holdN = '';
    for(var num2 = 0; num2 <= num; num2 += 1) {
        holdN += '#';
    }
    console.log(holdN);
}

for(var num = 0; num <= 100; num += 1) {
    if(num % 3 === 0 && num % 5 === 0) {
        console.log('FizzBuzz');
    }
    else if(num % 3 === 0) {
        console.log('Fizz');
    }
    else if(num % 5 === 0) {
        console.log('Buzz');
    }
    else {
        console.log(num);
    }
    
}

var square = function(x) {
    return x * x;
}

console.log(square(5));

var power = function(base, exponent) {
    var result = 1;
    for(var count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
};

function power2(base, exponent) {
    var result = 1;
    for(var count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
}

function power3(base, exponent) {
    if(exponent === 0) {
        return 1;
    }
    else {
        return base * power3(base, exponent-1);
    }
}

console.log(power(2,3));
console.log(power2(2,3));
console.log(power3(2,3));
















