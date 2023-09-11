import { createSlice } from "@reduxjs/toolkit";

const offers = {
  one: {
    id: 1,
    name: "Buy one Get one",
  },
  two: {
    id: 2,
    name: "Buy one product, get another product in half price",
  },
  three: {
    id: 3,
    name: "Third of product price",
  },
  four: {
    id: 4,
    name: "No offer",
  },
};

const product = {
  soup: {
    productId: 4,
    name: "Soup",
    salePrice: 0.6,
    actualPrice: 0.6,
    image: "soup.jpg",
  },
};

const initialState = {
  products: [
    {
      productId: 1,
      name: "Bread",
      salePrice: 1.1,
      actualPrice: 1.1,
      image: "/images/bread.jpg",
      offer: offers.two.id,
      dependentProduct: product.soup,
      isDepend: true,
    },
    {
      productId: 2,
      name: "Milk",
      salePrice: 0.5,
      actualPrice: 0.5,
      image: "/images/milk.jpg",
      offer: offers.four.id,
      isDepend: false,
    },
    {
      productId: 3,
      name: "Cheese",
      salePrice: 0.9,
      actualPrice: 0.9,
      image: "/images/cheese.jpg",
      offer: offers.one.id,
      isDepend: false,
    },
    {
      productId: 4,
      name: "Soup",
      salePrice: 0.6,
      actualPrice: 0.6,
      image: "/images/soup.jpg",
      offer: offers.four.id,
      isDepend: false,
    },
    {
      productId: 5,
      name: "Butter",
      salePrice: 1.2,
      actualPrice: 1.2,
      image: "/images/butter.jpg",
      offer: offers.three.id,
      isDepend: false,
    },
  ],
  currency: "£",
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToItem(state, action) {
      const newItemId = action.payload.productId;
      const existingItem = state.cartItems.find(
        (item) => item.productId === newItemId
      );

      if (existingItem) {
        if (action.payload.offer === 1) {
          existingItem.quantity = existingItem.quantity + 2;
        } else {
          existingItem.quantity++;
        }
      } else {
        if (action.payload.offer === 1) {
          state.cartItems.push({ ...action.payload, quantity: 2 });
        } else {
          state.cartItems.push({ ...action.payload, quantity: 1 });
        }
      }
    },

    incrementItem(state, action) {
      state.cartItems = state.cartItems.map((item) => {
        if (
          item.productId === action.payload.productId &&
          action.payload.offer === 1
        ) {
          item.quantity = item.quantity + 2;
          return item;
        } else if (item.productId === action.payload.productId) {
          item.quantity++;
          return item;
        }
        return item;
      });
    },

    decrementItem(state, action) {
      state.cartItems = state.cartItems
        .map((item) => {
          if (
            item.productId === action.payload.productId &&
            action.payload.offer === 1
          ) {
            item.quantity = item.quantity - 2;
            return item;
          } else if (item.productId === action.payload.productId) {
            item.quantity--;
            return item;
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);
    },

  },
});

export const {
  addItem,
  incrementItem,
  decrementItem,
  addToItem,
  isProductAddedIntoCart,
} = cartSlice.actions;
export default cartSlice.reducer;
