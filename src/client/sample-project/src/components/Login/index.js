import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';
import useForm from '../Form/useForm.js';
import * as LoginAction from '../../actions/loginActions';
import { Link as LinkDom, withRouter } from 'react-router-dom';
import Registrar from '../Registrar';
import Copyright from '../Copyright';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFields = {
  Login: '',
  Senha: ''
}

const Login = ({ ...props }) => {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    const campoObrigatorio = 'Este campo é obrigatório';

    if ('Login' in fieldValues)
      temp.Login = fieldValues.Login ? '' : campoObrigatorio;

    if ('Senha' in fieldValues)
      temp.Senha = fieldValues.Senha ? '' : campoObrigatorio;

    setErrors({ ...temp });

    if (fieldValues == values)
      return Object.values(temp).every(x => x == '');

  }

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
      props.Authenticate(values);
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
          Acessar
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Login"
            label="Usuário"
            name="Login"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            {...(errors.Login && { error: true, helperText: errors.Login })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Senha"
            label="Senha"
            type="password"
            id="Senha"
            autoComplete="current-password"
            onChange={handleInputChange}
            {...(errors.Senha && { error: true, helperText: errors.Senha })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Acessar
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <LinkDom to='/registrar' variant="body2">
                {"Novo por aqui? Crie uma conta"}
              </LinkDom>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const showLogin = withRouter(Login);

const mapStateToProps = state => ({});

const mapActionToProps = {
  Authenticate: LoginAction.Authenticate
}

export default connect(mapStateToProps, mapActionToProps)(showLogin);