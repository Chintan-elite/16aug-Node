const work = require("./work")


work.call()
work.msg()
work.add(10, 20)
work.add(10, 80)

module.exports = { msg, call, add } 