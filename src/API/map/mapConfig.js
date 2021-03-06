const config = {
  pinsConfig: {
    "circle-radius": {
      base: 1.45,
      stops: [
        [12, 2],
        [22, 180]
      ]
    },
    "circle-color": "#951b1d",
    "circle-opacity": 0.5,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#bcb7b9"
  },
  apiStyle: "mapbox://styles/mafahes/ck5zqz49333o11intge32b2pf",
  apiWelcomeStyle: "mapbox://styles/mafahes/ck5zquanh093c1ip55qgp0e76",
  apiDarkStyle: 'mapbox://styles/mafahes/ck7ytniby1cm81jlktlfxfuuh',
  token:
    "pk.eyJ1IjoibWFmYWhlcyIsImEiOiJjazV6cW5xdDUwMDRrM21ueHF2Z3EzY3VyIn0.RRuRqnVCy3VWno0v3Xk__w",
  geoCoderAPI: "https://api.mapbox.com/geocoding/v5/mapbox.places"
};

export default config;
