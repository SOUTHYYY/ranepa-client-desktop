import React, { Component } from "react";
import MapGL, { Popup } from "react-map-gl";
import "./mapbox-gl.css";
import Pins from "./Pins";
import mapConfig from "./mapConfig";
import { _getGeocoderResourse, updateFireData } from "../firebase/firebase-api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 56.3081,
        longitude: 43.9863,
        zoom: 17,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null,
      popupIsCreated: false,
      popupData: false,
      popupInputData: null,
      disabled: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.popupData) {
      this.setState({
        popupData: nextProps.data
      });
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
  createMarker = (longitude, latitude, description, user) => {
    _getGeocoderResourse(latitude, longitude).then(address => {
      const newElement = {
        address: address,
        date: `${new Date().getDate()}.${new Date().getMonth() +
          1}.${new Date().getFullYear()}`,
        latitude: latitude,
        longitude: longitude,
        description: description,
        user: user.login,
        siteName: user.siteName
      };
      this.setState({
        popupData: [...this.state.popupData, newElement]
      });
      updateFireData(latitude, longitude, user, description);
    });
  };

  _renderCreatedPopup = () => {

    const { popupIsCreated, popupInputData } = this.state;
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
            </strong><br />
            <em className="popup-text-address">{popupIsCreated.address}</em><br /><br />
            <input
              type="text"
              maxLength={30}
              placeholder="Описание"
              onChange={this.handleInput}
            /><br /><br />
            <button
              className="button_submit "
              disabled={this.state.disabled}
              onClick={() => {
                this.createMarker(
                  popupIsCreated.longitude,
                  popupIsCreated.latitude,
                  popupInputData,
                  auth
                );
                setTimeout(() => {
                  this.setState({
                    popupIsCreated: false,
                    popupInputData: null
                  });
                }, 500);
              }}
            >
              Принять
            </button>
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
          <p className="popup-text-details">{popupInfo.description}</p>
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    const mapPins = this.props.data ? (
      <Pins
        data={this.state.popupData ? this.state.popupData : this.props.data}
        onClick={this._onClickMarker}
      />
    ) : null;
    const preventLeakMemoryFromPopup = this.state.popupIsCreated
      ? this._renderCreatedPopup()
      : null;

    return (
      <MapGL
        onClick={this._createPopupForm}
        width="100vw"
        height="100vh"
        {...viewport}
        mapStyle={mapConfig.apiStyle}
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={mapConfig.token}
        className="mapContainer"
      >
        {mapPins}
        {this._renderPopup()}
        {preventLeakMemoryFromPopup}
      </MapGL>
    );
  }
}

export default App;
