import { create } from 'zustand'
import api from '../config/API'

type State = {
  threads: Threads[]
}

interface Threads {
  _id: string
  shortName: string
  fullName: string
  authorId: string
  description: string
  numberOfPosts: number
  numberOfLikes: number
  numberOfDislikes: number
  isAvailable: string
  hasAccess: []
  lastUpdateDate: '2024-03-11T20:23:54.595Z'
  creationDate: '2024-03-11T20:23:54.595Z'
}

type Actions = {
  setThreads: (data: Threads) => void // Замените any на тип вашего параметра data
  getThreads: () => Promise<void>
}

const useStore = create<State & Actions>(set => ({
  threads: [],

  setThreads: (data: Threads) => {
    set(state => ({
      threads: [...state.threads, data],
    }))
  },

  getThreads: async () => {
    const response = await api.get('/getThreads')
    set({ threads: response.data })
  },
}))

export default useStore
