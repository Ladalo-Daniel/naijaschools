import { create } from 'zustand'

const user = {}

export const useUser = create<typeof user>((set) => ({
  user: {},
  setUser: () => set((state) => (state)),
}))
