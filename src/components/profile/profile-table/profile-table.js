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
import {offsets} from "../../../offsets/offsets";

class ProfileTable extends Component {

    state = {
        error: null,
        data: [],
        alertIsOpen: false,
        tempKey: null,
        loading: false
    };
    deleteMarkArr = (id) => {
        this.state.data.splice(id, 1);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data) {
            this.setState({data: nextProps.data});
        }
        if (nextProps.loading !== this.state.loading) {
            this.setState({
                loading: nextProps.loading
            })
        }
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
                {this.state.loading ? <Loading/> : !this.state.data.length ? <h2>{offsets.profile.labelMarkNotFound}</h2> : this.state.data.map((item, idx) => {
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
                })}
            </List>
                <Dialog
                    open={this.state.alertIsOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"><Alert icon={<DeleteIcon fontSize="inherit" />} severity="warning">{offsets.profile.labelDeleteMarkHeader}</Alert></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {offsets.profile.labelDeleteMarkDescription}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <ButtonUI onClick={this.handleClose} color="primary">
                            {offsets.profile.labelAlertButtonCancel}
                        </ButtonUI>
                        <ButtonUI onClick={this.handleSubmit} color="primary" autoFocus>
                            {offsets.profile.labelAlertButtonSubmit}
                        </ButtonUI>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default ProfileTable;
