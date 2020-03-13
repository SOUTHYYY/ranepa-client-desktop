import React, {Component} from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import RoomIcon from '@material-ui/icons/Room';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonUI from '@material-ui/core/Button';
import {deleteMarker} from "../../../API/firebase/firebase-api";
import {Loading} from "../../timetable/timetable";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from "@material-ui/lab/Alert";

class ProfileTable extends Component {

    state = {
        emptyData: false,
        data: [],
        alertIsOpen: false,
        tempKey: null
    };
    deleteMarkArr = (id) => {
        this.state.data.splice(id, 1);
        this.setState({data: this.state.data})
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.hasOwnProperty('empty')) {
            this.setState({emptyData: true})
        } else {
            if (nextProps.data !== this.state.data) {
                this.setState({data: nextProps.data});
            }
        }
        console.log(this.state)
    }


    handleClickOpen = (key) => {
        this.setState({
            alertIsOpen: true,
            tempKey: key
        });
    };

    handleClose = () => {
        this.setState({alertIsOpen: false});
    };
    handleSubmit = () => {
        this.setState({
            alertIsOpen: false
        });
        this.deleteMarkArr(this.state.tempKey);
        deleteMarker(this.state.tempKey)
    };
    render() {
        return (
            <React.Fragment>
            <List>
                {this.state.data.length ? this.state.data.map((item, idx) => {
                        return <ListItem key={idx} idx={idx} item={item} className='marker_list'>
                            <ListItemAvatar>
                                <Avatar>
                                    <RoomIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.address} secondary={item.date} />
                            <ButtonUI variant="contained" color="secondary" onClick={() => this.handleClickOpen(item.key)}>
                                <DeleteIcon />
                            </ButtonUI>
                        </ListItem>
                    }) : this.props.data.empty ? <h2>Ни одного маркера не найдено</h2> : <Loading/>}
            </List>
                <Dialog
                    open={this.state.alertIsOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"><Alert icon={<DeleteIcon fontSize="inherit" />} severity="warning">Подтверждение удаления маркера</Alert></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы уверены что хотите удалить данный маркер?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <ButtonUI onClick={this.handleClose} color="primary">
                            Отмена
                        </ButtonUI>
                        <ButtonUI onClick={this.handleSubmit} color="primary" autoFocus>
                            Подтверждаю
                        </ButtonUI>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default ProfileTable;
