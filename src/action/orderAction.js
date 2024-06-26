import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload, navigate) => async (dispatch) => {
  try{
    dispatch({type: types.CREATE_ORDER_REQUEST})
    const response = await api.post("/order",payload)
    if(response.status !== 200) throw new Error(response.error)
      dispatch({type: types.CREATE_ORDER_SUCCESS, payload:response.data.orderNum})
    dispatch(cartActions.getCartQty());
    navigate("/payment/success")
  }catch(error){
    dispatch({type: types.CREATE_ORDER_FAIL, payload:error.error})
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST });
    const response = await api.get("/order/me");
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_FAIL, error: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};
const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST });
    const response = await api.get("/order", {
      params: { ...query },
    });

    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.GET_ORDER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, error: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });
    const response = await api.put(`/order/${id}`, { status });

    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.UPDATE_ORDER_SUCCESS,
      payload: response.data,
    });

    dispatch(
      commonUiActions.showToastMessage("Order Update Completed!", "success")
    );

    dispatch(getOrderList());
  } catch (error) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, error: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

const deletOrder = (id) => async(dispatch) => {
  try{
    dispatch({type: types.DELETE_ORDER_REQUEST});
    const response = await api.delete(`/order/${id}`)
    dispatch({type: types.DELETE_ORDER_SUCCESS, payload:id});
    dispatch(commonUiActions.showToastMessage("Order Delete Completed!", "success"));
  }catch(error){
    dispatch({ type: types.DELETE_ORDER_FAIL, error: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};
export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
  deletOrder
};
