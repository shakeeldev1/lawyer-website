import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        clearProfile: (state) => {
            state.profile = null
        }
    }
})

export const selectUserProfile = (state) => state.user.profile;
export const { setProfile, clearProfile } = userSlice.action;
export default userSlice.reducer; 