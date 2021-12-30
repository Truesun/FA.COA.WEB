var mapData = {
    data:{  //三個功能各自使用的資料區塊
        features1:{
            shipDetailData:{
                basic:{ //基本資料      

                },
                ship:{  //船體資料

                },
                in_outPort:{  //進出港資訊

                }
            },
        }
    },
    methods:{ //三個功能各自使用的方法區塊
        features1:{
            clearShipDetailData:function(){
            //    var spanNameArr = document.getElementsByName('ship-basic'); 

            //    for(var i=0; i < spanNameArr.length; i++){
            //     spanNameArr[i].textContent = '';
            //    }          
            // document.getElementById('shipInfoPoint').textContent = "";   
            // document.getElementById('shipInfoPoint').innerHTML = "<h3>基本資料</h3>";       
            },   
            getShipBasicData:function(){
                //API回傳 基本資料由此指定
                // document.getElementById('ship-basic1').textContent = '船舶號數船舶號數'; //船舶號數船舶號數
                // document.getElementById('ship-basic2').textContent = '中文船名'; //中文船名
                // document.getElementById('ship-basic3').textContent = '英文船名'; //英文船名
                // document.getElementById('ship-basic4').textContent = '所有人名稱'; //所有人名稱
                // document.getElementById('ship-basic5').textContent = '所有人英文名'; //所有人英文名
                // document.getElementById('ship-basic6').textContent = '船舶營運人'; //船舶營運人
                // document.getElementById('ship-basic7').textContent = '船籍港'; //船籍港
                // document.getElementById('ship-basic8').textContent = '船舶種類'; //船舶種類
                // document.getElementById('ship-basic9').textContent = '船舶等級'; //船舶等級
                // document.getElementById('ship-basic10').textContent = '試航水域'; //試航水域
                // document.getElementById('ship-basic11').textContent = '電台呼號'; //電台呼號
                // document.getElementById('ship-basic12').textContent = '水上行動業務識別'; //水上行動業務識別
                // document.getElementById('ship-basic13').textContent = '船員定額'; //船員定額
                // document.getElementById('ship-basic14').textContent = '乘客定額'; //乘客定額
                // document.getElementById('ship-basic15').textContent = '特種人員定額'; //特種人員定額
                // document.getElementById('ship-basic16').textContent = '航線'; //航線
                // document.getElementById('ship-basic17').textContent = '下水日期'; //下水日期
                // document.getElementById('ship-basic18').textContent = 'CR編號'; //CR編號
                // document.getElementById('ship-basic19').textContent = 'CT編號'; //CT編號
                // document.getElementById('ship-basic20').textContent = 'IMO編號'; //IMO編號
                // document.getElementById('ship-basic21').textContent = '所屬漁會'; //所屬漁會
                // document.getElementById('ship-basic22').textContent = '停泊地'; //停泊地
                // document.getElementById('ship-basic23').textContent = '最近特檢日期'; //最近特檢日期
                // document.getElementById('ship-basic24').textContent = '漁業執照字號'; //漁業執照字號
                // document.getElementById('ship-basic25').textContent = '字第 號'; //字第 號
                // document.getElementById('ship-basic26').textContent = '漁業執照有效日'; //漁業執照有效日
                var shipInfoPointHtml = "<h3>基本資料</h3>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>船舶號數船舶號數</h4><p><span>013647</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>中文船名</h4><p><span>大益</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>英文船名</h4><p><span>TA YIH</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>所有人名稱</h4><p><span>大吉航運股份有限公司</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>所有人英文名</h4><p><span></span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>船舶營運人</h4><p><span></span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>船籍港</h4><p><span>(KH)高雄港</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>船舶種類</h4><p><span>B41 (B41雜貨船)</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>船舶等級</h4><p><span>(09)航行外海航線之非客船</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>試航水域</h4><p><span>(08)外海</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>電台呼號</h4><p><span>BR3148</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>水上行動業務識別</h4><p><span>416000025</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>船員定額</h4><p><span>13</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>乘客定額</h4><p><span>0</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>特種人員定額</h4><p><span></span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>航線</h4><p><span>K6 K6</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>下水日期</h4><p><span>078/01/01</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>CR編號</h4><p><span></span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>CT編號</h4><p><span>CT</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>IMO編號</h4><p><span></span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>所屬漁會</h4><p><span></span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>停泊地</h4><p><span></span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>最近特檢日期</h4><p><span>106/05/03</span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>漁業執照字號</h4><p><span></span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>字第 號</h4><p><span></span></p></div>";
                shipInfoPointHtml += "<div class=\"txt-group\"><h4>漁業執照有效日</h4><p><span></span></p></div>";
                document.getElementById('shipInfoPoint').innerHTML = shipInfoPointHtml;       
            },  
            getShipDetailData:function(){
                 //API回傳 船體資料由此指定
                //  document.getElementById('ship-detail1').textContent = 'HullNo'; //HullNo
                //  document.getElementById('ship-detail2').textContent = '建造廠名(中)'; //建造廠名(中)
                //  document.getElementById('ship-detail3').textContent = '建造廠名(英)'; //建造廠名(英)
                //  document.getElementById('ship-detail4').textContent = '建造地點(中)'; //建造地點(中)
                //  document.getElementById('ship-detail5').textContent = '建造地點(英)'; //建造地點(英)
                //  document.getElementById('ship-detail6').textContent = '建造廠名補充說'; //建造廠名補充說
                //  document.getElementById('ship-detail7').textContent = '建造完成年月'; //建造完成年月         
                //  document.getElementById('ship-detail10').textContent = '船型'; //船型
                //  document.getElementById('ship-detail11').textContent = '總噸位'; //總噸位
                //  document.getElementById('ship-detail12').textContent = '淨噸位'; //淨噸位
                //  document.getElementById('ship-detail13').textContent = '載重噸位'; //載重噸位
                //  document.getElementById('ship-detail14').textContent = '排水量'; //排水量
                //  document.getElementById('ship-detail15').textContent = '總長度'; //總長度
                //  document.getElementById('ship-detail16').textContent = '船長'; //船長
                //  document.getElementById('ship-detail17').textContent = '法長'; //法長
                //  document.getElementById('ship-detail18').textContent = '貨櫃量(TEU)'; //貨櫃量(TEU)
                //  document.getElementById('ship-detail19').textContent = '最大速率'; //最大速率
                //  document.getElementById('ship-detail20').textContent = '航行速率'; //航行速率
                 //8跟9 為ratio button  待API回來看資料內容
                 var shipTravelerPointHtml = "<h3>船體資料</h3>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>HullNo</h4><p><span></span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>建造廠名(中)</h4><p><span>其他</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>建造廠名(英)</h4><p><span></span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>建造地點(中)</h4><p><span>日本</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>建造地點(英)</h4><p><span></span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>建造廠名補充說</h4><p><span>藤新造船會社</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>建造完成年月</h4><p><span>07801</span> (YYYMM)</p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>新舊船別</h4><p><input type=\"radio\" name=\"shipNew\">新船<input type=\"radio\" name=\"shipNew\" >現成船</p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>船型</h4><p><span>(B+)乙型修加</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>總噸位</h4><p><span>982.00</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>淨噸位</h4><p><span>294.00</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>載重噸位</h4><p><span>1,059.000</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>排水量</h4><p><span>1,842.848</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>總長度</h4><p><span>59.40</span>M</p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>船長</h4><p><span>55.25</span>M</p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>法長</h4><p><span>55.00</span>M</p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>貨櫃量(TEU)</h4><p><span>0</span></p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>最大速率</h4><p><span>12.07</span>節</p></div>";
                 shipTravelerPointHtml += "<div class=\"txt-group\"><h4>航行速率</h4><p><span>11.00</span>節</p></div>";
                 document.getElementById('shipTravelerPoint').innerHTML = shipTravelerPointHtml;
            },               
            getShipInOutPointData : function(){ //賦予進出港資訊

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

            //查完的資料在這跑for loop
            shipInOutPointHtml += '<li>';
            shipInOutPointHtml += '<div class="group-box-100">';
            shipInOutPointHtml += '<div class="box-8 txt-c">1</div>';
            shipInOutPointHtml += '<div class="box-25">CT RPT3785 </div>';
            shipInOutPointHtml += '<div class="box-15">211105</div>';
            shipInOutPointHtml += '<div class="box-15">20:32:44</div>'
            shipInOutPointHtml += '<div class="box-15">43B2</div>'
            shipInOutPointHtml += '<div class="box-15">出港</div>';
            shipInOutPointHtml += '</div>';
            shipInOutPointHtml += '</li>';
                
            shipInOutPointHtml += '</ul>';
              document.getElementById('shipInOutPoint').innerHTML = shipInOutPointHtml;       
            },
        },
    }
};

//mapData.methods.features1.clearShipDetailData();
mapData.methods.features1.getShipBasicData();
mapData.methods.features1.getShipDetailData();
mapData.methods.features1.getShipInOutPointData();