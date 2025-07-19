import { createSlice } from "@reduxjs/toolkit";

// A helper function to safely get the user from localStorage.
// This prevents errors if the stored item is invalid or doesn't exist.
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
    // Initialize state safely from localStorage
    user: getUserFromLocalStorage(),
    loading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        // This action takes the entire user object as its payload.
        // The standard convention is to use 'action' as the parameter.
        setUser(state, action) {
            // The payload (action.payload) is the user object from your API response.
            // This object should contain all user details, including 'fullName' or 'name'.
            state.user = action.payload; // Update the Redux state with the full user object.

            // We then save the same complete user object to localStorage.
            // This ensures all user data, including the name, is persisted.
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            } else {
                // If the payload is null (e.g., on logout), remove the item from localStorage.
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
