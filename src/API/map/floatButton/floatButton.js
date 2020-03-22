import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import RoomIcon from '@material-ui/icons/Room';
import TuneIcon from '@material-ui/icons/Tune';
import MapIcon from '@material-ui/icons/Map';


const useStyles = makeStyles(theme => ({
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(91),
        right: theme.spacing(2),
    },
}));



export default function SpeedDialTooltipOpen(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hide, setHide] = React.useState(!JSON.parse(localStorage.getItem('mapSettings')).markHide);
    const [darkTheme, setDark] = React.useState(!JSON.parse(localStorage.getItem('mapSettings')).darkMode);

    const actions = [
        { icon: <RoomIcon style={hide ? {color: '#951b1d'} : null}/>, name: 'Маркеры', id: 1 },
        { icon: <MapIcon style={darkTheme ? null : {color: '#1a2637'}} />, name: 'Тема', id: 2 },
    ];

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleHide = (id) => {
        switch (id) {
            case 1:
                setHide(!hide);
                props.changeSettings(id, hide);
                break;
            case 2:
                setDark(!darkTheme);
                props.changeSettings(id, darkTheme);
                break;
            default:
                break;
        }
    };
    return (
            <SpeedDial
                ariaLabel="SpeedDial"
                className={classes.speedDial}
                icon={<SpeedDialIcon openIcon={<TuneIcon />} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={"down"}
            >
                {actions.map(action => (
                    <SpeedDialAction
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleHide(action.id)}
                    />
                ))}
            </SpeedDial>
    );
}