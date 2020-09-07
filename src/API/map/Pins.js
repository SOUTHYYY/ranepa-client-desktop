import React, { PureComponent } from "react";
import { Marker } from "react-map-gl";

export default class Pins extends PureComponent {
  render() {
    const { data, onClick, iconSize } = this.props;

    const generalBuilding = "fas fa-building fa-2x"; /// fas fa-building
    const secondaryBuilding = "fas fa-home fa-2x";
    const markers = [
        ...data,
        {
            latitude: 56.29229,
            longitude: 43.98321,
            address: 'Главный корпус',
            description: null,
            siteName: 'НИУ РАНХиГС',
            user: 'genBuild'
        },
        {
            latitude: 56.30545,
            longitude: 43.99114,
            address: 'Корпус СПО',
            description: null,
            siteName: 'НИУ РАНХиГС',
            user: 'secBuild'
        }
    ];
    return markers.map((marker, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={marker.longitude}
        latitude={marker.latitude}
      >
        <i
          className={marker.user === 'genBuild' ? generalBuilding : marker.user === 'secBuild' ? secondaryBuilding : "fas fa-map-marker-alt fa-2x"}
          onClick={() => onClick(marker)}
          style={{
              fontSize: iconSize*(iconSize/6),
              cursor: 'pointer',
              color: this.props.styles ? 'white' : '#951a1d',
              stroke: 'none',
              transform: `translate(${-8*(iconSize/9.2)}px, ${-(iconSize*(iconSize/6))}px)`
          }}
        ></i>
      </Marker>
    ));
  }
}
