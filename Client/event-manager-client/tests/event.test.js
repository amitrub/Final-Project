// import "isomorphic-fetch"
// import fetchTimeout from "fetch-timeout";
// import {eventManager} from "../constants/urls";
// import {logApiRequest} from "../constants/logger";
// import {STATUS_FAILED, STATUS_SUCCESS} from "../constants/errorHandler";
// const {base_url, register, userDelete, login} = require("../constants/urls");
// const Log = require("../constants/logger");
//
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
//         .then((response) => response.json())
//         .then((responseJSON) => {
//             if(responseJSON.id){
//                 user_id = responseJSON.id;
//             }
//             return JSON.stringify(responseJSON);
//         });
// }
//
// async function loginuser() {
//     console.log("------------login user--------");
//     await fetchTimeout(
//         base_url + login,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email: "reutlevy1@gmail.com",
//                 password: "8111996",
//             }),
//         },
//         2000,
//         "Timeout"
//     )
//         .then(async (res) => {
//             const data = await res.json();
//             console.log(auth)
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
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Token ${auth}`,
//             }
//         },
//         2000,
//         "Timeout"
//     ).then(async (res) => {
//         const data = await res.json();
//     });
// }
//
// async function postEventManager() {
//     let url = base_url + eventManager(user_id);
//     console.log("=============post event manager=========")
//     console.log(auth)
//     // let request = {
//     //     method: "POST",
//     //     headers: {
//     //         "Content-Type": "application/json",
//     //         Authorization: `Token ${auth}`,
//     //     },
//     // };
//     // await fetch(url, request, { timeout: 2000 })
//     //     .then(async (res) => {
//     //         const data = await res.json();
//     //         console.log(data)
//     //     })
//     //     .catch((error) => console.log("postEventManager catch error", error));
// }
//
// async function getEventManager(){
//     console.log("----------get event manager--------")
//     console.log(auth)
//     let url = base_url + eventManager(user_id);
//     await fetchTimeout(
//         url,
//         {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Token ${auth}`,
//             }
//         },
//         2000,
//         "Timeout"
//     ).then(async (res) => {
//         console.log(res)
//         const data = await res.json();
//         console.log(data)
//         return data.is_event_manager;
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
//     "reutlevy1@gmail.com",
//     "8111996",
//     "0546343178",
//     new Address("Israel", "timmorm", "Alon", 208)
// );
//
// describe('my test', () => {
//
//     beforeAll(() => {
//      //   registerUser(user);
//         loginuser();
//         postEventManager();
//     });
//
//     test('check user is an event manager', () => {
//         expect(getEventManager()).resolves.toMatch(/(false)/i)
//     });
//
//     afterAll (() => {
//         deleteUser(user_id) ;
//     });
// })
//
