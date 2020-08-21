import axios from 'axios';
import baseUrl from './api';

export default {
    Login(url = baseUrl + 'Login'){
        return{
            Authenticate: model => axios.post(url + '/Authenticate', model)
        }
    }
}