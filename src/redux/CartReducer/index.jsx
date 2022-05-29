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
    case "DELETE_FROM_CART": {
      return {
        ...state,
        cartItem: state.cartItem.filter((obj) => obj.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};
