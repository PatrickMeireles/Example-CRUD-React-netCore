import registrarApi from '../api/registrarApi';

export const ACTION_TYPES = {
    CREATE: 'CREATE'
}

export const Create = (data, onSuccess, onError) => dispatch => {
    registrarApi.Registrar()
                .Create(data)
                .then(response => {
                    dispatch({
                        type: ACTION_TYPES.CREATE,
                        payload: response.data
                    })
                    onSuccess();
                })
                .catch(error => onError(error.response.data));
}