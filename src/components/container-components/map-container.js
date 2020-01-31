import React, {Component} from 'react';
import {connect} from "react-redux";
import Pins from "../../API/Pins";
import MapGL, {Marker} from "react-map-gl";
import {viewportChanged} from "../../redux/actions/map";


class MapContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {pins, token, apiStyle, viewport, viewportChanged} = this.props
        const markers = pins.map(el => {
            return (
                <Marker key={el.id} latitude={el.latitude} longitude={el.longitude}>
                    <Pins/>
                </Marker>)
        })
        return (
            <div className="mapContainer">
                <MapGL{...viewport}
                      mapStyle={apiStyle}
                      mapboxApiAccessToken={token}
                      onViewportChange={(viewport) => viewportChanged(viewport)}>
                    {markers}
                </MapGL>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    pins: state.map.pins,
    viewport: state.map.viewport,
    token: state.map.token
})

export default connect(mapStateToProps, {viewportChanged})(MapContainer);