
const data = process.argv

//console.log(data);

const a = process.argv[2]
const b = process.argv[3]
const choice = process.argv[4]


if (choice == "add") {
    console.log(Number(a) + Number(b));
}
else if (choice === "sub") {
    console.log(Number(a) - Number(b));
}
else if (choice === "mul") {
    console.log(Number(a) * Number(b));
}
else {
    console.log("invalid choice");
}

