import { login } from "../../../lib/login";

export async function POST({ request }){
    const data = await request.json()
    const username = data.username
    const password = data.password
    return await login(username, password)
}