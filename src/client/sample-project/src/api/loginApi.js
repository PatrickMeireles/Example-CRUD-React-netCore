import axios from 'axios';
import api from './api';

export default {
    Login(url = 'Login'){
        return{
            Authenticate: model => api.post(url + '/Authenticate', model)
        }
    }
}