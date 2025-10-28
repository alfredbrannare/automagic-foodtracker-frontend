import LoginRequest from "../types.ts"

const api = "https://localhost:8080"



export const loginApi = async (username: string, password: string) => {
    try {
        const data = await axios.post<LoginRequest>(`${api}/auth/login`, {})

    } catch (error) {

    }
}