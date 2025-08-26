import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
    const userJson = localStorage.getItem("user");
    // Check if the item exists and is not the string "undefined"
    if (userJson && userJson !== "undefined") {
        try {
            // Attempt to parse the JSON string
            return JSON.parse(userJson);
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            // If parsing fails, return null
            return null;
        }
    }
    // If no user is found, return null
    return null;
};


const initialState = {
    user: getUserFromLocalStorage(),
    loading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;

            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("user");
            }
        },

        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
