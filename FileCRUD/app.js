
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


yargs.command({
    command: "read",
    handler: function (argv) {

        file.readfile();

    }
})

yargs.command({
    command: "findtitle",
    builder: {
        title: {
            type: String
        }
    },
    handler: function (argv) {
        file.gettitle(argv.title)
    }
})

yargs.command({
    command: "remove",
    builder: {
        title: {
            type: String
        }
    },
    handler: function (argv) {
        file.removetitle(argv.title)
    }
})

yargs.command({
    command: "update",
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
        file.updateFile(data)

    }

})



yargs.argv