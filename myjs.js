

// function myfun() {
//     // alert("cliecked")
//     var uname = document.getElementById("uname").value;
//     alert(uname)
// }



function add() {

    var n1 = Number(document.getElementById("n1").value);
    var n2 = Number(document.getElementById("n2").value);
    var result = document.getElementById("result");
    var r = n1 + n2;
    result.innerHTML = r;
}

function sub() {

    var n1 = Number(document.getElementById("n1").value);
    var n2 = Number(document.getElementById("n2").value);
    var result = document.getElementById("result");
    var r = n1 - n2;
    result.innerHTML = r;
}

function div() {

    var n1 = Number(document.getElementById("n1").value);
    var n2 = Number(document.getElementById("n2").value);
    var result = document.getElementById("result");
    var r = n1 / n2;
    result.innerHTML = r;
}


function mul() {

    var n1 = Number(document.getElementById("n1").value);
    var n2 = Number(document.getElementById("n2").value);
    var result = document.getElementById("result");
    var r = n1 * n2;
    result.innerHTML = r;
}
