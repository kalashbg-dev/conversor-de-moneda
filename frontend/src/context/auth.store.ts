import { create } from 'zustand'

interface State {
  isAuthenticated: boolean
}

export const useBearStore = create<State>()(() => ({
  isAuthenticated: false,
}))
