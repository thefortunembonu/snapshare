'use client';

import { createSlice } from '@reduxjs/toolkit';
import {handleRegister, handleLogin, handleUserData, handleverify} from './authActions'

interface StateProps {
    user: any,
    registered: boolean,
    isAuthenticated: boolean
    loading: boolean,

}

const initialState: StateProps = {
    user: null,
    registered: false,
    isAuthenticated: false,
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleLoading: state => { state.loading = !state.loading},
        toggleAuthenticatedFalse: state => {
            state.isAuthenticated = false,
                state.user = null
        },
        toggleAuthenticatedTrue: state => { state.isAuthenticated = true}
    }
    ,
    extraReducers: builder => {
        builder.addCase(handleRegister.pending, (state)=>{
                state.loading = true}
        )
        .addCase(handleRegister.fulfilled, state => {
            state.registered = true;
            state.loading = false;
        })
            .addCase(handleRegister.rejected, (state) => {
                state.registered = false;
                state.loading = false;
            })
        .addCase(handleLogin.pending, (state)=>{
            state.loading = true
        }).addCase(handleLogin.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
        }).addCase(handleLogin.rejected, (state) => {
                state.loading = false;
        })
               .addCase(handleUserData.pending, (state)=>{
            state.loading = true
        }).addCase(handleUserData.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        }).addCase(handleUserData.rejected, (state, action) => {
            state.loading = false;
           
        })
                  .addCase(handleverify.pending, (state)=>{
            state.loading = true
                  }).addCase(handleverify.fulfilled, (state) => {
            state.loading = false;
        }).addCase(handleverify.rejected, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
        })
    
    }
})

export const { toggleLoading, toggleAuthenticatedFalse,toggleAuthenticatedTrue} = authSlice.actions
export default authSlice.reducer
