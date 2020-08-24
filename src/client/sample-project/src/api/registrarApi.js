import api from './api';

export default {
    Registrar(url = 'Registrar'){
        return{
            Create: model => api.post(url + '/Create', model)
        }
    }
}