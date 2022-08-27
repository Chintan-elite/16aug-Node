
// var n1 = 10;
// var n2 = 20;
// var r = n1 + n2
// console.log(r)


// var fname = "tops";
// var lname = "tech";
// console.log(fname + "       " + lname)

// var a = [10, 20, 30, 10];
// console.log(a)

// var bool = true
// console.log(bool)

// var person1 = {
//     fname: "tops",
//     lname: "tech",
//     email: "tops@gmail.com",
//     phno: "986532444"
// }

// var person2 = {
//     lname: "tech1",
//     fname: "tops1",
//     email: "tops@gmail.com1",
//     phno: "986532444"
// }

// var oArry = [person1, person2, ]

//*****operator************/

//var a = 10;
//var b = 3;

// console.log(a + b)
// console.log(a - b)
// console.log(a * b)
// console.log(a / b)
// console.log(a % b)

//relational oprator
//console.log(a>b)
//console.log(a<b)
// ==
// ===
// !=


//logical

// console.log(true && true)
// console.log(true && false);
// console.log(false && true);
// console.log(false && false);


// console.log(true || true)
// console.log(true || false);
// console.log(false || true);
// console.log(false || false);

// console.log(!true)

//conditinal statement
//if- else

// var a = 2000;
// var b = 300;
// var c = 50;

// if (a > b) {
//     if (a > c) {
//         console.log("A is greater");
//     } else {
//         console.log("C is greater");
//     }
// } else {
//     if (b > c) {
//         console.log("B is greater");
//     }
//     else {
//         console.log("C is greater");
//     }
// }


// if (a > b && a > c) {
//     console.log("A is greater")
// }
// else if (b > a && b > c) {
//     console.log("B is greater");
// }
// else if (c > a && c > b) {
//     console.log("C is greater");
// }

var marks = 50;

//> 90 : A
//70 - 90 : B
//50 - 70 : c
//35 - 50 : d
// Fail
//> 100 : invalid input
//0<0  : invalid imnput

//looping statement
//for
//while
//do-while

// for (var i = 1; i <= 10; i++) {
//     console.log(i)
// }

//var k = [10, 20, 30, 40, 50, 60];

// for (var i = 0; i < k.length; i++) {
//     console.log(k[i]);
// }

// k.forEach(function (i) {
//     console.log(i);
// })

// var a = 20;

// while (a < 20) {
//     console.log(a);
//     a++;
// }

// var a = 20;

// do {
//     console.log(a);
//     a++;
// } while (a < 20);


var l = [10, 20, 30, 40, 50];

// console.log(l.length);
// console.log(l.indexOf(30));
// console.log(l.pop())
// console.log(l.pop())
// console.log(l.reverse())
//l.push(100)
//console.log(l.shift())
//l.unshift(50)
//console.log(l)

// var str = "sun rises in east";
// console.log(str.length);
// console.log(str.charAt(4));
// console.log(str.indexOf("i"));
// console.log(str.lastIndexOf("i"));
// console.log(str.slice(4, 9))
// var t = str.split(" ")
// console.log(t);

// var k;
// class Demo {

//     constructor(i) {
//         k = i;
//         console.log("cons calling...");
//     }

//     display() {
//         console.log(k)
//         console.log("display method calling...");
//     }

//     static run() {
//         console.log("run method calling");
//     }

// }

// var myDemo = new Demo(5);
// myDemo.display();
// //myDemo.run()
// Demo.run();


// var x;
// var y;

// class Calc {

//     constructor(a, b) {
//         x = a;
//         y = b;
//     }

//     add() {
//         console.log(x + y)
//     }

//     square(l) {
//         console.log(l * l)
//     }
// }

// var cl = new Calc(10, 20);
// cl.add();
// cl.square(10)
// cl.square(20);

// var cl1 = new Calc(100, 20);
// cl1.add();


// var myDate = new Date();
// console.log(myDate)
// console.log(myDate.getDate());
// console.log(myDate.getFullYear());

// document.getElementById("dt").innerHTML = myDate


// function square(k) {
//     console.log(k * k);
// }

// square(10)

// function getDate() {
//     var myDate = new Date();
//     document.getElementById("dt").innerHTML = myDate;
// }

// setTimeout(getDate(), 50);

// setTimeout(() => {
//     var myDate = new Date();
//     document.getElementById("dt").innerHTML = myDate;
// }, 5000);


setInterval(() => {
    var myDate = new Date();
    document.getElementById("dt").innerHTML = myDate;
}, 1000);









