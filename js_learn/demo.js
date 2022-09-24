var headers = new Headers();
headers.append("X-CSCAPI-KEY", "UXF2OHQ2WjBMT1Y5Q05MQzVhNE1sT3VJSk02Y3BaNzlRNHRVMHRjZA==");

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

const getcountris = () => {

    fetch("https://api.countrystatecity.in/v1/countries", requestOptions).then(resp => {
        return resp.json();
    }).then(result => {
        var row = "";
        row += "<option>" + result[100].name + "</option>"
        for (var i = 0; i < result.length; i++) {
            console.log(result[i]);
            row += "<option value=" + result[i].iso2 + ">" + result[i].name + "</option>"
        }
        // console.log(row);
        country.innerHTML = row
    }).catch(err => {
        console.log(err);
    })


}


const getstate = (ccode) => {
    fetch(`https://api.countrystatecity.in/v1/countries/${ccode}/states`, requestOptions).then(resp => {
        return resp.json();
    }).then(result => {
        var row = "";
        row += "<option>---select state--</option>"
        for (var i = 0; i < result.length; i++) {

            row += "<option value=" + result[i].iso2 + ">" + result[i].name + "</option>"
        }
        // console.log(row);
        state.innerHTML = row
    }).catch(err => {
        console.log(err);
    })
}