

const getId = () => {

    setTimeout(() => {
        const eid = [10, 20, 30, 40, 50, 60]
        console.log(eid);
        setTimeout((id) => {
            emp = {
                name: "Vaibhav",
                email: "vaibhav@gmail.com",
                phno: 56598556

            }
            console.log(`id : ${id}, name  :${emp.name}, email : ${emp.email}`);
            setTimeout(() => {
                console.log("calling...")
            }, 2000);
        }, 2000, eid[1]);
    }, 2000);

}



getId();