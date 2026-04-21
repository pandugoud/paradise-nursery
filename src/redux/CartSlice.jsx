import { createSlice } from "@reduxjs/toolkit";

// 🧠 Load cart from localStorage
const loadCart = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// 💾 Save cart
const saveCart = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const initialState = {
  items: loadCart()
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      saveCart(state.items);
    },

    increaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;

      saveCart(state.items);
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveCart(state.items);
    },

    deleteItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    }

  }
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  deleteItem,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;