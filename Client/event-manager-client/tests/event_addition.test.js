import "isomorphic-fetch"
import {response, wait} from "yarn/lib/cli";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
import {addEventOwner, allEvents, eventManager, remote_base_url} from "../constants/urls";
import fetchTimeout from "fetch-timeout";
const {logApiRequest} = require("../constants/logger");
const {base_url, register, userDelete, login, getEvent} = require("../constants/urls");
const Log = require("../constants/logger");

var user_id = 1;
var auth= "";
var event_id = 1;

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

async function loginuser(username) {
    console.log("============login---------")
    await fetchTimeout(
        base_url + login,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: "8111996",
            }),
        },
        2000,
        "Timeout"
    )
        .then(async (res) => {
            const data = await res.json();
            console.log(data)
            auth = data.token
            user_id = data.id;
        });
}

async function deleteUser(user_id){

    let url = base_url + userDelete(user_id);
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
        console.log(data)
    });
}

async function postEventManager(user_id){

    console.log("============post event manager========");
    let url = base_url + eventManager(user_id);
    console.log(auth)
    console.log(user_id)
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

async function getEventManager(user_id){

    console.log("============GET event manager========");
    let url = base_url + eventManager(user_id);
    console.log(auth)
    console.log(user_id)
    let request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        },
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            return JSON.stringify(responseJSON);
        });
}

async function postEvent(){

    let url = base_url + allEvents;
    console.log(auth)
    console.log(user_id)
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        },
        body: JSON.stringify(event)
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(JSON.stringify(responseJSON));
            if(responseJSON.id){
                event_id = responseJSON.id;
            }
            return JSON.stringify(responseJSON);
        });
}

async function postEventOwner(){

    let url = base_url + addEventOwner(event_id);
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        },
        body: JSON.stringify(eventowner)
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(JSON.stringify(responseJSON));
            if(responseJSON.id){
                event_id = responseJSON.id;
            }
            return JSON.stringify(responseJSON);
        });
}

async function getevent(){

    let url = base_url + getEvent(event_id);
    console.log(auth)
    console.log(event_id)
    let request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${auth}`,
        }
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
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

function Event(type,event_name,date,budget,location) {
    this.type = type;
    this.event_name= event_name;
    this.date= date;
    this.budget= budget;
    this.location = location;
}

function eventOwner(name,phone) {
    this.name = name;
    this.phone= phone;
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

const event = new Event(
    "wedding",
    "hadas@roee",
    "2022-10-08",
    "400",
    "Israel"
);

const eventowner = new eventOwner(
    "amit",
    "0546343178"
)

describe('my test', () => {

    beforeAll(async () => {
        await registerUser(user);
        await loginuser(user.email);
        await postEventManager(user_id);
        await postEvent();
    }, 300000)

    test('check add event owner', async () => {
        await postEventOwner();
        await expect(getevent()).resolves.toMatch(/(amit)/i)
    });
})

