import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import authReducer from "./Auth/authSlice";
import orderReducer from "./Order/orderSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    auth: authReducer,
    order: orderReducer,
  },
});

export default store;
