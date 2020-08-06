import axios from 'axios';
import baseUrl from './api';


export default {
    Cidade(url = baseUrl + 'Cidade/') {
        return {
            getAll: descricao => axios.get(url + 'GetAll?q=' + descricao)
        }
    }
}