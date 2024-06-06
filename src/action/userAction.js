import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";

const loginWithToken = () => async (dispatch) => {
  try{
    dispatch({type: types.LOGIN_WITH_TOKEN_REQUEST})
    const response = await api.get("/user/me")
    if(response.status !== 200)
      throw new Error(response.data.message)
    // console.log("rrrrr1", response);
    dispatch({type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data})

  }catch(error){
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL, payload: error })
    dispatch(logout())
  }
};

const loginWithEmail = ({email, password}) => async (dispatch) => {
  try{
    dispatch({type:types.LOGIN_REQUEST});
    const response = await api.post("/auth/login", {email,password});
    if(response.status!==200) throw new Error(response.error);
    sessionStorage.setItem("token", response.data.token);
    dispatch({type: types.LOGIN_SUCCESS, payload: response.data});
    sessionStorage.setItem("token", response.data.token)
  }catch(error){
    dispatch({type:types.LOGIN_FAIL,payload:error.message})
  }
};
const logout = () => async (dispatch) => {
  dispatch({type: types.LOGOUT})
  sessionStorage.removeItem("token");
  
};

const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser =
  ({ email, name, password }, Navigate) =>
  async (dispatch) => {
    try{
      dispatch({type: types.REGISTER_USER_REQUEST})
      const Response = await api.post("/user", {email, name, password});
      if(Response.status !== 200) throw new Error(Response.error);
      dispatch({type:types.REGISTER_USER_SUCCESS, payload: Response.data})
      dispatch(commonUiActions.showToastMessage("Registration completed successfully.", "success"));
      Navigate("/login");
    }catch(error){
      dispatch({type:types.REGISTER_USER_FAIL,payload:error.error});
    }
  };

const deleteError = ()=> async(dispatch)=>{
  dispatch({type: types.DELETE_ERROR})
};


export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
  deleteError,
};
