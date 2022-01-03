
     //defs //定義proj4套件協助座標轉換
     proj4.defs([
      [
          'EPSG:4326',
          '+title=WGS84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
      [
          'EPSG:3826',
          '+title=TWD97 TM2 +proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=m +no_defs'
      ],
      [
          'EPSG:3828',
          '+title=TWD67 TM2 +proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA +towgs84=-752,-358,-179,-0.0000011698,0.0000018398,0.0000009822,0.00002329 +units=m +no_defs'
      ]
    ]);
    

  //EPSG
  var EPSG3826 = new proj4.Proj('EPSG:3826'); //TWD97 TM2(121分帶)
  var EPSG3828 = new proj4.Proj('EPSG:3828'); //TWD67 TM2(121分帶)
  var EPSG4326 = new proj4.Proj('EPSG:4326'); //WGS84


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
        calHtml: null,
        calCount : 0
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
                    return
                  }       

                  if(isNaN(document.getElementById('seaMile').value)){
                    alert('請輸入數字');
                    return
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
          mapMain.data.calCount = 0;
          if(mapMain.data.calHtml)
          clearInterval(mapMain.data.calHtml);
     
          document.getElementsByClassName('input-ui-res')[0].innerHTML = "查詢結果：";
        },
        addfeatrueLayer:function(coordinateArr){
          //3857 --> 4326
          var coords_4326Arr = ol.proj.transform(coordinateArr,"EPSG:3857","EPSG:4326");
           //4326 -->3826(WGS84經緯度轉TWD97 TM2)
          var coords_3826Arr = proj4(EPSG4326, EPSG3826, coords_4326Arr);                    

          mapMain.methods.clearMapBufferLayer();
          //換算為公尺  1海哩 = 1852公尺
          var seaMile = parseFloat(document.getElementById('seaMile').value) * 1852;

          //製作3826矩形
         var Rectangle_3826 = {
          maxX:coords_3826Arr[0] + seaMile,        
          maxY:coords_3826Arr[1] + seaMile,
          minX:coords_3826Arr[0] - seaMile,
          minY:coords_3826Arr[1] - seaMile
         }; 
         
         var Max4326Arr = proj4(EPSG3826, EPSG4326, [Rectangle_3826.maxX, Rectangle_3826.maxY]);
         //console.log(a);
         var Min4326Arr = proj4(EPSG3826, EPSG4326, [Rectangle_3826.minX, Rectangle_3826.minY]);
         //console.log(b);
         //製作4326矩形
         var bufferRectangle_4326 = {
          maxX:Max4326Arr[0],
          maxY:Max4326Arr[1],
          minX:Min4326Arr[0],        
          minY:Min4326Arr[1]
         }
         
         mapMain.data.calCount = 0;
         mapMain.data.calHtml = setInterval(function(){
          if( mapMain.data.calCount % 5 === 0){
            document.getElementsByClassName('input-ui-res')[0].innerHTML = "計算中.";
          }else if( mapMain.data.calCount % 5 === 1){
            document.getElementsByClassName('input-ui-res')[0].innerHTML = "計算中..";
          }else if( mapMain.data.calCount % 5 === 2){
            document.getElementsByClassName('input-ui-res')[0].innerHTML = "計算中...";
          }else if( mapMain.data.calCount % 5 === 3){
            document.getElementsByClassName('input-ui-res')[0].innerHTML = "計算中...";
          }else if( mapMain.data.calCount % 5 === 4){
            document.getElementsByClassName('input-ui-res')[0].innerHTML = "計算中...";
          }
          mapMain.data.calCount++;
         }, 300)
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
//mapMain.methods.addfeatrueLayer();