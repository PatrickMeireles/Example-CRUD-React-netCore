import swal from 'sweetalert';

export const Success = (title = '', text = '') => dispatch => {
    
        swal({
            title,
            text,
            icon: "success",
        });
}

export const Error = (title = '', text = '', apiError = null) => dispatch => {

    if (apiError != null) {
        var error = apiError.erros[0].error;
        text = error;
    }

    swal({
        title,
        text,
        icon: "error",
    });
}