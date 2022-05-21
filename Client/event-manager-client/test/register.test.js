import "isomorphic-fetch"
import {wait} from "yarn/lib/cli";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
const {logApiRequest} = require("../constants/logger");
const {base_url, register} = require("../constants/urls");
const Log = require("../constants/logger");

async function registerUser(user) {
    let url = base_url + register;
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }
    return fetch(url, request, {timeout: 500})
    .then((response) => response.json())
            .then((responseJSON) => {
                // do stuff with responseJSON here...
                console.log(JSON.stringify(responseJSON))
                return JSON.stringify(responseJSON);
    });
}
function User(name,email,password,phone,address) {
    this.name = name;
    this.email= email;
    this.password= password;
    this.phone= phone;
    this.address = address;
}

function Address(country, city, street, number) {
    this.country = country;
    this.city = city;
    this.street = street;
    this.number = number;
}
const user = new User(
    "reut",
    "reutlevy38@gmail.com",
    "8111996",
    "0546343178",
    new Address("Israel", "timmorm", "Alon", 208)
);

test('register user', async () => {
    await expect(registerUser(user)).resolves.not.toMatch(/(error)/i)
}, 1000);