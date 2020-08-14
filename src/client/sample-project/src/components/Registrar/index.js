import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkDom } from 'react-router-dom';
import Copyright from '../Copyright';
import Autocomplete from '@material-ui/lab/Autocomplete'
import useForm from '../Form/useForm.js';
import { validateEmail } from '../Util/validation';

import * as CidadeActions from '../../actions/cidadeActions';
import * as RegistrarActions from '../../actions/registrarActions';
import swal from 'sweetalert';
import  { Redirect , useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFields = {
  Nome: '',
  Email: '',
  IdCidade: '',
  Senha: '',
  ConfirmarSenha: ''
};

export function Register({ ...props }) {


  let history = useHistory()

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [cidades, setCidades] = useState([]);
  const loading = open && cidades.length === 0;

  useEffect(() => {
    props.cidades();
  }, []);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    props.cidades();
    if (active) {
      setCidades(formatReturnCidades(props.cidade));
    }

    return () => {
      active = false;
    }
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setCidades([]);
    }
  }, [open]);

  const onChangeSelect = e => {
    props.cidades(e.target.value);
    setCidades(formatReturnCidades(props.cidade));
  }

  const formatReturnCidades = cidades => {
    return cidades.map(c => ({
      id: c.id,
      text: c.nome + ' - ' + c.uf
    }));
  }



  const validate = (fieldValues = values) => {
    let temp = { ...errors };

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

    setErrors({ ...temp });

    if (fieldValues == values) {
      var retorno = Object.values(temp).every(x => x == "");
      return retorno;
    }
  };

  const {
    values,
    setValues,
    handleInputChange,
    handleInputChangeSelect,
    resetForm,
    errors,
    setErrors } = useForm(initialFields, validate);

  const handleSubmit = e => {
    e.preventDefault();

    var returnValidate = validate();

     if(returnValidate){

      const onSuccess = () => {

        history.push('/');

        swal({
          title: "Boas Notícias!",
          text: 'Cadastro registrado com sucesso',
          icon: "success",
        })
      }

      const onError = (response) => {
        if(response.erros){
            var mensagem = response.erros[0].error;
            swal({
              title: "Ocorreu um erro!",
              text: mensagem,
              icon: "error",
            })
        }
      }


      props.registrar(values, onSuccess, onError);

     }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="Nome"
                variant="outlined"
                required
                fullWidth
                id="Nome"
                label="Nome"
                autoFocus
                onChange={handleInputChange}
                {...(errors.Nome && { error: true, helperText: errors.Nome })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Email"
                label="Email"
                name="Email"
                onChange={handleInputChange}
                {...(errors.Email && { error: true, helperText: errors.Email })}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="IdCidade"
                name="IdCidade"
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                getOptionSelected={(option, value) => option.value === value.value}
                getOptionLabel={(option) => option.text}
                options={cidades}
                loading={loading}
                onChange={(option, value) => handleInputChangeSelect(value?.id, 'IdCidade')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={onChangeSelect}
                    label="Cidade"
                    required
                    variant="outlined"
                    {...(errors.IdCidade && { error: true, helperText: errors.IdCidade })}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        // <React.Fragment>
                        //   {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        //   {params.InputProps.endAdornment}
                        // </React.Fragment>
                        <> {params.InputProps.endAdornment} </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Senha"
                label="Senha"
                type="password"
                id="Senha"
                onChange={handleInputChange}
                {...(errors.Senha && { error: true, helperText: errors.Senha })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="ConfirmarSenha"
                label="Confirma Senha"
                type="password"
                id="ConfirmarSenha"
                onChange={handleInputChange}
                {...(errors.ConfirmarSenha && { error: true, helperText: errors.ConfirmarSenha })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <LinkDom to='/' variant="body2">
                Já possui uma conta?
              </LinkDom>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = state => ({ cidade: state.cidadeReducer.list });

const mapActionToProps = {
  cidades: CidadeActions.getAll,
  registrar: RegistrarActions.Create
}

export default connect(mapStateToProps, mapActionToProps)(Register);