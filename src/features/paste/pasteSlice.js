import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import toast from "react-hot-toast";

const initialState = {
    pastes: localStorage.getItem('pastes')
    ? JSON.parse(localStorage.getItem('pastes'))
    : [],
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers:{
        addPaste: (state,action) => {
            const check = state.pastes.filter((paste) => paste.title === action.payload.title)
            if(check.length !== 0){
                return toast("Title Already Exists")
            }
            state.pastes.push(action.payload);
            localStorage.setItem('pastes',JSON.stringify(state.pastes));
            toast("Paste Created Sussessfully")
        },

        updatePaste: (state,action) => {
            state.pastes.map((paste) => paste._id == action.payload._id ? action.payload : paste)
            localStorage.setItem('pastes',JSON.stringify(state.pastes));
            toast("Paste Updated Sussessfully")
        },

        removePaste: (state,action) => {
            state.pastes = state.pastes.filter((paste) => paste._id !== action.payload)
            localStorage.setItem('pastes',JSON.stringify(state.pastes));
            toast("Paste Remove Sussessfully")
        },

        resetAllPaste: (state,action) => {
            state.pastes = [];
            localStorage.removeItem('pastes');
        }
    }
})


export const {addPaste,updatePaste,removePaste,resetAllPaste} = pasteSlice.actions;

export default pasteSlice.reducer;