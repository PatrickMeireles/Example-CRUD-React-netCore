import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkDom, withRouter, useHistory } from 'react-router-dom';
import Copyright from '../Copyright';
import Autocomplete from '@material-ui/lab/Autocomplete'
import useForm from '../Form/useForm.js';
import * as CidadeActions from '../../actions/cidadeActions';
import * as RegistrarActions from '../../actions/registrarActions';
import validaForm from './validate';

import InputCustom from '../Form/inputCustom';
import useStyles from './styles';


const initialFields = {
  Nome: '',
  Email: '',
  IdCidade: '',
  Senha: '',
  ConfirmarSenha: ''
};

const Registrar = ({ ...props }) => {

  const history = useHistory();

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

    temp = validaForm(fieldValues, values);

    setErrors({ ...temp });

    if (fieldValues == values)
      return Object.values(temp).every(x => x == "");
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

    if (returnValidate) {

      const onSuccess = () => {
        history.push('/');
      }

      props.registrar(values, onSuccess);
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
              <InputCustom
                id="Nome"
                label="Nome"
                name="Nome"
                autoFocus
                handleInputChange={handleInputChange}
                {...(errors.Nome && { error: true, helperText: errors.Nome })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputCustom
                id="Email"
                label="Email"
                name="Email"
                autoFocus
                handleInputChange={handleInputChange}
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
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>

                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputCustom
                id="Senha"
                label="Senha"
                name="Senha"
                type="password"
                autoFocus
                handleInputChange={handleInputChange}
                {...(errors.Senha && { error: true, helperText: errors.Senha })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputCustom
                id="ConfirmarSenha"
                label="Confirma Senha"
                name="ConfirmarSenha"
                type="password"
                autoFocus
                handleInputChange={handleInputChange}
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

const showRegistrar = withRouter(Registrar);

const mapStateToProps = state => ({ cidade: state.cidadeReducer.list });

const mapActionToProps = {
  cidades: CidadeActions.getAll,
  registrar: RegistrarActions.Create
}

export default connect(mapStateToProps, mapActionToProps)(showRegistrar);