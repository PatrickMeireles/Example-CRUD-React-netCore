import axios from 'axios';
import baseUrl from './api';

export default {
    Registrar(url = baseUrl + 'Registrar'){
        return{
            Create: model => axios.post(url + '/Create', model)
        }
    }
}