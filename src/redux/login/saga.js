import { getUserLoginSuccess, getUserLoginFailure, getCheckTokenSuccess, getCheckTokenFailure } from './actions'
import { GET_USER_LOGIN, GET_CHECK_TOKEN } from './constant'
import { postLogin, checkToken } from './services'
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'

function* getUserLoginSaga(action) {
  try {
    const res = yield call(postLogin, action.payload.data)
    if (res && 3600 === res.expires_in) {
      localStorage.setItem('access_token', res.access_token)
    }
    yield put(getUserLoginSuccess(res))
  } catch (error) {
    yield put(getUserLoginFailure(error))
  }
}

function* getCheckTokenSaga() {
  try {
    if (localStorage.getItem('access_token')) {
      const res = yield call(checkToken)
      if (res && res.animals) {
        yield put(getCheckTokenSuccess(res))
      } else {
        yield put(getCheckTokenFailure(res))
      }
    } else {
      yield put(getCheckTokenFailure(''))
    }
  } catch (error) {
    localStorage.removeItem("access_token");
    yield put(getCheckTokenFailure(error))
  }
}

function* loginSaga() {
  yield takeEvery(GET_USER_LOGIN, getUserLoginSaga)
  yield takeLatest(GET_CHECK_TOKEN, getCheckTokenSaga)
}

export default loginSaga
