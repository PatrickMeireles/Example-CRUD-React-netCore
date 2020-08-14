import cidadeApi from '../api/cidadeApi';

export const ACTION_TYPES = {
    GETALL: 'GETALL'
}

export const getAll = (descricao = '') => dispatch => {
    cidadeApi.Cidade().getAll(descricao)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.GETALL,
                payload: response.data
            })
        })
        .catch(err => {console.log(err)})
}