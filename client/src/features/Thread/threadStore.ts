import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

import api from '../../config/API'

export interface CounterState {
  threads: []
}

const initialState: CounterState = {
  threads: [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getThread: state => {
      // Dispatch a pending action if desired
      api
        .get('/getThreads')
        .then(resThreads => {
          console.log('get')

          state.threads = resThreads.data
          // Dispatch a success action if desired
        })
        .catch(error => {
          console.log(error)

          // Handle errors appropriately
        })
    },
  },
  // incrementByAmount: (state, action: PayloadAction<number>) => {
  //   // state.value += action.payload
  // },
})

export default counterSlice.reducer
