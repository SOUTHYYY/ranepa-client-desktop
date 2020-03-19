import React from "react";
import "./about-us.css";
import {offsets} from "../../offsets/offsets";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '35px',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '20px'
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(2, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  block: {
    width: '650px',
    display: 'flex'
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginBottom: theme.spacing(2)
  }
}));

const AboutUs = () => {
  const classes = useStyles();
  return (
    <div>
      <div className="home-title">
        <p className="aboutUsHeader">
          {offsets.aboutUs.aboutUsHeader}
        </p>
        <p className="aboutUsName">{offsets.aboutUs.aboutUsName}</p>
        <div className={classes.block}>
          <div className={classes.root}>
          <div className={classes.section1}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  Алексей
                </Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.large} alt="Алексей" src="https://sun9-68.userapi.com/c857224/v857224409/eb4f9/VMrSw4H7NQ4.jpg" />
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" />
          <div className={classes.section2}>
            <div>
              <Chip className={classes.chip} color="secondary" label="GitHub" />
              <Chip className={classes.chip} color="primary" label="Redux" />
              <Chip className={classes.chip} color="primary" label="React Native" />
            </div>
          </div>
        </div>
          <div className={classes.root}>
            <div className={classes.section1}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    Вадим
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.large} alt="Вадим" src="https://sun9-38.userapi.com/c848520/v848520090/1a6c94/qO8GJvd1oRE.jpg" />
                </Grid>
              </Grid>
            </div>
            <Divider variant="middle" />
            <div className={classes.section2}>
              <div>
                <Chip className={classes.chip} color="secondary" label="Firebase" />
                <Chip className={classes.chip} color="primary" label="Mapbox GL" />
                <Chip className={classes.chip} color="primary" label="React" />
              </div>
            </div>
          </div>
        </div>
        <div className="aboutUsLogo fa-5x">
          <a href="https://ru.reactjs.org/">
            <i className="aboutIcon fab fa-react"></i>
          </a>
          <a href="https://firebase.google.com/">
            <i className="aboutIcon fas fa-fire-alt"></i>
          </a>
          <a href="https://github.com/SOUTHYYY/ranepa-client-desktop">
            <i className="aboutIcon fab fa-github"></i>
          </a>
          <a href="https://www.mapbox.com/">
            <i className="aboutIcon fas fa-map-marked-alt"></i>
          </a>
        </div>
      </div>
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div
            className="wave waveTop"
            style={{
              backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-top.png')`
            }}
          />
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div
            className="wave waveMiddle"
            style={{
              backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-mid.png')`
            }}
          />
        </div>
        <div className="waveWrapperInner bgBottom">
          <div
            className="wave waveBottom"
            style={{
              backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-bot.png')`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
