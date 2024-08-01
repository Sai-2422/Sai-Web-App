import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/internship`;

const initialState = {
  loading: false,
  error: false,
  message: "",
  internships: [],
};

export const fetchAllInternships = createAsyncThunk(
  "internships/fetchAllInternships",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fetchAll`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postNewInternship = createAsyncThunk(
  "internships/postNewInternship",
  async (internshipData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(internshipData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateInternship = createAsyncThunk(
  "internships/updateInternship",
  async ({ internshipId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${internshipId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteInternship = createAsyncThunk(
  "internships/deleteInternship",
  async (internshipId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${internshipId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return internshipId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const internshipsSlice = createSlice({
  name: "internships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllInternships.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchAllInternships.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.internships = action.payload.allInternships;
      })
      .addCase(fetchAllInternships.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch internships.";
      })
      .addCase(postNewInternship.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(postNewInternship.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.message = "New internship posted successfully.";
      })
      .addCase(postNewInternship.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to post new internship.";
      })
      .addCase(updateInternship.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(updateInternship.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "Internship updated successfully.";
        // Update the internships list with the updated internship
        const updatedInternship = action.payload;
        state.internships = state.internships.map((internship) =>
          internship.id === updatedInternship.id
            ? updatedInternship
            : internship
        );
      })
      .addCase(updateInternship.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to update internship.";
      })
      .addCase(deleteInternship.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteInternship.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "Internship deleted successfully.";
        // Remove the deleted internship from the list
        const deletedId = action.payload;
        state.internships = state.internships.filter(
          (internship) => internship.id !== deletedId
        );
      })
      .addCase(deleteInternship.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to delete internship.";
      });
  },
});

export default internshipsSlice.reducer;

export const getLoadingState = (state) => state.internship.loading;
export const getError = (state) => state.internship.error;
export const getErrorMessage = (state) => state.internship.message;
export const getAllInternships = (state) => state.internship.internships;
