import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useForm from '../Form/useForm.js';
import * as LoginAction from '../../actions/loginActions';
import { Link as LinkDom, withRouter, useHistory } from 'react-router-dom';
import Copyright from '../Copyright';

import validaForm from './validate';
import InputCustom from '../Form/inputCustom';
import useStyles from './styles';


const initialFields = {
  Login: '',
  Senha: ''
}

const Login = ({ ...props }) => {

  let history = useHistory();

  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp = validaForm(fieldValues, values);
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

      const onSuccess = () => {
        history.push('/home');
      }

      props.Authenticate(values, onSuccess);
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

          <InputCustom
            id="Login"
            label="Usuário"
            name="Login"
            autoFocus
            handleInputChange={handleInputChange}
            {...(errors.Login && { error: true, helperText: errors.Login })}
          />

          <InputCustom
            name="Senha"
            label="Senha"
            type="password"
            id="Senha"
            handleInputChange={handleInputChange}
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

export default withRouter(connect(mapStateToProps, mapActionToProps)(Login));