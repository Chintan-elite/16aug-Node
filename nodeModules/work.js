
const msg = () => {
    console.log("function calling...");
}

const call = () => {
    console.log("call function calling");
}

const add = (a, b) => {
    console.log(`Addition if ${a} and ${b} is ${a + b}`);
}

module.exports = { msg, call, add } 