import React, { PureComponent } from "react";
import { Marker } from "react-map-gl";

export default class Pins extends PureComponent {
  render() {
    const { data, onClick } = this.props;
    return data.map((marker, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={marker.longitude}
        latitude={marker.latitude}
      >
        <i
          className="fas fa-map-marker-alt fa-2x"
          onClick={() => onClick(marker)}
          style={{
              cursor: 'pointer',
             color: '#951a1d',
              stroke: 'none',
              transform: `translate(-12px, -27px)`
          }}
        ></i>
      </Marker>
    ));
  }
}
