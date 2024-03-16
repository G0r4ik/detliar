import { configureStore } from '@reduxjs/toolkit'
import threadStore from '../features/Thread/threadStore'

export const store = configureStore({
  reducer: { threads: threadStore },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
