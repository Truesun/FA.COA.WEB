
var mapConfig = {
    entity:{} 
}

var mapMain = {
    data:{
        centerLongitudeLatitude:ol.proj.fromLonLat([120.2278, 22.5243]),    
    },
    methods: {
        initMap:function(){
            mapConfig.entity.olMap = new ol.Map({
                target: 'mapView',
                layers: [
                  new ol.layer.Tile({
                    source: new ol.source.OSM()
                  }),
                  //layer
                ],
                view: new ol.View({
                  center: mapMain.data.centerLongitudeLatitude,
                  zoom: 12
                })
              }); 
        }
    },
};

mapMain.methods.initMap();