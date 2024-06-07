import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_GET_REQUEST });
    const response = await api.get("/product",
            { params: { ...query } }
        );
    console.log("productAction에서 리스폰스: ", response);
    dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: response.data});
  } catch (error) {
    dispatch({ type: types.PRODUCT_GET_FAIL, payload: error.message });
  }
};

const getProductDetail = (id) => async (dispatch) => {};

const createProduct = (formData) => async (dispatch) => {
  try{
    dispatch({type:types.PRODUCT_CREATE_REQUEST})
    const response = await api.post("/product", formData)
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.PRODUCT_CREATE_SUCCESS})
    dispatch(getProductList({ page: 1, name: "" }));
    dispatch(commonUiActions.showToastMessage("completed product creation", "success"));

  }catch(error){
    dispatch({type:types.PRODUCT_CREATE_FAIL, payload:error.error})
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};
const deleteProduct = (id) => async (dispatch) => {
  try{
    dispatch({type:types.PRODUCT_DELETE_REQUEST});
    const response = await api.delete(`/product/${id}`)
    console.log("삭제기능")
    dispatch({type:types.PRODUCT_DELETE_SUCCESS});
    dispatch(getProductList({page:1}));
    dispatch(commonUiActions.showToastMessage("The product has been deleted.", "success"));
  }catch(error){
    dispatch({type:types.PRODUCT_DELETE_FAIL, payload:error.message})
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try{
    dispatch({type: types.PRODUCT_EDIT_REQUEST});
    const response = await api.put(`/product/${id}`, formData);
    if(response.status === 200){
      dispatch({type: types.PRODUCT_EDIT_SUCCESS, payload: response.data.data});
      dispatch(getProductList({ page: 1, name: "" }));
      dispatch(commonUiActions.showToastMessage("The product has been updated", "success"));
    }
  }catch(error){
    dispatch({type:types.PRODUCT_EDIT_FAIL, payload:error.message})
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};