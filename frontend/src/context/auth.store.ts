import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import authServices from '../services/auth.services'

type Error = {
  message: string
  status: number
}

// the state is the data that is stored for global access
type State = {
  isAuthenticated: boolean
  isLoading: boolean
  token: string
  error: Error | null
}

// actions are functions that can be called to update the state
type Actions = {
  // login
  login: (email: string, password: string) => Promise<void>
  // register
  register: (
    username: string,
    email: string,
    name: string,
    password: string,
    role: string
  ) => Promise<void>

  // verify token
  verifyToken: () => Promise<void>
}

// this is where the store is created
export const AuthStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      // state
      isAuthenticated: false,
      isLoading: false,
      token: '',
      error: null,

      // login action
      login: async (username: string, password: string) => {
        try {
          const response = await authServices.login(username, password)
          set({ token: response.data.token, isAuthenticated: true })

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
      // register action
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
      // verify token action
      verifyToken: async () => {
        try {
          const token = get().token
          if (token && token != '') {
            console.log(token)
            set({ isAuthenticated: true })
            return
          }
          throw new Error('There is no valid token')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          set({ isAuthenticated: false })
        }
      },
    }),
    {
      name: 'token', // unique name
      // ignore the storage to avoid conflicts with other stores
      partialize: (state) => ({ token: state.token }),
    }
  )
)
