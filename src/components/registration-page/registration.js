import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Field, reduxForm} from "redux-form";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {withSnackbar} from "notistack";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {withRouter} from 'react-router-dom';
import Redirect from "react-router-dom/es/Redirect";

const useStyles = makeStyles(theme => ({
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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const renderTextField = (
    { input, label, meta: { touched, active }, input: { value }, ...custom },
) => (
    <TextField
        required
        fullWidth
        error={!!((touched && !value) && !active)}
        label={label}
        variant="outlined"
        helperText={(touched && !value) && 'Ошибка'}
        {...input}
        {...custom}
    />
);

const hasNotEmpty = (value) => {
    if (value) return undefined;
    return true;
};

const RegisterForm = (props) => {
    const classes = useStyles();
    return  <form className={classes.form} onSubmit={props.handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Field name="login" component={renderTextField} label="Логин" validate={[hasNotEmpty]}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Field name="password" component={renderTextField} label="Пароль" validate={[hasNotEmpty]}/>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Field name="vkId" component={renderTextField} label="ID ВК" error={false} helperText={false} validate={[hasNotEmpty]} disabled={!!props.vkRedux}/>
            </Grid>
            <Grid item xs={2}>
                <Tooltip title="Пройти верификацию" placement="bottom">
                    <Fab color="secondary"
                         disabled={props.vkValid.hasOwnProperty('register') ?
                        props.vkValid.register.hasOwnProperty('values') ?
                            !props.vkValid.register.values.hasOwnProperty('vkId') : true : true}
                         style={props.vkRedux ? {backgroundColor: '#009616c9'} : null}
                         onClick={() => props.onVkSubmit(props.vkValid.register.values.vkId)}
                    >
                        {!props.vkRedux ? <LockOutlinedIcon/> : <LockOpenIcon/>}
                    </Fab>
                </Tooltip>
            </Grid>
            <Grid item xs={2}>
                <Fab color="secondary" aria-label="edit" onClick={props.setOpen}>
                    <InfoIcon />
                </Fab>
            </Grid>
            <Grid item xs={12}>
                <Field name="siteName" component={renderTextField} label="Название студ. сообщества" validate={[hasNotEmpty]}/>
            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={props.handleSubmit}
            disabled={!(props.valid && props.vkRedux !== false)}
        >
            Регистрация
        </Button>
    </form>

};

const ReduxRegisterForm = reduxForm({form: 'register'})(RegisterForm);


const Register = (props) => {
    const classes = useStyles();
    const { reg: { error } } = props;
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if(error) {
            props.enqueueSnackbar(error);
        }
    }, [error]);

    const onSubmit = async (data) => {
        await props.submitReg(data.login, data.siteName, data.vkId, data.password);
    };

    const onVkSubmit = (id) => {
        props.fetchVK(id);
    };

    if(props.reg.registered) return <Redirect to={"/login"}/>;
    return <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Регистрация
            </Typography>
                <ReduxRegisterForm onSubmit={onSubmit} vkRedux={props.reg.vkId} onVkSubmit={onVkSubmit} setOpen={handleOpen} vkValid={props.regForm}/>
        </div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                F.A.Q По регистрации
            </DialogTitle>
            <DialogContent dividers>
                <Alert severity="error" style={{marginBottom: '20px'}}>Ошибка безопастности</Alert>
                Данная группа не имеет прямого отношения к НИУ РАНХиГС
                <Divider variant="fullWidth"/>
                <Alert severity="error" style={{marginBottom: '20px', marginTop: '10px'}}>Данной группы несуществует</Alert>
                <Typography gutterBottom>
                    Данной группы нет в базе данных ВКонтакте
                </Typography>
                <Divider variant="fullWidth"/>
                <Alert severity="info" style={{marginBottom: '20px', marginTop: '10px'}}>Как найти ID группы ВКонтакте</Alert>
                <Typography gutterBottom>
                    Скопируйте ссылку на ваше сообщество ВКонтакте из адресной строки, скопируйте всё что находится после https://vk.com/
                </Typography>
                <Chip label="https://vk.com/niuranepa"  style={{color: 'white', backgroundColor: '#f50057', marginBottom: 10}}/> - Неправильно<br/>
                <Chip label="niuranepa" style={{backgroundColor: '#009616c9'}} color="secondary"/> - Правильно
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    </Container>
};


export default withRouter(withSnackbar(Register));