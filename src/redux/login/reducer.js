import {
  GET_USER_LOGIN,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGIN_FAILURE,
  GET_CHECK_TOKEN,
  GET_CHECK_TOKEN_SUCCESS,
  GET_CHECK_TOKEN_FAILURE,
  USER_LOG_OUT,
} from './constant'

const INITIAL_STATE = {
  data: [],
  role: null,
  loading: true,
  isLoggedIn: false,
  idToken: null,
  error: false,
  errorToken: null,
  response: null,
}

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_LOGIN: {
      return {
        ...state,
        loading: true,
        error: false,
        response: null,
      }
    }

    case GET_USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        response: action.payload,
        idToken: localStorage.getItem('access_token') || '',
      }

    case GET_USER_LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        response: null,
        loading: false,
      }
      case GET_CHECK_TOKEN: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
    case GET_CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        idToken: localStorage.getItem('access_token') || '',
      }

    case GET_CHECK_TOKEN_FAILURE:
      return {
        ...state,
        errorToken: action.payload,
        loading: false,
        isLoggedIn: false,
      }

    case USER_LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
      }
    }
    default:
      return state
  }
}

export default loginReducer
