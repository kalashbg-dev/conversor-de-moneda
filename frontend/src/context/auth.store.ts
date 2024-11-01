import { create } from 'zustand'
import authServices from '../services/auth.services'

type Error = {
  message: string
  status: number
}

// the state is the data that is stored for global access
type State = {
  isAuthenticated: boolean
  isLoading: boolean
  user: string | null
  token: string | null
  error: Error | null
}

// actions are functions that can be called to update the state
type Actions = {
  login: (email: string, password: string) => Promise<void>
  register: (
    username: string,
    email: string,
    name: string,
    password: string,
    role: string
  ) => Promise<void>
}

// this is where the store is created
export const AuthStore = create<State & Actions>()((set) => ({
  // state
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
  error: null,

  // actions
  login: async (username: string, password: string) => {
    try {
      const response = await authServices.login(username, password)
      console.log(response.data.token)
      set({ token: response.data.token, isAuthenticated: true })
      console.log('authenticated')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data?.message || error.response.data?.error)
      set({
        error: {
          message: error.response.data?.message || error.response.data?.error,
          status: error.response.status,
        },
      })
    }
  },
  register: async (
    username: string,
    email: string,
    name: string,
    password: string,
    role: string
  ) => {
    try {
      const response = await authServices.register(username, email, name, password, role)
      console.log(response)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data?.message || error.response.data?.error)
      set({
        error: {
          message: error.response.data?.message || error.response.data?.error,
          status: error.response.status,
        },
      })
    }
  },
}))
