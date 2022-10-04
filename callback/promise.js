

const getid = new Promise((resolve, reject) => {

    setTimeout(() => {
        const eid = [10, 20, 30, 40, 50];
        return resolve(eid)
        // return reject("errorr")
    }, 2000);
})

const empd = (eid) => {
    return new Promise((resolve, reject) => {

        setTimeout((id) => {
            emp = {
                name: "Vaibhav",
                email: "vaibhav@gmail.com",
                phno: 56598556

            }

            // return resolve(`id : ${id}, name  :${emp.name}, email : ${emp.email}`)
            return reject("emp details not found..")
        }, 3000, eid);


    })
}


// getid.then(result => {
//     console.log(result);
//     return empd(result[3])
// }).then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })




const getempid = async () => {

    try {
        const result = await getid;
        const data = await empd(result[2]);
        console.log(result);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

getempid();

