import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as CidadeActions from '../../actions/cidadeActions';
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

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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

export function Register({...props}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [cidades, setCidades] = useState([]);
  const loading = open && cidades.length === 0;

    useEffect(() => {
      let active = true;

      if(!loading){
        return undefined;
      }
      
      

      (async() => {

       

        const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
        //await sleep(1e3);
        const countries = await response.json();

        console.log(countries)
        await props.cidades();

        console.log(props.cidade);

        if(active){
          setCidades(Object.keys(countries).map((key) => countries[key].item[0]));          
        }
      })();

      return () => {
        active = false;
      }
    }, [loading]);

    useEffect(() => {
      if(!open){
        setCidades([]);
      }
    }, [open]);


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
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="nome"
                variant="outlined"
                required
                fullWidth
                id="nome"
                label="Nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="asynchronous-demo"
                style={{ width: 300 }}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={cidades}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Asynchronous"
                    variant="outlined"
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <LinkDom to='/' variant="body2">
                Already have an account? Sign in
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


const mapStateToProps = state => ({cidade: state.cidadeReducer.list });

const mapActionToProps = {
    cidades: CidadeActions.getAll
}

export default connect(mapStateToProps, mapActionToProps)(Register);