import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
    baseURL: 'https://api.petfinder.com/v2',
});

instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return response.data;
});

export default instance;