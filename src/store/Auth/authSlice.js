import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const user =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const name =
  localStorage.getItem("name") !== null ? localStorage.getItem("name") : null;

const token =
  localStorage.getItem("token") !== null ? localStorage.getItem("token") : null;

const initialState = {
  token: token ? token : null,
  user: user ? user : null,
  name: name ? name : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://server-camideli.yellowsandstravel.com/api/v1/member/sign-up",
        {
          email: user.email,
          password: user.password,
          fullName: user.fullName,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://server-camideli.yellowsandstravel.com/api/v1/member/sign-in",
        {
          email: user.email,
          password: user.password,
        }
      );
      localStorage.setItem("name", JSON.stringify(response.data.user.fullName));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      // localStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (thunkAPI) => {
  try {
    const response = await axios.get(
      "https://server-camideli.yellowsandstravel.com/api/v1/member/get-me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogOut = createAsyncThunk("user/LogOut", async () => {
  await axios.delete(
    "https://server-camideli.yellowsandstravel.com/api/v1/member/logOut"
  );
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Login Failed";
    });

    // Get User Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;

      // Check if there is a valid session cookie and include it in the API request
      const session = Cookies.get("session");
      if (session) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${session.token}`;
      }
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Logout User
    builder.addCase(LogOut.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LogOut.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("name");
    });
    builder.addCase(LogOut.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
