import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './slices/BoardSlice'

const store = configureStore({
  reducer: {
    board: boardReducer
  }
  // devTools: !isProduction()
})

export default store
