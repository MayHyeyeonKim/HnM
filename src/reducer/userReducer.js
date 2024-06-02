import * as types from "../constants/user.constants";
const initialState = {
  loading: false,
  user: null,
  error:""
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
      return {...state, loading: true};
    case types.REGISTER_USER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {...state, loading: false, user: payload.user, error: ""};
    case types.LOGIN_FAIL:    
    case types.REGISTER_USER_FAIL:
      return {...state, loading: false, error: payload};
    case types.LOGOUT:
      return {...state, user:null}
    case types.DELETE_ERROR:
      return {...state, error:""};
    default:
    return state;
}
}

export default userReducer;

// {
//   "status": "success",
//   "user": {
//       "_id": "665c2445863a4c6e82cf8136",
//       "email": "test555@gmail.com",
//       "name": "qwer1234",
//       "level": "customer",
//       "createdAt": "2024-06-02T07:50:29.228Z",
//       "updatedAt": "2024-06-02T07:50:29.228Z"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjMjQ0NTg2M2E0YzZlODJjZjgxMzYiLCJpYXQiOjE3MTczMTYxOTYsImV4cCI6MTcxNzQwMjU5Nn0.ec5c-XYYo-9_Q7IgBQhPFeCJi5zum9kv9Y1L5cW6o0U"
// }