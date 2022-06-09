import "isomorphic-fetch"
import {response, wait} from "yarn/lib/cli";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
import {remote_base_url} from "../constants/urls";
import fetchTimeout from "fetch-timeout";
import testsHelper from "./testsHelper";
const {logApiRequest} = require("../constants/logger");
const {base_url, register, userDelete, login} = require("../constants/urls");
// var user_id = 1;
// var auth= "";
// async function registerUser(user) {
//     let url = base_url + register;
//     let request = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//     }
//     return fetch(url, request, {timeout: 500})
//     .then((response) => response.json())
//             .then((responseJSON) => {
//                 if(responseJSON.id){
//                     user_id = responseJSON.id;
//                 }
//                 return JSON.stringify(responseJSON);
//     });
// }
//
// async function loginuser(username) {
//     console.log("============login---------")
//     console.log(username)
//     await fetchTimeout(
//         base_url + login,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email: username,
//                 password: "8111996",
//             }),
//         },
//         2000,
//         "Timeout"
//         )
//         .then(async (res) => {
//             const data = await res.json();
//             auth = data.token
//         });
// }
//
// async function deleteUser(user_id){
//
//     let url = base_url + userDelete(user_id);
//     await fetchTimeout(
//         url,
//         {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Token ${auth}`,
//             }
//         },
//         2000,
//         "Timeout"
//     ).then(async (res) => {
//         const data = await res.json();
//         console.log(data)
//     });
// }
//
// function User(name,email,password,phone,address) {
//     this.name = name;
//     this.email= email;
//     this.password= password;
//     this.phone= phone;
//     this.address = address;
// }
//
// function Address(country, city, street, number) {
//     this.country = country;
//     this.city = city;
//     this.street = street;
//     this.number = number;
// }
// const user = new User(
//     "reut",
//         "reut18@gmail.com",
//     "8111996",
//     "0546343178",
//     new Address("Israel", "timmorm", "Alon", 208)
// );
//
// const userbademail = new User(
//     "reut",
//     "12345",
//     "8111996",
//     "0546343178",
//     new Address("Israel", "timmorm", "Alon", 208)
// );
//
// const userbadphone = new User(
//     "reut",
//     "12345",
//     "8111996",
//     "",
//     new Address("Israel", "timmorm", "Alon", 208)
// )
//
// const userbadpassword = new User(
//     "reut",
//     "12345",
//     "",
//     "0546343178",
//     new Address("Israel", "timmorm", "Alon", 208)
// );

const helper = new testsHelper();

describe('my test', () => {

    beforeAll(async() =>{
        await helper.registerUser(helper.user);
    })

    test('register user bad email', async () => {
        await expect(helper.registerUser(helper.userbademail)).resolves.toMatch(/(error)/i)
    });

    test('register user invalid phone', async () => {
        await expect(helper.registerUser(helper.userbadphone)).resolves.toMatch(/(error)/i)
    });

    test('register user with the same name' , async () => {
        await expect(helper.registerUser(helper.user)).resolves.toMatch(/(error)/i)
    });

    test('register user with no password' , async () => {
        await expect(helper.registerUser(helper.userbadpassword)).resolves.toMatch(/(error)/i)
    });
})

