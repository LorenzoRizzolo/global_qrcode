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