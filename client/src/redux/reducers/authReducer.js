import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/user`;

// Initial state
const initialState = {
  user: null,
  allUsers: [],
  userDetails: null,
  error: false,
  message: "",
  loading: false,
};

// Async thunk for user sign-up
export const signUp = createAsyncThunk("user/addUser", async (formData) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
});

// Async thunk for user sign-in
export const signIn = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }
);

// Async thunk for user logout
export const logOut = createAsyncThunk("user/logoutUser", async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
});

// Async thunk for forget password
export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (email) => {
    const response = await fetch(`${API_BASE_URL}/password/forget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }
);

// Async thunk for reset password using token
export const resetPasswordUsingToken = createAsyncThunk(
  "user/resetPasswordUsingToken",
  async ({ token, password, confirmPassword }) => {
    const response = await fetch(`${API_BASE_URL}/password/reset/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, confirmPassword }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }
);

// Async thunk for reset password using OTP
export const resetPasswordUsingOtp = createAsyncThunk(
  "user/resetPasswordUsingOtp",
  async ({ Otp, password, confirmPassword }) => {
    const response = await fetch(`${API_BASE_URL}/password/reset`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Otp, password, confirmPassword }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }
);

// Async thunk for update user profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData) => {
    const response = await fetch(`${API_BASE_URL}/profile/update`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }
);

// Async thunk for update user password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (formData) => {
    const response = await fetch(`${API_BASE_URL}/password/update`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }
);

// Async thunk for user details
export const fetchUserData = createAsyncThunk("user/userDetails", async () => {
  const response = await fetch(`${API_BASE_URL}/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
});

// ADMIN ROUTES

// Async thunk for fetching all users for admin
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    const response = await fetch(`${API_BASE_URL}/admin/allusers`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    return data.allUsers;
  }
);

// Async thunk for fetching user details for admin
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/details/${userId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      return data.userDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for update user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/update/${userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/delete/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.user = null;
        state.error = true;
        state.message = action.error.message || "Failed to sign up.";
        state.loading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.user = null;
        state.error = true;
        state.message = action.error.message || "Failed to log in.";
        state.loading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = false;
        state.message = "Logged out successfully.";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to log out.";
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.message = "Password reset email sent successfully.";
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.error.message || "Failed to send password reset email.";
      })
      .addCase(resetPasswordUsingToken.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(resetPasswordUsingToken.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.message = "Password reset successfully.";
      })
      .addCase(resetPasswordUsingToken.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to reset password.";
      })
      .addCase(resetPasswordUsingOtp.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(resetPasswordUsingOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.message = "Password reset successfully.";
      })
      .addCase(resetPasswordUsingOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to reset password.";
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.updatedUserDetails;
        state.loading = false;
        state.error = false;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to update profile.";
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to update password.";
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload.userDetails;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to fetch user data.";
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.loading = false;
        state.error = false;
        state.message = "All users fetched successfully.";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to fetch all users.";
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.loading = false;
        state.error = false;
        state.message = "User details fetched successfully.";
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to fetch user details.";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.message = "User profile updated successfully.";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.error.message || "Failed to update user profile.";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.message = "User deleted successfully.";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to delete user.";
      });
  },
});

export default authSlice.reducer;

export const getUser = (state) => state.auth.user;
export const getLoadingState = (state) => state.auth.loading;
export const getError = (state) => state.auth.error;
export const getErrorMessage = (state) => state.auth.message;
