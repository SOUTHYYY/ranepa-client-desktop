import React, { Component } from "react";
import MapGL, { Popup, GeolocateControl, NavigationControl } from "react-map-gl";
import "./mapbox-gl.css";
import Pins from "./Pins";
import mapConfig from "./mapConfig";
import { _getGeocoderResourse, updateFireData } from "../firebase/firebase-api";
import ButtonUI from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { offsets } from "../../offsets/offsets";
import { withSnackbar } from "notistack";
import SpeedDialTooltipOpen from "./floatButton/floatButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        mapboxApiAccessToken: mapConfig.token,
        latitude: 56.307,
        longitude: 43.991,
        zoom: 9,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null,
      popupIsCreated: false,
      popupData: null,
      popupInputData: null,
      popupDateBegin: null,
      mapWelcome: {
        dragPan: !this.props.welcomeScreen,
        doubleClickZoom: !this.props.welcomeScreen,
        dragRotate: !this.props.welcomeScreen
      },
      settings: {
        markHide: localStorage.getItem('mapSettings') ? JSON.parse(localStorage.getItem('mapSettings')).markHide : false,
        darkMode: localStorage.getItem('mapSettings') ? JSON.parse(localStorage.getItem('mapSettings')).darkMode : false
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.API.data !== this.state.popupData) {
      this.setState({
        popupData: nextProps.API.data
      });
    }
  }

  componentWillUnmount() {
    this.props.startFetch(true);
  }

  _changesettings(type, action) {
    switch (type) {
      case 1:
        localStorage.setItem('mapSettings', JSON.stringify({
          ...this.state.settings,
          markHide: action
        }));
        this.setState({
          settings: {
            ...this.state.settings,
            markHide: JSON.parse(localStorage.getItem('mapSettings')).markHide
          }
        });
        break;
      case 2:
        localStorage.setItem('mapSettings', JSON.stringify({
          ...this.state.settings,
          darkMode: action
        }));
        this.setState({
          settings: {
            ...this.state.settings,
            darkMode: JSON.parse(localStorage.getItem('mapSettings')).darkMode
          }
        });
        break;
      default:
        break;
    }
  }
  _updateViewport = viewport => {
    const { height, width, ...etc } = viewport;
    this.setState({ viewport: etc });
  };

  _onClickMarker = marker => {
    this.setState({ popupInfo: marker });
  };

  _createPopupForm = async event => {
    event.preventDefault();
    const { lngLat } = event;

    await _getGeocoderResourse(lngLat[1], lngLat[0]).then(address => {
      this.setState({
        popupIsCreated: {
          longitude: lngLat[0],
          latitude: lngLat[1],
          address: address
        }
      });
    });
  };

  handleInput = e => {
    this.setState({
      popupInputData: e.target.value
    });
  };
  handleDateBegin = e => {
    this.setState({
      popupDateBegin: e.target.value
    });
  };
  _transformDateBegin(date) {
    if (date === null) return null;

    let time = date.substring(11);
    let year = date.substring(0, 10);

    return year + " " + time;
  }

  createMarker = (longitude, latitude, description, user, dateBegin) => {
    _getGeocoderResourse(latitude, longitude).then(address => {
      this._transformDateBegin(dateBegin);
      const newElement = {
        address: address,
        date: `${new Date().getDate()}.${new Date().getMonth() +
          1}.${new Date().getFullYear()}`,
        latitude: latitude,
        longitude: longitude,
        description: description,
        user: user.login,
        siteName: user.siteName,
        dateBegin: this._transformDateBegin(dateBegin)
      };
      this.setState({
        popupData: [...this.props.API.data, ...this.state.popupData, newElement]
      });
      updateFireData(
        latitude,
        longitude,
        user,
        description,
        this._transformDateBegin(dateBegin)
      );
    });
    this.setState({
      popupInputData: null,
      popupDateBegin: null
    })
  };

  _renderCreatedPopup = () => {
    const { popupIsCreated, popupInputData, popupDateBegin } = this.state;
    const auth = this.props.auth.siteName
      ? this.props.auth
      : JSON.parse(localStorage.getItem("user"));
    return (
      popupIsCreated &&
      this.props.auth.isAuth && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupIsCreated.longitude}
          latitude={popupIsCreated.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupIsCreated: false })}
        >
          <form onSubmit={e => e.preventDefault()}>
            <strong className="popup-text-header">
              {this.props.auth.siteName
                ? this.props.auth.siteName
                : auth.siteName}
            </strong>
            <br />
            <em className="popup-text-address">{popupIsCreated.address}</em>
            <br />
            <br />
            <TextField
              id="outlined-size-small"
              label={offsets.mapRender.label_textInput}
              variant="outlined"
              type="text"
              size="small"
              inputProps={{
                maxLength: 30
              }}
              onChange={this.handleInput}
            />
            <br />
            <br />
            <TextField
              onChange={this.handleDateBegin}
              id="datetime-local"
              label={offsets.mapRender.label_dataInput}
              type="datetime-local"
              defaultValue="0000-00-00T00:00"
              InputLabelProps={{
                shrink: true
              }}
            />
            <br />
            <br />
            <ButtonUI
              variant="contained"
              color="secondary"
              className="button_submit"
              onClick={() => {
                this.createMarker(
                  popupIsCreated.longitude,
                  popupIsCreated.latitude,
                  popupInputData,
                  auth,
                  popupDateBegin
                );
                setTimeout(() => {
                  this.setState({
                    popupIsCreated: false,
                    popupInputData: null
                  });
                  this.props.enqueueSnackbar("Метка поставлена", {
                    variant: "success",
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "right"
                    }
                  });
                }, 500);
              }}
            >
              Принять
            </ButtonUI>
          </form>
        </Popup>
      )
    );
  };
  _renderPopup() {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <strong className="popup-text-header">{popupInfo.siteName}</strong>
          <br />
          <em className="popup-text-address">{popupInfo.address}</em>
          <br />
          {popupInfo.description === null ? null : (
            <Alert severity="info" className="map-info">{popupInfo.description}</Alert>
          )}
          {popupInfo.dateBegin === null || !popupInfo.hasOwnProperty('dateBegin') ? null : (
            <Alert severity="error" className="map-error" icon={<ScheduleIcon fontSize="inherit" />}>
              {popupInfo.dateBegin}
            </Alert>
          )}
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    const mapPins = this.props.API.data ? this.state.settings.markHide ? null : (
      <Pins
        data={this.state.popupData ? this.state.popupData : this.props.API.data}
        onClick={this._onClickMarker}
        iconSize={this.state.viewport.zoom}
        styles={this.state.settings.darkMode}
      />
    ) : null;

    const preventLeakMemoryFromPopup = this.state.popupIsCreated
      ? this.props.welcomeScreen
        ? null
        : this._renderCreatedPopup()
      : null;
    return (
        <>
          <MapGL
            onClick={this._createPopupForm}
            width={this.props.width}
            height={this.props.height}
            {...this.state.mapWelcome}
            {...viewport}
            mapStyle={
              this.props.welcomeScreen
                  ? mapConfig.apiWelcomeStyle
                  : this.state.settings.darkMode ?
                  mapConfig.apiDarkStyle : mapConfig.apiStyle
            }
            onViewportChange={this._updateViewport}
            className="mapContainer"
        >
            <GeolocateControl
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  margin: 10
                }}
                positionOptions={{enableHighAccuracy: true}}
                trackUserLocation={true}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              marginTop: 50,
              marginLeft: 10
            }}>
              <NavigationControl />
            </div>
          {mapPins}
          {this._renderPopup()}
          {preventLeakMemoryFromPopup}
        </MapGL>
          <SpeedDialTooltipOpen changeSettings={this._changesettings.bind(this)}/>
          </>

    );
  }
}

export default withSnackbar(App);
