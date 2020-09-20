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
import useForm from '../Form/useForm.js';
import { login } from '../../api/auth';
import { Link as LinkDom } from 'react-router-dom';
import Registrar from '../Registrar';
import Copyright from '../Copyright';
import React from 'react';

const InputCustom = (props) => {

    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus= {props.autoFocus}
            name={props.name}
            label={props.label}
            type={props.type ? props.type : 'text'}
            id={props.id}
            onChange={props.handleInputChange}
            error= {props.error}
            helperText= {props.helperText}
        />)
}

export default InputCustom;