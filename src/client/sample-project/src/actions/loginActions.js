import loginApi from '../api/loginApi';
import { Success, Error } from './swalActions';
import { login } from '../api/auth';
import { history } from '../helpers';

export const ACTION_TYPES = {
    AUTHENTICATE: 'AUTHENTICATE'
}

export const Authenticate = (data, onSuccess) => dispatch => {
    loginApi.Login()
        .Authenticate(data)
        .then(response => {
            login(response.data.token);
            //history.push('/home');
            onSuccess();
        }).
        catch(error => {
            dispatch(Error('Ocorreu um erro!', '', error.response.data));
        });
}