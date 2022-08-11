import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions"

export const login = async (user, dispatch) => { dispatch(loginStart())

  const instance = axios.create({ baseURL: process.env.REACT_APP_JAVA_API_BASE_URL })

  try {
    const res = await instance.post("/login", user);

    dispatch(loginSuccess(res.data));
    
  } catch (err) {
    dispatch(loginFailure());
  }
}