import api from './api';

export default {
    Cidade(url = 'Cidade') {
        return {
            getAll: descricao => api.get(url + '/GetAll?q=' + descricao)
        }
    }
}