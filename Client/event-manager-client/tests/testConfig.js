const {base_url, register, login, userDelete} = require("../constants/urls");
const fetchTimeout = require("fetch-timeout");

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

async function loginuser(username, password) {
    console.log("------------login user--------");
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