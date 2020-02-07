# ranepa-client-desktop


**Install dependencies:**
```
npm install firebase
npm install axios
npm install redux
npm install mapbox-gl
```
# 

. | Map source | Database source
------------ | ------------ | -------------
Desktop | Mapbox GL | Firebase
iOS/Anroid | undefined | Firebase

# Config 


**mapConfig.js**
```js
  const config = {
    pinsConfig: {
        "circle-radius": {
            "base": 1.45,
            "stops": [[12, 2], [22, 180]]
        },
        "circle-color": "#951b1d",
        "circle-opacity": 0.5,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#bcb7b9"
    },
    apiStyle: [Your map style from Mapbox],
    token: [Your token from Mapbox]
};
```
