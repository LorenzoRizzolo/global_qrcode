import { login, register } from "../../../lib/login";

export async function POST({ request }){
    const data = await request.json()
    const username = data.username
    const password = data.password
    const email = data.email
    const name = data.name
    return await register(username, password, name, email)
}