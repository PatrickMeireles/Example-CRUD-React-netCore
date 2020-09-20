const validaForm = (fieldValues, values = null) => {

    let temp = {};

    const campoObrigatorio = 'Este campo é obrigatório';

    if ('Login' in fieldValues)
        temp.Login = fieldValues.Login ? '' : campoObrigatorio;

    if ('Senha' in fieldValues)
        temp.Senha = fieldValues.Senha ? '' : campoObrigatorio;

    return temp;
}

export default validaForm;