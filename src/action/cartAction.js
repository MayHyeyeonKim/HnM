import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
const addToCart =
  ({ id, size }) =>
  async (dispatch) => {
    try{
      console.log("11")
      dispatch({type: types.ADD_TO_CART_REQUEST})
      console.log("22")
      const response = await api.post("/cart", {productId:id, size:size, qty:1})
      console.log("r",response)
      if(response.status !==200)throw new Error(response.error);
      // dispatch({type:types.ADD_TO_CART_SUCCESS, payload: response.data});
      dispatch({type:types.ADD_TO_CART_SUCCESS, payload: response.data.cartItemQty,});
      dispatch(commonUiActions.showToastMessage("Item has been added to the cart.","success"))
    }catch(error){
      dispatch({type: types.ADD_TO_CART_FAIL, payload:error.error})
      dispatch(commonUiActions.showToastMessage(error.error, "error"))
    }
  };

const getCartList = () => async (dispatch) => {
  try{
    dispatch({type:types.GET_CART_LIST_REQUEST})
    const response = await api.get("/cart")
    console.log("cartList의 response얌!", response)
    if(response.status !==200) throw new Error(response.error)
      dispatch({type: types.GET_CART_LIST_SUCCESS, payload: response.data.data})
  }catch(error){
    dispatch({type:types.GET_CART_LIST_FAIL, payload:error.error})
  }
};
const deleteCartItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
    const response = await api.delete(`/cart/${id}`);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.DELETE_CART_ITEM_SUCCESS,
      payload: response.data.cartItemQty,
    });
    dispatch(getCartList());
  } catch (error) {
    dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

const updateQty = (id, value) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
    const response = await api.put(`/cart/${id}`, { qty: value });
    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.UPDATE_CART_ITEM_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

const getCartQty = () => async (dispatch) => {
  try {
    console.log("getCartQty보여줘")
    dispatch({ type: types.GET_CART_QTY_REQUEST });
    const response = await api.get("/cart/qty");
    console.log("퀀티티~", response)
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: response.data.qty });
  } catch (error) {
    dispatch({ type: types.GET_CART_QTY_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
