import axios from "../axios";

const getHeaders = () => {
  const idToken = localStorage.getItem('access_token') || ''
  return {
    Accept: '*/*',
    'content-type': 'application/json',
    Authorization: `Bearer ${idToken}`,
  }
}

const loginUser = (data) => {
  return axios.post(`/oauth2/token`, data);
};

const getListType = () => {
  return axios.get(`/types`, {
    headers: getHeaders()
  });
};

const getAllType = (page, type) => {
  return axios.get(`/animals?type=${type}&page=${page}`, {
    headers: getHeaders()
  });
};

const getAllAnimal = () => {
  return axios.get(`/animals`, {
    headers: getHeaders()
  });
};
const getAnimal = (id) => {
  return axios.get(`/animals/${id}`, {
    headers: getHeaders()
  });
};


export {
  loginUser,
  getAllType,
  getAllAnimal,
  getAnimal,
  getListType,
};
