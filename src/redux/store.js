import { configureStore } from "@reduxjs/toolkit";
import theaterReducer from './theaterSlice';


const store = configureStore({
  reducer: {
    theater: theaterReducer
  }
})

export default store;