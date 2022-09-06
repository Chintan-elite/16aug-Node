const opration = require("./calcOpration")

const yargs = require("yargs")


yargs.command({
    command: "add",
    builder: {
        n1: {
            type: Number
        },
        n2: {
            type: Number
        }
    },
    handler: function (argv) {
        opration.add(argv.n1, argv.n2)
    }
})

yargs.command({
    command: "mul",
    handler: function () {
        console.log("mul calling...");
    }
})

yargs.argv