import {
    addEventOwner,
    allEvents,
    eventManager,
    getEvent,
    getOrPostEventSuppliers,
    postEventSchedule
} from "../constants/urls";

const {base_url, register, login, userDelete} = require("../constants/urls");
const fetchTimeout = require("fetch-timeout");

export default class testsHelper {
    user_id = 1;
    auth= "";
    event_id = 1;
    registerUser(user) {
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
                    this.user_id = responseJSON.id;
                }
                console.log("------------id post-------");
                console.log(this.user_id)
                return JSON.stringify(responseJSON);
            });
    }
     loginuser(username,password) {
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
                if(responseJSON.token){
                    this.auth = responseJSON.token
                }
                this.user_id = responseJSON.id;
                return JSON.stringify(responseJSON);
            });
    }

    async postEventManager(){
    let url = base_url + eventManager(this.user_id);
    await fetchTimeout(
        url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.auth}`,
            }
        },
        2000,
        "Timeout"
    ).then(async (res) => {
        const data = await res.json();
    });
   }

    async getEventManager(){
        console.log("===========get event manager--------")
        console.log(this.user_id)
    let url = base_url + eventManager(this.user_id);
    let request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.auth}`,
        },
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            return JSON.stringify(responseJSON);
        });
    }

    async postEvent(){
     console.log("------------id post-------");
     console.log(this.user_id)
    let url = base_url + allEvents;
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.auth}`,
        },
        body: JSON.stringify(this.event)
    }

    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(JSON.stringify(responseJSON));
            if(responseJSON.id){
                this.event_id = responseJSON.id;
            }
            return JSON.stringify(responseJSON);
        });
    }

    async getEvent(){
    console.log("------------id get-------");
    console.log(this.user_id)
    let url = base_url + getEvent(this.event_id);
    let request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.auth}`,
        }
    }
    return fetch(url, request, {timeout: 500})
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(JSON.stringify(responseJSON))
            return JSON.stringify(responseJSON);
        });
    }

    async postEventOwner(event_owner){

        let url = base_url + addEventOwner(this.event_id);
        let request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.auth}`,
            },
            body: JSON.stringify(event_owner)
        }

        return fetch(url, request, {timeout: 500})
            .then((response) => response.json())
            .then((responseJSON) => {
                return JSON.stringify(responseJSON);
            });
    }

    async postSupplier(supplier){

        let url = base_url + getOrPostEventSuppliers(this.event_id);
        let request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.auth}`,
            },
            body: JSON.stringify(supplier)
        }

        return fetch(url, request, {timeout: 500})
            .then((response) => response.json())
            .then((responseJSON) => {
                return JSON.stringify(responseJSON);
            });
    }

    async posteventschedule(event_schedule){

        let url = base_url + postEventSchedule(this.event_id);
        let request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.auth}`,
            },
            body: JSON.stringify(event_schedule)
        }

        return fetch(url, request, {timeout: 500})
            .then((response) => response.json())
            .then((responseJSON) => {
                return JSON.stringify(responseJSON);
            });
    }


    async geteventsub(subtype){
        let url = base_url + `/api/events/${this.event_id}/${subtype}/`
        let request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.auth}`,
            }
        }
        return fetch(url, request, {timeout: 500})
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(JSON.stringify(responseJSON))
                return JSON.stringify(responseJSON);
            });
    }

    // async deleteUser(user_id){
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

    User(name,email,password,phone,address) {
        this.name = name;
        this.email= email;
        this.password= password;
        this.phone= phone;
        this.address = address;
    }

    Address(country, city, street, number) {
        this.country = country;
        this.city = city;
        this.street = street;
        this.number = number;
    }
    Event(type,event_name,date,budget,location) {
        this.type = type;
        this.event_name= event_name;
        this.date= date;
        this.budget= budget;
        this.location = location;
    }
    eventOwner(name,phone) {
        this.name = name;
        this.phone= phone;
    }

    Supplier(name,phone,job,price) {
        this.name = name;
        this.phone= phone;
        this.job = job;
        this.price = price;
    }

    eventSchedule(from,to,description) {
        this.start_time = from;
        this.end_time= to;
        this.description = description;
    }

    event = new this.Event(
        "wedding",
        "hadas@roee",
        "2022-10-08",
        "400",
        "Israel"
    );

    user = new this.User(
        "reut",
        "reut18@gmail.com",
        "8111996",
        "0546343178",
        new this.Address("Israel", "timmorm", "Alon", 208)
    );

    userbademail = new this.User(
        "reut",
        "12345",
        "8111996",
        "0546343178",
        new this.Address("Israel", "timmorm", "Alon", 208)
    );

    userbadphone = new this.User(
        "reut",
        "reutlevy18@gmail.com",
        "8111996",
        "",
        new this.Address("Israel", "timmorm", "Alon", 208)
    );

    userbadpassword = new this.User(
        "reut",
        "reutlevy18@gmail.com",
        "",
        "0546343178",
        new this.Address("Israel", "timmorm", "Alon", 208)
    );

    eventownervalid = new this.eventOwner(
        "amit",
        "0546343178"
    )

    suppliervalid = new this.Supplier(
        "reut",
        "0546343178",
        "flowers",
        "1000"
    )

    eventschvalid = new this.eventSchedule(
        "2022-10-12 06:00",
        "2022-10-12 07:00",
        "flowers meeting",
    )

    eventownernotvalid = new this.eventOwner(
        "amit",
        ""
    )

    suppliernotvalid = new this.Supplier(
        "reut",
        "",
        "flowers",
        "1000"
    )

    eventschnotvalid = new this.eventSchedule(
        "2022-10-12",
        "2022-10-12",
        "flowers meeting",
    )
}


