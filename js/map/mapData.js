
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


var mapData = {
    data:{  //三個功能各自使用的資料區塊
        features1:{
            apiReturnData:null,
        },
        features2:{
            InOutPortResults :[],
        },
        Api:{           
            domainName : "http://desktop-cmkfk60/", // http://localhost:52579/
            projectName:"FACOA/",
            TestUrl:'http://localhost:52579/',
            shipDataUrl:"https://demo.datarget.com.tw/AIS_API/fishing_boats/",
        },
        calHtml: null,
        calCount : 0,
    },
    methods:{ //三個功能各自使用的方法區塊
        features1:{             
            getShipBasicData:function(){
                //API回傳 基本資料由此指定         
                var MMSI = "416003516"; //**測試資料 屆時替換
                
                var shipInfoPointHtml = "<h3>基本資料</h3><div class=\"data-group\">";
                axios.get(mapData.data.Api.shipDataUrl + MMSI)
                .then( function(response){
                    mapData.data.apiReturnData = response.data;
                    //console.log(response.data);
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>漁船編號</h4><p><span>"+mapData.data.apiReturnData.ShipCTNumber+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>漁船執照有效期限</h4><p><span>"+mapData.data.apiReturnData.LicenseValidityPeriod+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>中文船名</h4><p><span>"+mapData.data.apiReturnData.ShipCname+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>漁船執照有效日期</h4><p><span>"+mapData.data.apiReturnData.LicenseValidityDate+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>英文船名</h4><p><span>"+mapData.data.apiReturnData.ShipEname+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>漁船別</h4><p><span>"+mapData.data.apiReturnData.ShipType+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>漁業人中文姓名</h4><p><span>"+mapData.data.apiReturnData.ShipOwner+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>船員人數</h4><p><span>"+mapData.data.apiReturnData.ShipCrewNum+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>身分證字號</h4><p><span>"+mapData.data.apiReturnData.ShipOwnerID+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>船員定額</h4><p><span>"+mapData.data.apiReturnData.ShipCrewQuota+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>電話(1)</h4><p><span>"+mapData.data.apiReturnData.ShipOwnerPhone+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>漁業根據地代號</h4><p><span>"+mapData.data.apiReturnData.BasedCode+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>漁業人地址</h4><p><span>"+mapData.data.apiReturnData.ShipOwnerAdd+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>起卸港(1)</h4><p><span>"+mapData.data.apiReturnData.LoadingPort1+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>公司名稱</h4><p><span>"+mapData.data.apiReturnData.ShipCompany+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>起卸港(2)</h4><p><span>"+mapData.data.apiReturnData.LoadingPort2+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>公司地址</h4><p><span>"+mapData.data.apiReturnData.ShipCompanyAdd+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>所屬漁會</h4><p><span>"+mapData.data.apiReturnData.ShipFisherClub+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>傳真號碼</h4><p><span>"+mapData.data.apiReturnData.FaxNumber+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>設籍縣市</h4><p><span>"+mapData.data.apiReturnData.ShipCity+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>漁船狀態</h4><p><span>"+mapData.data.apiReturnData.Status+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>噸級別</h4><p><span>"+mapData.data.apiReturnData.ShipGrossTonLevel+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>船舶編號</h4><p><span>"+mapData.data.apiReturnData.ShipNumber+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>主漁業經營種類</h4><p><span>"+mapData.data.apiReturnData.MainFishingType+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>主管機關</h4><p><span>"+mapData.data.apiReturnData.CompetentAuthority+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>兼漁業經營種類(1)</h4><p><span>"+mapData.data.apiReturnData.OtherFishingType1+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>兼漁業經營種類(2)</h4><p><span>"+mapData.data.apiReturnData.OtherFishingType2+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>兼漁業經營種類(3)</h4><p><span>"+mapData.data.apiReturnData.OtherFishingType3+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>兼漁業經營種類(4)</h4><p><span>"+mapData.data.apiReturnData.OtherFishingType4+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>國際呼號</h4><p><span>"+mapData.data.apiReturnData.CallSign+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>通信設備種類(1)</h4><p><span>"+mapData.data.apiReturnData.DeviceType1+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>VMS編碼(1)</h4><p><span>"+mapData.data.apiReturnData.VmsNumber1+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>通信設備種類(2)</h4><p><span>"+mapData.data.apiReturnData.DeviceType2+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>VMS編碼(2)</h4><p><span>"+mapData.data.apiReturnData.VmsNumber2+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>船舶識別碼</h4><p><span>"+mapData.data.apiReturnData.MmsiNo+"</span></p></div>";
                    shipInfoPointHtml += "<div class=\"txt-group\"><h4>IMO識別碼</h4><p><span>"+mapData.data.apiReturnData.ImoNo+"</span></p></div></div>";
                    document.getElementById('shipInfoPoint').innerHTML = shipInfoPointHtml;  
                    mapData.methods.features1.getShipDetailData()                                                        
                })
                 .catch( function(error){

                 });                           
            },  
            getShipDetailData:function(){                            
                 //API回傳 船體資料由此指定
                 //8跟9 為ratio button  待API回來看資料內容
                 var shipTravelerPointHtml = "<h3>船體資料</h3><div class=\"data-group\">";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>總噸位</h4><p><span>"+mapData.data.apiReturnData.ShipGrossTon+"</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>通常航速</h4><p><span>"+mapData.data.apiReturnData.AvgSpeed+"</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>凈噸位</h4><p><span>"+mapData.data.apiReturnData.ShipNetTon+"</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>最大航速</h4><p><span>"+mapData.data.apiReturnData.MaxSpeed+"</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>全長</h4><p><span>"+mapData.data.apiReturnData.ShipLenOA+"</span></p></div>";                
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>平均吃水</h4><p><span>"+mapData.data.apiReturnData.AvgDraft+"</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>法長</h4><p><span>"+mapData.data.apiReturnData.ShipLen+"</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>船長</h4><p><span>"+mapData.data.apiReturnData.ShipLenBP+"</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>載重噸位</h4><p><span>"+mapData.data.apiReturnData.ShipDwt+"</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>寬度</h4><p><span>"+mapData.data.apiReturnData.ShipBre+"</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>深度</h4><p><span>"+mapData.data.apiReturnData.ShipDep+"</span></p></div></div>";               
              
                 document.getElementById('shipTravelerPoint').innerHTML = shipTravelerPointHtml;  
                 mapData.methods.features1.getShipInOutPointData();          
            },               
            getShipInOutPointData : function(){ //賦予進出港資訊          
            var data = {CTNumber : mapData.data.apiReturnData.ShipCTNumber};  //API三個參數由此替換
            axios.post(
                mapData.data.Api.domainName + mapData.data.Api.projectName + "api/FACOA/GetEventsData", 
                //mapData.data.Api.TestUrl + "api/FACOA/GetEventsData",
            {
                "CTNumber": data.CTNumber,           
                "SearchType" : 1          
            }).then(function (response) {
                var results = response.data;

                var shipInOutPointHtml =  '<h3>進出港資訊</h3><div class=\"data-group\">';
                shipInOutPointHtml += '<ul class="list">';
               
               shipInOutPointHtml += '<li class="title">';
               shipInOutPointHtml += '<div class="group-box-100">';
               shipInOutPointHtml += '<div class="box-8 txt-c">序號</div>';
               shipInOutPointHtml += '<div class="box-25">漁船統一編號</div>';
               shipInOutPointHtml += '<div class="box-15">發生日期</div>';
               shipInOutPointHtml += '<div class="box-15">發生時間 </div>'
               shipInOutPointHtml += '<div class="box-15">港口代碼</div>'
               shipInOutPointHtml += '<div class="box-15">事件</div>';
               shipInOutPointHtml += '</div>';
               shipInOutPointHtml += '</li>';

                if(results.Status === 1){
                    if(results.Data.length > 0){
                        for(var i=0; i < results.Data.length; i++ ){
                            //查完的資料在這跑for loop
            shipInOutPointHtml += '<li>';
            shipInOutPointHtml += '<div class="group-box-100">';
            shipInOutPointHtml += "<div class=\"box-8 txt-c\">"+(i+1).toString()+"</div>";
            shipInOutPointHtml += "<div class=\"box-25\">"+results.Data[i].CTNo +"</div>";
            shipInOutPointHtml += "<div class=\"box-15\">"+results.Data[i].TimeStempDate +"</div>";
            shipInOutPointHtml += "<div class=\"box-15\">"+results.Data[i].TimeStempTime +"</div>";
            shipInOutPointHtml += "<div class=\"box-15\">"+results.Data[i].ZoneName+"</div>";
            shipInOutPointHtml += "<div class=\"box-15\">"+results.Data[i].ConditionID1Str +"</div>";
            shipInOutPointHtml += '</div>';
            shipInOutPointHtml += '</li>';
                        }
                    }else{
                        alert("無進出港資訊!!");
                    }
                    shipInOutPointHtml += '</ul></div>';
                    document.getElementById('shipInOutPoint').innerHTML = shipInOutPointHtml;  
                }else{
                    alert("發生錯誤!!");
                    console.log(results.ErrorMessage);   
                }             
            }).catch(function (error) {
                console.log(error);                 
            });
                                         
            },
        },
        features2:{
            searchInOutPortData:function(){
                var searchConditionObj = {
                    CTNumber : document.getElementById('ctName').value
                    ,ZoneName : document.getElementById('FishingPort').value
                    ,DateS: document.getElementById('dateStart').value
                    ,DateE: document.getElementById('dateEnd').value
                    ,SearchType : 2
                };
                
                //console.log(searchConditionObj);
                axios.post(
                    mapData.data.Api.domainName + mapData.data.Api.projectName + "api/FACOA/GetEventsData",
                    //mapData.data.Api.TestUrl + "api/FACOA/GetEventsData",
                {
                    "CTNumber": searchConditionObj.CTNumber, 
                    "DateS" : searchConditionObj.DateS + " 00:00:00",
                    "DateE" : searchConditionObj.DateE + " 23:59:59",
                    "SearchType" : searchConditionObj.SearchType       
                }).then(function (response) {
                    var results = response.data;
                    var shipInOutPointHtml =  '<h3>進出港資訊</h3>';
                    shipInOutPointHtml += '<ul class="list">';
                   
                   shipInOutPointHtml += '<li class="title">';
                   shipInOutPointHtml += '<div class="group-box-100">';
                   shipInOutPointHtml += '<div class="box-8 txt-c">序號</div>';
                   shipInOutPointHtml += '<div class="box-25">漁船統一編號</div>';
                   shipInOutPointHtml += '<div class="box-15">發生日期</div>';
                   shipInOutPointHtml += '<div class="box-15">發生時間 </div>'
                   shipInOutPointHtml += '<div class="box-15">港口代碼</div>'
                   shipInOutPointHtml += '<div class="box-15">事件</div>';
                   shipInOutPointHtml += '</div>';
                   shipInOutPointHtml += '</li>';
                          //console.log(results);
                          //儲存搜尋結果
                    mapData.data.features2.InOutPortResults = (results.Status === 1 && results.Data.length > 0) ? results.Data : [];
                    if(results.Status === 1){
                        if(results.Data.length > 0){
                            for(var i=0; i < results.Data.length; i++ ){
                                //查完的資料在這跑for loop
                shipInOutPointHtml += '<li>';
                shipInOutPointHtml += '<div class="group-box-100">';
                shipInOutPointHtml += "<div class=\"box-8 txt-c\">"+(i+1).toString()+"</div>";
                shipInOutPointHtml += "<div class=\"box-25\">"+results.Data[i].CTNumber +"</div>";
                shipInOutPointHtml += "<div class=\"box-15\">"+results.Data[i].TimeStempDate +"</div>";
                shipInOutPointHtml += "<div class=\"box-15\">"+results.Data[i].TimeStempTime +"</div>";
                shipInOutPointHtml += "<div class=\"box-15\">"+results.Data[i].ZoneName+"</div>";
                shipInOutPointHtml += "<div class=\"box-15\">"+results.Data[i].ConditionID1Str +"</div>";
                shipInOutPointHtml += '</div>';
                shipInOutPointHtml += '</li>';
                            }                          
                        }else{
                            alert("無進出港資訊!!");
                        }
                        shipInOutPointHtml += '</ul>';
                        //有查到資料才有匯出報表按鈕
                        if(results.Status === 1 && results.Data.length > 0){
                            shipInOutPointHtml += "<div class=\"btn-group\">";
                            shipInOutPointHtml += "<div></div>";
                            shipInOutPointHtml += "<div class=\"right-bt\">";
                            shipInOutPointHtml += "<div class=\"btn btn-submit\" onclick=\"mapData.methods.features2.exportCSV();\">匯出報表</div>";
                            shipInOutPointHtml += "</div>";
                            shipInOutPointHtml += "</div>";
                        }
                        document.getElementById('in-out-result').innerHTML = shipInOutPointHtml;  
                    }else{
                        alert("發生錯誤!!");
                        console.log(results.ErrorMessage);   
                    }             
                }).catch(function (error) {
                    console.log(error);                 
                });
            },
            exportCSV:function(){
                //console.log(mapData.data.features2.InOutPortResults);
                var csvHead = "序號,漁船統一編號,發生日期,發生時間,港口代碼,事件";
                var csvContent = "data:text/csv;charset=utf-8,\uFEFF";
                csvContent += csvHead + "\r\n";
                if(mapData.data.features2.InOutPortResults.length > 0 ){
                    for(var k = 0; k < mapData.data.features2.InOutPortResults.length; k++){
                        var tempStr = (k+1).toString() + ",";
                        tempStr += mapData.data.features2.InOutPortResults[k].CTNumber.toString() + ",";
                        tempStr += mapData.data.features2.InOutPortResults[k].TimeStempDate.toString() + ",";
                        tempStr += mapData.data.features2.InOutPortResults[k].TimeStempTime.toString() + ",";
                        tempStr += mapData.data.features2.InOutPortResults[k].ZoneName.toString() + ",";
                        tempStr += mapData.data.features2.InOutPortResults[k].ConditionID1Str.toString() + ",";
                        csvContent += tempStr + "\r\n";
                    }
                    //console.log(csvContent);        
                    var encodedUri = encodeURI(csvContent);
                    var link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "進出港查詢結果.csv");
                    document.body.appendChild(link); // Required for FF

                    link.click(); // This will download the data file named "my_data.csv".
                    link.remove();
                }else{
                    alert("無查詢結果");
                }
            },
        },
        features3:{
            queryBufferShipCount:function(){

            if(document.getElementById('seaMile').value === ""){
                alert('請輸入半徑(單位:海哩)');
                return;
            }  
            //console.log(mapMain.queryShipOBj.radius);
            if(mapMain.data.queryShipOBj.radius <= 0){
                alert('請點擊欲查詢範圍');
                return;
            } 

            if(isNaN(document.getElementById('seaMile').value)){
                alert('請輸入數字');
                return;
            }         

            if((parseFloat(document.getElementById('seaMile').value) * 1852) !== mapMain.data.queryShipOBj.radius){
                alert("輸入半徑與地圖半徑不符，請重新輸入");
                return;
            }

            //3857 --> 4326
            var coords_4326Arr = ol.proj.transform(mapMain.data.queryShipOBj.circleCenter_3857,"EPSG:3857","EPSG:4326");
            //4326 -->3826(WGS84經緯度轉TWD97 TM2)
            var coords_3826Arr = proj4(EPSG4326, EPSG3826, coords_4326Arr); 

                 //製作3826矩形
           var Rectangle_3826 = {
            maxX:coords_3826Arr[0] + mapMain.data.queryShipOBj.radius,        
            maxY:coords_3826Arr[1] + mapMain.data.queryShipOBj.radius,
            minX:coords_3826Arr[0] - mapMain.data.queryShipOBj.radius,
            minY:coords_3826Arr[1] - mapMain.data.queryShipOBj.radius
           }; 
           
           var Max4326Arr = proj4(EPSG3826, EPSG4326, [Rectangle_3826.maxX, Rectangle_3826.maxY]);
           //console.log(a);
           var Min4326Arr = proj4(EPSG3826, EPSG4326, [Rectangle_3826.minX, Rectangle_3826.minY]);
           //console.log(b);
           //製作4326矩形
           var bufferRectangle_4326 = {
            MaxLonX:Max4326Arr[0],
            MaxLatY:Max4326Arr[1],
            MinLonX:Min4326Arr[0],        
            MinLatY:Min4326Arr[1]
           };

           //正式資料
           var data = {
            BufferRectangle : bufferRectangle_4326,
            BufferCenter: {
                CenterLon:coords_4326Arr[0],
                CenterLat:coords_4326Arr[1]
            },
            radius: mapMain.data.queryShipOBj.radius,  //公尺
            FilterID : 163  //**屆時接下拉式選單的value值
           };
                     
                //測試資料
                // var data = {
                //     BufferRectangle:{
                //         MaxLonX:120.7110,
                //         MaxLatY:22.7100,
                //         MinLonX:120.4012,
                //         MinLatY:22.40071
                //     },
                //     BufferCenter :{
                //         CenterLon:120.4353583,
                //         CenterLat:22.47209833
                //     },
                //     radius: 1852,  //公尺
                //     FilterID : 1
                // };

                mapData.data.calCount = 0;
                mapData.data.calHtml = setInterval(function(){
                 if( mapData.data.calCount % 5 === 0){
                   document.getElementsByClassName('input-ui-res')[0].innerHTML = "計算中.";
                 }else if( mapData.data.calCount % 5 === 1){
                   document.getElementsByClassName('input-ui-res')[0].innerHTML = "計算中..";
                 }else if( mapData.data.calCount % 5 === 2){
                   document.getElementsByClassName('input-ui-res')[0].innerHTML = "計算中...";
                 }else if( mapData.data.calCount % 5 === 3){
                   document.getElementsByClassName('input-ui-res')[0].innerHTML = "計算中...";
                 }else if( mapData.data.calCount % 5 === 4){
                   document.getElementsByClassName('input-ui-res')[0].innerHTML = "計算中...";
                 }
                 mapData.data.calCount++;
                }, 300);
              
            axios.post(
                mapData.data.Api.domainName + mapData.data.Api.projectName + "api/FACOA/GetShipCountData",
                //mapData.data.Api.TestUrl + "api/FACOA/GetShipCountData",
             {
                "BufferRectangle": data.BufferRectangle, 
                "BufferCenter" : data.BufferCenter,
                "radius" : data.radius,
                "FilterID" : data.FilterID         
            }).then(function (response) {
                var results = response.data;               
                console.log(results);
                  //恢復查詢初始狀態
                mapData.data.calCount = 0;
                if(mapData.data.calHtml){
                 clearInterval(mapData.data.calHtml);
                }
                if(results.Status === 1){
                    document.getElementsByClassName('input-ui-res')[0].innerHTML = "查詢結果： <i>"+results.Data+"</i> 艘";             
                }else{
                    alert("發生錯誤!!");
                    document.getElementsByClassName('input-ui-res')[0].innerHTML = "查詢結果：<i>" + results.ErrorMessage +"</i>";   
                }             
            }).catch(function (error) {
                console.log(error);                 
            });

          }
        },
    }
};
