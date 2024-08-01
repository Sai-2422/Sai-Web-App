import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/interns`;

const initialState = {
  loading: false,
  error: false,
  message: "",
  interns: [],
  internDetails: {},
};

export const applyInternship = createAsyncThunk(
  "interns/apply",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/apply`, {
        method: "POST",
        credentials: "include",
        body: formData,
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
  "interns/delete",
  async (internshipId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ internshipId }),
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

export const getAllInterns = createAsyncThunk(
  "interns/getAllInterns",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/allInterns`, {
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

export const sendOfferLetter = createAsyncThunk(
  "interns/sendOfferLetter",
  async (internId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sendOfferLetter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ internId }),
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

export const sendCertificate = createAsyncThunk(
  "interns/sendCerificate",
  async (internId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sendCertificate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ internId }),
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

export const fetchInternDetails = createAsyncThunk(
  "interns/fetchInternDetails",
  async (internId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/internDetails/${internId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const internsSlice = createSlice({
  name: "interns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyInternship.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(applyInternship.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.message = "Applied to internship successfully.";
      })
      .addCase(applyInternship.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to apply to internship.";
      })
      .addCase(deleteInternship.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteInternship.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.message = "Deleted internship successfully.";
      })
      .addCase(deleteInternship.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to delete internship.";
      })
      .addCase(getAllInterns.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(getAllInterns.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.interns = action.payload.allInterns;
      })
      .addCase(getAllInterns.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch interns.";
      })
      .addCase(sendOfferLetter.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(sendOfferLetter.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.message = "Offer letter sent successfully.";
      })
      .addCase(sendOfferLetter.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to send offer letter.";
      })
      .addCase(sendCertificate.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(sendCertificate.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.message = "Certificate sent successfully.";
      })
      .addCase(sendCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to send certificate.";
      })
      .addCase(fetchInternDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchInternDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.internDetails = action.payload.internDetails;
      })
      .addCase(fetchInternDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch intern details.";
      });
  },
});

export default internsSlice.reducer;

export const getLoadingState = (state) => state.interns.loading;
export const getError = (state) => state.interns.error;
export const getErrorMessage = (state) => state.interns.message;
export const getAllInternsData = (state) => state.interns.interns;
export const getInternDetails = (state) => state.interns.internDetails;
