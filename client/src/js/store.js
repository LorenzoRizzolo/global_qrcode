import { writable } from 'svelte/store';

export let logged = writable(false)

export let user_data = writable(logged ? JSON.parse(localStorage.getItem("user")) : { username:"", password:"", email:"", name:""})

export let qrcodes = writable([])

export let qrcode_scanner_data = writable({})