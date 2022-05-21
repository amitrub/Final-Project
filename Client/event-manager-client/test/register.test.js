import "isomorphic-fetch"
import {wait} from "yarn/lib/cli";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
const {logApiRequest} = require("../constants/logger");
const {base_url, register, userDelete, login} = require("../constants/urls");
const Log = require("../constants/logger");

var user_id = 1;
var auth= "";
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
                if(responseJSON.id){
                    user_id = responseJSON.id;
                }
                return JSON.stringify(responseJSON);
    });
}

async function loginuser() {
    let url = base_url + login;
    console.log("----------login-------");
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: "reutlevy65@gmail.com",
            password: "8111996",
        }),
    }
    fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log("hellllllllo")
            console.log(responseJSON.token)
            auth = responseJSON.token
        });
}

async function deleteUser(user_id){

    let url1 = base_url + login;
    // let auth= "";
    // let request1 = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         email: "reutlevy63@gmail.com",
    //         password: "8111996",
    //     }),
    // }
    // fetch(url1, request1, {timeout: 500})
    //     .then((response) => response.json())
    //     .then((responseJSON) => {
    //         console.log("------------hello---------")
    //         console.log(responseJSON)
    //         auth = responseJSON.token
    //     });
    let url = base_url + userDelete(user_id);
    console.log("----------delete-------");
    console.log(user_id)
    console.log(auth)
    let request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        }
    }
    fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(JSON.stringify(responseJSON));
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
    "reutlevy65@gmail.com",
    "8111996",
    "0546343178",
    new Address("Israel", "timmorm", "Alon", 208)
);

const userbademail = new User(
    "reut",
    "12345",
    "8111996",
    "0546343178",
    new Address("Israel", "timmorm", "Alon", 208)
);

const userbadphone = new User(
    "reut",
    "12345",
    "8111996",
    "",
    new Address("Israel", "timmorm", "Alon", 208)
);

describe('my test', () => {

    test('register user bad email', async () => {
        await expect(registerUser(userbademail)).resolves.toMatch(/(error)/i)
    }, 1000);

    test('register user invalid phone', async () => {
        await expect(registerUser(userbadphone)).resolves.toMatch(/(error)/i)
    }, 1000);

    test('register user', async () => {
        await expect(registerUser(user)).resolves.not.toMatch(/(error)/i)
    }, 1000);
})

