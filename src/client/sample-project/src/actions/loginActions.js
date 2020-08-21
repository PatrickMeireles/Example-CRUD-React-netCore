import loginApi from '../api/loginApi';

export const ACTION_TYPES = {
    AUTHENTICATE: 'AUTHENTICATE'
}

export const Authenticate = (data, onSuccess, onError) => dispatch => {
    loginApi.Login()
            .Authenticate(data)
            .then(response => {
                dispatch({
                    type: ACTION_TYPES.AUTHENTICATE,
                    payload: response.data
                });
                onSuccess();
            }).
            catch(error => onError(error));
}