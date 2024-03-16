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
  getThreads: () => void
}

const useStore = create<State & Actions>(set => ({
  threads: [],

  getThreads: async () => {
    console.log(1)
    const response = await api.get('/getThreads')
    set({ threads: response.data })
  },
}))

export default useStore
