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


class ProfileTable extends Component {

    state = {
        data: []
    };
    deleteMarkArr = (id) => {
        this.state.data.splice(id, 1);
        this.setState({data: this.state.data})
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data) {
            this.setState({data: nextProps.data});
        }
    }

    render() {

        return (
            <List>
                {this.state.data.length ? this.state.data.map((item, idx) => {
                        return <ListItem key={idx} idx={idx} item={item} className='marker_list'>
                            <ListItemAvatar>
                                <Avatar>
                                    <RoomIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.address} secondary={item.date} />
                            <ButtonUI variant="contained" color="secondary" onClick={() => {this.deleteMarkArr(item.key); deleteMarker(item.key)}}>
                                <DeleteIcon />
                            </ButtonUI>
                        </ListItem>
                    }) : <Loading/>}

            </List>
        );
    }
}

export default ProfileTable;
