const intialState = {
  cartItem: [],
};

export const CartReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        cartItem: [...state.cartItem, action.payload],
      };
    }
    default:
      return state;
  }
};
