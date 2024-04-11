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
            if(data.code==100){
              localStorage.setItem("token", data.token)
              localStorage.setItem("user", JSON.stringify(data.user))
              location.reload()
            }else if(data.code=="101"){
              app.f7.dialog.alert(data.details, "Login error")
            }else{
              app.f7.dialog.alert(data.details, "General error")
            }
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

export function logout(){
  console.log("logout")
  if(localStorage.getItem("token")){
    localStorage.clear()
    location.reload()
  }
}
