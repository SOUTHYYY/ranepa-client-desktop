import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import s from './maps.module.css';
// Some changes
mapboxgl.accessToken = 'pk.eyJ1IjoibWFmYWhlcyIsImEiOiJjazV6cW5xdDUwMDRrM21ueHF2Z3EzY3VyIn0.RRuRqnVCy3VWno0v3Xk__w';

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 43.99254,
            lat: 56.3074,
            zoom: 13.89
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mafahes/ck5zqz49333o11intge32b2pf',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }

    render() {
        return (
            <div>
                <div className={s.mark}>
                    <i className="fas fa-map-marker-alt"></i>
                </div>
                <div ref={el => this.mapContainer = el} className={s.mapContainer}/>
            </div>
        )
    }
}