import { app } from "framework7-svelte";
import { url } from "../common";
import { logged, user_data, qrcodes } from "../store";
import { get_mine_qrcodes } from "./qrcode"

export function login(username, password){
    return new Promise((resolve, reject) => {
        fetch(url+"/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            reject(error);
        });
    });
}

export function is_logged() {
  return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      fetch(url + "/is_logged", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ token })
          })
          .then(response => response.json())
          .then(data => {
            resolve(data.code)
          })
          .catch(error => {
              reject(error);
          });
  });
}

export function get_me() {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");
        fetch(url + "/get_me", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            })
            .then(response => response.json())
            .then(data => {
                resolve(data.user)
            })
            .catch(error => {
                reject(error);
            });
    });
  }

export function logout(){
  if(localStorage.getItem("token")){
    localStorage.clear()
    // location.reload()
    logged.set(false)
  }
}

export function signin(username, password, name, email){
  return new Promise((resolve, reject) => {
    fetch(url+"/registrati", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, name, email})
    })
    .then(response => response.json())
    .then(data => {
        resolve(data)
    })
    .catch(error => {
        reject(error);
    });
  });
}