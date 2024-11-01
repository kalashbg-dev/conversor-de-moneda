// import the axios instance made in the axios.ts file
import axios from './axios'

// import the types for the response
type LoginResponse = {
  token: string
}

type RegisterResponse = {
  message: string
}

// create a class to handle the auth logic
class AuthService {
  login = async (username: string, password: string) =>
    axios.post<LoginResponse>('/api/users/login', {
      username,
      password,
    })

  register = async (
    username: string,
    email: string,
    name: string,
    password: string,
    role: string
  ) =>
    axios.post<RegisterResponse>('/api/users/register', {
      username,
      email,
      name,
      password,
      role,
    })
}

// this will export an instance of the class
// so when you import it, it will be ready to use asap
export default new AuthService()
