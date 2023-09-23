import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    quantity: 0,
    total: 0,
    userID: null,
  },
  reducers: {
    cartSet: (state, action) => {
      console.log("action.payload", action.payload);
      const { userId, items } = action.payload;

      const newState = {
        ...state,
        userID: userId,
        items: items,
        quantity: items.reduce(
          (sum, item) => sum + parseInt(item.quantity, 10),
          0
        ),
      };

      console.log("New state:", newState);
      return newState;
    },
    cartReset: state => {
      state.userID = null;
      state.items = [];
      state.quantity = 0;
    },
    addProduct: (state, action) => {
      const { product, selectedSize, selectedColor } = action.payload;
      const newItem = { product, selectedSize, selectedColor, quantity: 1 };
      const existingItemIndex = state.items.findIndex(
        item =>
          item.product._id === newItem.product._id &&
          item.selectedSize === newItem.selectedSize &&
          item.selectedColor === newItem.selectedColor
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push(newItem);
      }

      state.quantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    removeProduct: (state, action) => {
      const { product, userID } = action.payload;
      state.quantity -= 1;
      const updatedItems = state.items.filter(
        item => item.product._id !== product._id
      );
      state.items = updatedItems;
    },
  },
});

export const { cartSet, cartReset, addProduct, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
