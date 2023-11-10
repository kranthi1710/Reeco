import { createSlice } from "@reduxjs/toolkit";
import StoreDetails from "./initialState";

const ReecoSlice = createSlice({
  name: "ReecoSlice",
  initialState: StoreDetails,
  reducers: {
    updateStatus: (state, action) => {
      const { selectedItem, status } = action.payload;
      const productToUpdate = state.cartList.find(
        (item) => item.productName === selectedItem.productName
      );

      if (productToUpdate) {
        productToUpdate.status = status;
      }
    },
    editCart: (state, action) => {
      const { productName, price, quantity, reason } = action.payload;
      const productToUpdate = state.cartList.find(
        (item) => item.productName === productName
      );

      if (productToUpdate) {
        productToUpdate.quantity = parseInt(quantity);
        productToUpdate.price = price;
        productToUpdate.reason = reason;
      }
    },
    orderStatus: (state) => {
      state.OrderApproval_status = true;
    },
    addtoCart: (state, action) => {
      const { brand, image, price, productName, quantity, status } =
        action.payload;
      const newItem = {
        id: state.cartList.length + 1,
        productName,
        brand,
        price,
        quantity: parseInt(quantity),
        status,
        image,
        reason: "",
      };
      state.cartList.push(newItem);
    },
  },
});

export const { updateStatus, editCart, orderStatus, addtoCart } =
  ReecoSlice.actions;
export default ReecoSlice.reducer;
