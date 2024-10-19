import { createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchUser } from "./checkoutAPI";
const initialState = {
  fetchUserData: {
    loading: false,
    userData: [],
    error: "",
  },
  addOrderData: {
    loading: false,
    userData: [],
    error: "",
  },
  contactDetails: {
    userId: "",
    orderId: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    paymentMethod: "",
    status: true,
    date: "",
    amount: 0,
    product: [],
  },
};
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setTotalPrice: (state, action) => {
      const total = action.payload.reduce((acc, val) => {
        return acc + val.price * val.quantity;
      }, 0);
      state.contactDetails.amount = total;
    },
    setUser: (state, action) => {
      state.contactDetails.userId = action.payload;
    },
    setProducts: (state, action) => {
      state.contactDetails.product = action.payload;
    },
    setDate: (state, action) => {
      state.contactDetails.date = action.payload;
    },
    setOrderId: (state, action) => {
      state.contactDetails.orderId = action.payload;
    },
    // setContactDetails: (state, action) => {
    //   switch (action.payload.name) {
    //     case "userId":
    //       state.contactDetails.userId = action.payload.value;
    //     case "orderId":
    //       state.contactDetails.orderId = action.payload.value;
    //     case "email":
    //       state.contactDetails.email = action.payload.value;
    //     case "firstName":
    //       state.contactDetails.firstName = action.payload.value;
    //     case "lastName":
    //       state.contactDetails.lastName = action.payload.value;
    //     case "address":
    //       state.contactDetails.address = action.payload.value;
    //     case "phone":
    //       state.contactDetails.phone = action.payload.value;
    //     case "paymentMethod":
    //       state.contactDetails.paymentMethod = action.payload.value;
    //     case "status":
    //       state.contactDetails.status = action.payload.value;
    //     case "date":
    //       state.contactDetails.date = action.payload.value;
    //     case "amount":
    //       state.contactDetails.amount = action.payload.value;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.fetchUserData.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchUserData.loading = false;
        state.fetchUserData.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchUserData.loading = false;
        state.fetchUserData.error = action.error.message;
      })
      .addCase(addOrder.pending, (state) => {
        state.addOrderData.loading = true;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.addOrderData.loading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.addOrderData.loading = false;
        state.addOrderData.error = action.error.message;
      });
  },
});
export const {
  setTotalPrice,
  setContactDetails,
  setUser,
  setProducts,
  setDate,
  setOrderId,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
