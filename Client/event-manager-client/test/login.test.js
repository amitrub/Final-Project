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
            console.log("----------------response login first-------------")
            console.log(responseJSON)
        });
}

async function loginuser(username,password) {
    let url = base_url + login;
    console.log("----------login-------");
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: username,
            password: password,
        }),
    }
    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
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
    "reutlevy85@gmail.com",
    "8111996",
    "0546343178",
    new Address("Israel", "timmorm", "Alon", 208)
);

describe('my test', () => {

    beforeAll(() => {
        registerUser(user);
    });

    test('login successfully', async () => {
        await expect(loginuser("reutlevy85@gmail.com","8119996")).resolves.not.toMatch(/(error)/i)
    }, 1000);

    test('login bad password', async () => {
        await expect(loginuser("reutlevy85@gmail.com","8119")).resolves.toMatch(/(error)/i)
    }, 1000);
    // test('register user invalid phone', async () => {
    //     await expect(registerUser(userbadphone)).resolves.toMatch(/(error)/i)
    // }, 1000);
    //
    // test('register user', async () => {
    //     await expect(registerUser(user)).resolves.not.toMatch(/(error)/i)
    // }, 1000);
})

