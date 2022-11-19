const fs = require("fs");


const updateFile = (data) => {

    const alldata = getdata();

    const duplicate = alldata.find(element => {
        return element.title == data.title
    })

    if (!duplicate)
        return console.log("title not exist!!");

    duplicate.desc = data.desc;
    //alldata.push(duplicate)
    const mydata = JSON.stringify(alldata)
    fs.writeFile("test.json", mydata, () => {
        console.log("file written successfully");
    })
}

const createFile = (data) => {

    const alldata = getdata();

    const duplicate = alldata.find(element => {
        return element.title == data.title
    })

    if (duplicate)
        return console.log("title alredy exist!!");

    alldata.push(data)
    const mydata = JSON.stringify(alldata)
    fs.writeFile("test.json", mydata, () => {
        console.log("file written successfully");
    })
}

const gettitle = (title) => {

    const alldata = getdata();

    const duplicate = alldata.filter(element => {
        return element.title == title
    })

    if (duplicate) {
        console.log(duplicate);
    }
    else {
        console.log("title not found");
    }
}


const readfile = () => {
    const data = getdata();
    console.log(data);
}


const getdata = () => {
    try {
        const data = fs.readFileSync("test.json", "utf8")
        return JSON.parse(data)
    } catch (error) {
        return [];
    }
}

const removetitle = (title) => {
    const alldata = getdata();

    const newdata = alldata.filter(element => {
        return element.title != title
    })


    const mydata = JSON.stringify(newdata)
    fs.writeFile("test.json", mydata, () => {
        console.log("file remove successfully");
    })
}

module.exports = { createFile, readfile, gettitle, removetitle, updateFile }