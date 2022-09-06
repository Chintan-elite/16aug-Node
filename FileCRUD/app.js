
const yargs = require("yargs")
const file = require("./file")

yargs.command({
    command: "create",
    builder: {
        title: {
            type: String
        },
        desc: {
            type: String
        }
    },
    handler: function (argv) {

        const data = {
            title: argv.title,
            desc: argv.desc
        }
        file.createFile(data)

    }

})

yargs.argv