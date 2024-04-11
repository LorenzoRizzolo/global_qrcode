import { app } from "framework7-svelte";
import { url } from "../common";

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
            if(data.code==1){
                console.log(data)
            }
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
  console.log("logout")
  if(localStorage.getItem("token")){
    localStorage.clear()
    location.reload()
  }
}
