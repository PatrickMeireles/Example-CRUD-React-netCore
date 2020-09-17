import { validateEmail } from '../Util/validation';

const validaForm = (fieldValues, values = null) => {

    let temp = { };

    const campoObrigatorio = 'Este campo é obrigatório';

    if ('Nome' in fieldValues)
      temp.Nome = fieldValues.Nome ? '' : campoObrigatorio;

    if ('Email' in fieldValues) {

      if (fieldValues.Email === '')
        temp.Email = campoObrigatorio;
      else if (!validateEmail(fieldValues.Email))
        temp.Email = "Email informado não é válido";
      else
        temp.Email = '';
    }

    if ('Senha' in fieldValues || 'ConfirmarSenha' in fieldValues) {

      var senhaF = fieldValues.Senha;
      var confirmarSenhaF = fieldValues.ConfirmarSenha;

      temp.Senha = '';

      if ('Senha' in fieldValues) {

        if (!senhaF)
          temp.Senha = campoObrigatorio;

        if (senhaF !== '' && (senhaF.length < 6 || senhaF.length > 20))
          temp.Senha = 'A senha deve conter entre 6 a 20 caracteres';
      }

      temp.ConfirmarSenha = '';

      if ('ConfirmarSenha' in fieldValues) {
        if (!confirmarSenhaF)
          temp.ConfirmarSenha = campoObrigatorio;

        if ((values.Senha && confirmarSenhaF && (values.Senha != confirmarSenhaF)))
          temp.ConfirmarSenha = 'As senhas não conferem'
      }
    }

    if ('IdCidade' in fieldValues)
      temp.IdCidade = fieldValues.IdCidade ? '' : campoObrigatorio;

    return temp;
        
}

export default validaForm;