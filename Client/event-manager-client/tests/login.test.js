import "isomorphic-fetch"
import {wait} from "yarn/lib/cli";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
import fetchTimeout from "fetch-timeout";
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
            console.log(JSON.stringify(responseJSON));
            return JSON.stringify(responseJSON);
        });
}

function loginuser(username,password) {
    let url = base_url + login;
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
            console.log(responseJSON)
            if(responseJSON.token){
                auth = responseJSON.token
            }
            return JSON.stringify(responseJSON);
        });
}

async function deleteUser(user_id){

    let url = base_url + userDelete(user_id);
    console.log(auth)
    console.log(user_id)
    await fetchTimeout(
        url,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${auth}`,
            }
        },
        2000,
        "Timeout"
    ).then(async (res) => {
        const data = await res.json();
        console.log("---------delete register");
        console.log(data)
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
    "reutlevy26@gmail.com",
    "8111996",
    "0546343178",
    new Address("Israel", "timmorm", "Alon", 208)
);

describe('my test', () => {

    beforeAll(async () => {
        await registerUser(user);
    });

    test('login successfully', async () => {
        await expect(loginuser(user.email,"8111996")).resolves.not.toMatch(/(error)/i)
    });

    test('login bad password', async () => {
        await expect(loginuser("reutlevy85@gmail.com","81119")).resolves.toMatch(/(error)/i)
    });

    test('login bad user name', async () => {
        await expect(loginuser("reutlevy@gmail.com","8111996")).resolves.toMatch(/(error)/i)
    });

    // afterAll (async ()=> {
    //    await deleteUser(user_id);
    // });
})

