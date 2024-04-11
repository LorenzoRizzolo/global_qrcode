import { app } from "framework7-svelte";
import { url } from "../common";

export function genera_qrcode(filedata){
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");
        fetch(url + "/create_qrcode", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, filedata })
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

export function get_mine_qrcodes() {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");
        fetch(url + "/get_mine_qrcodes", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
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

  export function get_qr_by_id(id) {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");
        fetch(url + "/get_qr_by_id", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, id })
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