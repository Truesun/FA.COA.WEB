
var mapConfig = {
    entity:{},  
    clickStatus : "default",
    isRadiusBoxOpen:false, //半徑測量設定預設關閉
}

var mapMain = {
    data:{
        centerLongitudeLatitude:ol.proj.fromLonLat([120.2278, 22.5243]),   
        featureLayerArrCenter:[], 
        featureLayerArrBuffer : [],    
        queryShipOBj:{  //查詢半徑內漁船參數
          radius:0, //公尺
          circleCenter_3857:null,
        }
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
              
              mapConfig.entity.olMap.on('click', function(evt){
                if(mapConfig.clickStatus === "mapBuffer"){
                  if(document.getElementById('seaMile').value === ""){
                    alert('請輸入半徑(單位:海哩)');
                    return;
                  }       

                  if(isNaN(document.getElementById('seaMile').value)){
                    alert('請輸入數字');
                    return;
                  }
                  
                  mapMain.methods.addfeatrueLayer(evt.coordinate);
                }
              });
        },
        changeMapClickStatus : function(status){
          mapConfig.clickStatus = status;
        },
        toggleMapBuffer:function(){    
          //因common.js 註冊測量半徑btnRadiusOpen按鈕  不知為何  -->  此處  display = none = 開  ,'' = 關
          mapConfig.isRadiusBoxOpen = document.getElementById('radiusBox').style.display === "none" ? true : false; 
          //console.log(mapConfig.isRadiusBoxOpen);
          mapConfig.clickStatus = mapConfig.isRadiusBoxOpen ? "mapBuffer" : "default"; 
         mapMain.methods.clearMapBufferLayer();
        },
        clearMapBufferLayer:function(){
          //清除buffer的圓
          if(mapConfig.entity.featureLayer_Center){  
            mapConfig.entity.olMap.removeLayer(mapConfig.entity.featureLayer_Center);        
          }

          if(mapConfig.entity.featureLayer_buffer){
            mapConfig.entity.olMap.removeLayer(mapConfig.entity.featureLayer_buffer);
          }


          //恢復查詢初始狀態
          // mapMain.data.calCount = 0;
          // if(mapMain.data.calHtml)
          // clearInterval(mapMain.data.calHtml);
          //document.getElementById('seaMile').value = "";

          document.getElementsByClassName('input-ui-res')[0].innerHTML = "查詢結果：";
        },
        addfeatrueLayer:function(coordinateArr){
                           
          mapMain.methods.clearMapBufferLayer();
          //換算為公尺  1海哩 = 1852公尺
          var seaMile = parseFloat(document.getElementById('seaMile').value) * 1852;

          //將半徑寫入全域
          mapMain.data.queryShipOBj.radius = seaMile;
          //將地圖點擊的中心點寫入全域
          mapMain.data.queryShipOBj.circleCenter_3857 = coordinateArr;
        
         //console.log(bufferRectangle_4326);

          mapMain.data.featureLayerArrCenter = [];
          mapMain.data.featureLayerArrCenter.push(new ol.Feature(new ol.geom.Circle(coordinateArr, 100)));

          mapConfig.entity.featureLayer_Center = new ol.layer.Vector({
            source: new ol.source.Vector({
            projection: 'EPSG:4326',
            // radius = 4000 meters
            features: mapMain.data.featureLayerArrCenter
            }),
            style: [
            new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'red',
              width: 3
            }),
            fill: new ol.style.Fill({
              color: 'rgba(255, 0, 0, 1)'
            })
            })
            ]
            });

          mapConfig.entity.olMap.addLayer(mapConfig.entity.featureLayer_Center);
            
          mapMain.data.featureLayerArrBuffer = [];
          mapMain.data.featureLayerArrBuffer.push(new ol.Feature(new ol.geom.Circle(coordinateArr, seaMile)));

          mapConfig.entity.featureLayer_buffer = new ol.layer.Vector({
            source: new ol.source.Vector({
            projection: 'EPSG:4326',
            // radius = 4000 meters
            features: mapMain.data.featureLayerArrBuffer
            }),
            style: [
            new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'blue',
              width: 3
            }),
            fill: new ol.style.Fill({
              color: 'rgba(0, 0, 255, 0.1)'
            })
            })
            ]
            });
            
            mapConfig.entity.olMap.addLayer(mapConfig.entity.featureLayer_buffer);
            //mapConfig.clickStatus = "default";
        }
    },
};

mapMain.methods.initMap();