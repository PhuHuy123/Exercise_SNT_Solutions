import {getAllAnimal, loginUser} from '../../config/apiService'

export const postLogin = (data) => loginUser(data)

export const checkToken = () => getAllAnimal()
