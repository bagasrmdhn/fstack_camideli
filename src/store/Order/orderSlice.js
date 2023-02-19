import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ordering: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const orderingSubmit = createAsyncThunk(
  "order/OrderSubmit",
  async (order, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://server-camideli.yellowsandstravel.com/api/v1/member/order-page",
        {
          email: order.email,
          firstName: order.firstName,
          lastName: order.lastName,
          phoneNumber: order.phoneNumber,
          address: order.address,
          image: order.image,
          bankTo: order.bankTo,
          bankFrom: order.bankFrom,
          accountHolder: order.accountHolder,
          orderDate: order.orderDate,
          qty: order.qty,
          items: order.items.map((id) => ({
            id: id,
            quantity: id.quantity,
            name: id.name,
            price: id.price,
            totalPrice: id.totalPrice,
          })),
          city: order.city,
          total: order.total,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("order", order);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(orderingSubmit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(orderingSubmit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.ordering = action.payload;
    });
    builder.addCase(orderingSubmit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
