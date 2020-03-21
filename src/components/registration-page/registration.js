import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withSnackbar} from "notistack";
import Fab from "@material-ui/core/Fab";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Alert from "@material-ui/lab/Alert";
import Chip from "@material-ui/core/Chip";
import {Redirect} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";



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

function Register(props) {
    const [open, setOpen] = React.useState(false);
    const { reg: { vkId, error }, } = props;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [data, setData] = useState({
        login: "",
        password: "",
        siteName: "",
        vkId: "",
        vkTrusted: false,
        submitted: false
    });
    const classes = useStyles();

    const handleData = ({ target: { id, value } }) => {
        setData({
            ...data,
            [id]: value
        })
    };
    const onSubmitCheck = () => {
        props.fetchVK(data.vkId);
        setData({
            ...data,
            vkTrusted: false
        })
    };
    const onSubmit = () => {
        props.submitReg(data.login, data.siteName, data.vkId, data.password);
        setData({
            ...data,
            submitted: true,
            vkTrusted: false
        })
    };
    useEffect(() => {
    if(props.reg.vkId !== null && props.reg.vkId !== false && props.reg.vkId !== 'similarity_err') {
        setData({
            ...data,
            vkTrusted: true
        });
        props.enqueueSnackbar('Группа ВК подтверждена', {variant: 'success'})
    }
    }, [vkId]);
    useEffect(() => {
        if(data.vkTrusted) {
            setData({
                ...data,
                vkTrusted: false
            })
        }
    }, [data.vkId]);

    useEffect(() => {
        if(props.reg.error) {
            props.enqueueSnackbar(props.reg.error, {variant: 'error'});
        }
    }, [error]);

    if (props.reg.registered && !data.vkTrusted){
        props.clearData();
        return <Redirect to={'/map'}/>
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="login"
                                variant="outlined"
                                required
                                fullWidth
                                label="Логин"
                                autoFocus
                                value={data.login}
                                onChange={handleData}
                                inputProps={{ maxLength: 10}}
                                pattern="[A-Za-z]"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="password"
                                variant="outlined"
                                required
                                fullWidth
                                label="Пароль"
                                onChange={handleData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id="vkId"
                                variant="outlined"
                                required
                                fullWidth
                                label="ID группы ВК"
                                onChange={handleData}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Tooltip title="Пройти верификацию" placement="bottom">
                            <Fab color="secondary" disabled={data.vkId.length < 1} style={data.vkTrusted ? {backgroundColor: '#009616c9'} : data.vkId.length < 1 ? {backgroundColor: 'gray'} : {backgroundColor: '#f50057'}} onClick={onSubmitCheck}>
                                {data.vkTrusted? <LockOpenIcon/> : <LockOutlinedIcon/>}
                            </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={2}>
                            <Fab color="secondary" aria-label="edit" onClick={handleClickOpen}>
                                <InfoIcon />
                            </Fab>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="siteName"
                                variant="outlined"
                                required
                                fullWidth
                                label="Название студ. сообщества"
                                rowsMax={10}
                                onChange={handleData}
                                inputProps={{ maxLength: 10 }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={onSubmit}
                        disabled={data.vkTrusted ? "" === (data.vkId && data.login && data.password && data.siteName) : true}
                    >
                        Регистрация
                    </Button>
                </form>
            </div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    F.A.Q По регистрации
                </DialogTitle>
                <DialogContent dividers>
                    <Alert severity="error" style={{marginBottom: '20px'}}>Ошибка безопастности</Alert>
                    Данная группа не имеет прямого отношения к НИУ РАНХиГС
                    <Divider variant="fullWidth"/>
                    <Typography gutterBottom>
                        <Alert severity="error" style={{marginBottom: '20px', marginTop: '10px'}}>Данной группы несуществует</Alert>
                        Данной группы нет в базе данных ВКонтакте
                    </Typography>
                    <Divider variant="fullWidth"/>
                    <Typography gutterBottom>
                        <Alert severity="info" style={{marginBottom: '20px', marginTop: '10px'}}>Как найти ID группы ВКонтакте</Alert>
                        Скопируйте ссылку на ваше сообщество ВКонтакте из адресной строки, скопируйте всё что находится после &nbsp;
                        <Chip label="https://vk.com/" variant="outlined" /><br/>
                        <Chip label="https://vk.com/niuranepa"  style={{color: 'white', backgroundColor: '#f50057', marginBottom: 10}}/> - Неправильно<br/>
                        <Chip label="niuranepa" style={{backgroundColor: '#009616c9'}} color="secondary"/> - Правильно
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default withSnackbar(Register)