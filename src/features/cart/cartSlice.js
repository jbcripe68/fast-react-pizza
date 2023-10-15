import { createSlice } from '@reduxjs/toolkit';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

const initialState = {
  cart: [],
};
// {
//   pizzaId: 12,
//   name: 'Mediterranean',
//   quantity: 2,
//   unitPrice: 16,
//   totalPrice: 32,
// },

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const pizza = action.payload;
      const cartItem = state.cart.find((item) => item.pizzaId === pizza.id);
      if (cartItem) {
        cartItem.quantity += 1;
        cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
      } else {
        state.cart.push({
          pizzaId: pizza.id,
          name: pizza.name,
          quantity: 1,
          unitPrice: pizza.unitPrice,
          totalPrice: pizza.unitPrice,
        });
      }
    },
    removePizza(state, action) {
      const pizzaId = action.payload;
      state.cart = state.cart.filter((item) => item.pizzaId !== pizzaId);
    },
    increasePizzaQuantity(state, action) {
      const pizzaId = action.payload;
      const cartItem = state.cart.find((item) => item.pizzaId === pizzaId);
      if (cartItem) {
        cartItem.quantity += 1;
        cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
      }
    },
    decreasePizzaQuantity(state, action) {
      const pizzaId = action.payload;
      const cartItem = state.cart.find((item) => item.pizzaId === pizzaId);
      if (cartItem) {
        cartItem.quantity -= 1;
        cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addPizza,
  removePizza,
  increasePizzaQuantity,
  decreasePizzaQuantity,
  clearCart,
} = cartSlice.actions;

export function getCart(state) {
  return state.cart.cart;
}

export function getTotalCartPrice(state) {
  return state.cart.cart.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
}

export function getTotalCartQuantity(state) {
  return state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getQuantityById(id) {
  return function (state) {
    return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
  };
}

export default cartSlice.reducer;
