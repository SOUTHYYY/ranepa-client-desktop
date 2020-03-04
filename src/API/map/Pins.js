import React, { PureComponent } from "react";
import { Marker } from "react-map-gl";

export default class Pins extends PureComponent {
  render() {
    const { data, onClick, iconSize } = this.props;
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
              fontSize: iconSize*(iconSize/6),
              cursor: 'pointer',
              color: '#951a1d',
              stroke: 'none',
              transform: `translate(-6px, ${-(iconSize*(iconSize/6))}px)`
          }}
        ></i>
      </Marker>
    ));
  }
}
