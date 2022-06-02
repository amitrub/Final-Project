import "isomorphic-fetch"
import {response, wait} from "yarn/lib/cli";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
import {remote_base_url} from "../constants/urls";
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
                return JSON.stringify(responseJSON);
    });
}

async function loginuser() {
    console.log("------------login user--------");
    let url = base_url + login;
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
           email: "reutlevy98@gmail.com",
           password: "8111996",
         }),
    }

    await fetchTimeout(
        base_url + login,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "reutlevy98@gmail.com",
                password: "8111996",
            }),
        },
        2000,
        "Timeout"
        )
        .then(async (res) => {
            const data = await res.json();
            auth = data.token
        });
}

async function deleteUser(user_id){

    let url = base_url + userDelete(user_id);
    console.log("----------delete-------");
    console.log(user_id)
    console.log(auth)
    await fetchTimeout(
        url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${auth}`,
            }
        },
        2000,
        "Timeout"
    ).then(async (res) => {
            const data = await res.json();
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
    "reutlevy98@gmail.com",
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

    afterAll(() => {
        loginuser();
        deleteUser(user_id)
    }, );

    test('register user bad email', () => {
        expect(registerUser(userbademail)).resolves.toMatch(/(error)/i)
    });

    test('register user invalid phone', () => {
        expect(registerUser(userbadphone)).resolves.toMatch(/(error)/i)
    });

    test('register user' ,() => {
        expect(registerUser(user)).resolves.not.toMatch(/(error)/i)
    });
})

