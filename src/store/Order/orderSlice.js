import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const name =
  localStorage.getItem("name") !== null ? localStorage.getItem("name") : null;

export const orderingProcess = createAsyncThunk(
  "order/orderingProcess",
  async (order, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://server-camideli.yellowsandstravel.com/api/v1/member/order-page",
        {
          image: order.enterImageUpload,
          firstName: order.enterFirstName,
          lastName: order.enterLastName,
          email: order.enterEmail,
          phoneNumber: order.enterNumber,
          address: order.enter,
          city: order.city,
          bankFrom: order.bankFrom,
          postalCode: order.postalCode,
          accountHolder: order.bankAccountName,
          orderDate: order.orderDate,
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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(orderingProcess.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(orderingProcess.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.order = action.payload;
    });
    builder.addCase(orderingProcess.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
