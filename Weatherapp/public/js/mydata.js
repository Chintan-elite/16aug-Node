
var headers = new Headers();
headers.append("X-CSCAPI-KEY", "UXF2OHQ2WjBMT1Y5Q05MQzVhNE1sT3VJSk02Y3BaNzlRNHRVMHRjZA==");

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};


const getcontries = () => {


    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
        .then(response => response.json())
        .then(result => {

            var row = "";
            row += "<option>---Select country----</option>"
            for (var i = 0; i < result.length; i++) {
                row += "<option value=" + result[i].iso2 + ">" + result[i].name + "</option>"
            }
            document.getElementById("country").innerHTML = row;

        })
        .catch(error => console.log('error', error));

}

var ccode;
const getState = (val) => {

    ccode = val;
    fetch(`https://api.countrystatecity.in/v1/countries/${val}/states`, requestOptions)
        .then(response => response.json())
        .then(result => {
            var row = "";
            row += "<option>---Select state----</option>"
            for (var i = 0; i < result.length; i++) {
                row += "<option value=" + result[i].iso2 + ">" + result[i].name + "</option>"
            }
            document.getElementById("state").innerHTML = row;
        })
        .catch(error => console.log('error', error));

}

const getcities = (value) => {


    fetch(`https://api.countrystatecity.in/v1/countries/${ccode}/states/${value}/cities`, requestOptions)
        .then(response => response.json())
        .then(result => {
            var row = "";
            row += "<option>---Select city----</option>"
            for (var i = 0; i < result.length; i++) {
                row += "<option value=" + result[i].name + ">" + result[i].name + "</option>"
            }
            document.getElementById("city").innerHTML = row;
        })
        .catch(error => console.log('error', error));

}