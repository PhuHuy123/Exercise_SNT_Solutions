import {
  GET_USER_LOGIN,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGIN_FAILURE,
  GET_CHECK_TOKEN,
  GET_CHECK_TOKEN_SUCCESS,
  GET_CHECK_TOKEN_FAILURE,
  USER_LOG_OUT,
} from './constant'

export const getUserLogin = (data) => ({
  type: GET_USER_LOGIN,
  payload: { data },
})

export const getUserLoginSuccess = (profile) => ({
  type: GET_USER_LOGIN_SUCCESS,
  payload: profile,
})

export const getUserLoginFailure = (error) => ({
  type: GET_USER_LOGIN_FAILURE,
  payload: error,
})

export const getCheckToken = () => ({
  type: GET_CHECK_TOKEN,
})

export const getCheckTokenSuccess = (profile) => ({
  type: GET_CHECK_TOKEN_SUCCESS,
  payload: profile,
})

export const getCheckTokenFailure = (error) => ({
  type: GET_CHECK_TOKEN_FAILURE,
  payload: error,
})

export const userLogOut = () => ({
  type: USER_LOG_OUT,
})
