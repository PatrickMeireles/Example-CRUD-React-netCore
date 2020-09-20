import registrarApi from '../api/registrarApi';
import { Success, Error } from './swalActions';

export const ACTION_TYPES = {
    CREATE: 'CREATE'
}

export const Create = (data, onSuccess) => dispatch => {
    registrarApi.Registrar()
                .Create(data)
                .then(response => {
                    dispatch({
                        type: ACTION_TYPES.CREATE,
                        payload: response.data
                    });
                    dispatch(Success('Boas Notícias!', 'Cadastro realizado com sucesso.'));
                    onSuccess();
                })
                .catch(error => dispatch(Error('Ocorreu um erro!', '',error.response.data)));
}