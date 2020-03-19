import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Chip from "@material-ui/core/Chip";
import InfoIcon from '@material-ui/icons/Info';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import useTheme from "@material-ui/core/styles/useTheme";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import GroupIcon from '@material-ui/icons/Group';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(2),
    },
    root: {
        display: 'flex',
        width: '687px',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 181,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    item: {
        width: '150px',
        marginRight: '8px'
    },
    icon: {
        backgroundColor: '#671314'
    }
}));

export default function SimplePopover(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {is_closed, photo_200, members_count, page, type, name} = props.vkData.response[0];
    const {photos, videos} = props.vkData.response[0].counters;
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div>
            <Chip icon={<InfoIcon/>} label="ВК" component="a" href="#chip" clickable onClick={handleClick} aria-describedby={id}/>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                {name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Группа ВКонтакте
                            </Typography>
                            <Divider/>
                            <List style={{display: 'flex', flexWrap: 'wrap'}}>
                                <ListItem className={classes.item}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.icon}>
                                            <GroupIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Участников" secondary={members_count} />
                                </ListItem>
                                <ListItem className={classes.item}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.icon}>
                                            <PhotoSizeSelectActualIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Фотографий" secondary={photos} />
                                </ListItem>
                                <ListItem className={classes.item}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.icon}>
                                            <VideoLibraryIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Видео" secondary={videos} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </div>
                    <CardMedia
                        className={classes.cover}
                            image={photo_200}
                        title="Лого группы"
                    />
                </Card>
            </Popover>
        </div>
    );
}