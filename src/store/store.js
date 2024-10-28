import {configureStore} from '@reduxjs/toolkit'
import pasteReducer from '../features/paste/pasteSlice';

const store = configureStore({
    reducer: {
        paste: pasteReducer,
    }
})

export default store;