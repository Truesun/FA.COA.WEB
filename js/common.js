$(function () {
    //控制siitech的iframe頁面縮放
    var res = false;
    $(".btn-unfold").on("click", function () {
        if (res === false) {
            window.top.iframeFull("Events");
            $(this).attr("alt", "See less").attr("title", "See less").find("img").attr("src", "./img/icon_unfold_small.svg");
            res = true;
        } else {
            window.top.iframeMinify("Events");
            $(this).attr("alt", "See more").attr("title", "See more").find("img").attr("src", "./img/icon_unfold_big.svg");
            res = false;
        }
    });


    //menu click
    // var btnMenu = document.querySelector('#menu');
    // var menuBox = document.querySelector('#menuBox');
    // btnMenu.addEventListener('click',function(){
    //     var btnAct = btnMenu.classList.toggle('on');
    //     if( btnAct ){
    //         btnMenu.classList.add('on');
    //         menuBox.classList.add('on');
    //     }else{
    //         btnMenu.classList.remove('on');
    //         menuBox.classList.remove('on');
    //     }
    // })

    //時間選擇器
    $('.datepicker-here').datepicker({
        language: "zh",
        position: "bottom right",
        //minView: 'months',
        //dateFormat: "yyyy/mm",
        autoClose: true
    });

    //進出港查詢判斷
    // const searchType = document.querySelectorAll('.radio-group input');
    // const searchCTName = document.querySelector('#ctNameUI');
    // const searchFish = document.querySelector('#FishingPortUI');
    // const searchStart = document.querySelector('#dateStartUI');
    // const searchEnd = document.querySelector('#dateEndUI');
    // for( let i = 0; i<searchType.length; i++){
    //     searchType[i].addEventListener('click',function(e){
    //         const thisItem = e.target.id;
    //         e.stopPropagation();
    //         console.log(thisItem)
    //         if( thisItem === 'type1'){
    //             searchCTName.style.display = "block";
    //             searchFish.style.display = "none";
    //             searchStart.style.display = "none";
    //             searchEnd.style.display = "none";
    //         }else if( thisItem === 'type2'){
    //             searchCTName.style.display = "none";
    //             searchFish.style.display = "block";
    //             searchStart.style.display = "none";
    //             searchEnd.style.display = "none";
    //         }else{
    //             searchCTName.style.display = "none";
    //             searchFish.style.display = "none";
    //             searchStart.style.display = "block";
    //             searchEnd.style.display = "block";
    //         }
    //     })
    // }

    //menet資料scroll to
    $('.tap-left-group div').each(function (index, item) {
        $(this).on('click', function () {
            var shipInfoPoint = $('#shipInfoPoint').position().top;
            var shipTravelerPoint = $('#shipTravelerPoint').position().top;
            var shipInOutPoint = $('#shipInOutPoint').position().top;
            $(".tap-left-group div").removeClass("act");
            $(this).addClass("act");
            var btnTarget = $(this).attr('id');
            if (btnTarget === "shipInfoPage") {
                $("#mtnetBox").stop().animate({ scrollTop: shipInfoPoint - 10 }, 500);
            } else if (btnTarget === "shipTravelerPage") {
                $("#mtnetBox").stop().animate({ scrollTop: shipTravelerPoint - 10 }, 500);
            } else if (btnTarget === "shipInOutPort") {
                $("#mtnetBox").stop().animate({ scrollTop: shipInOutPoint - 10 }, 500);
            }
        });
    });


    
    var coordinateType = 0;
    //dms = 度分秒
    //decimal = 十進位
    $("#btnChange").on("click", function () {
        //緯度在前，經度在後的採用（緯度, 經度），例：臺北市以此寫法為 25°2′N, 121°38′E。
        var lat = $("#latitude04").val(); //緯度 N
        var lon = $("#longitude04").val(); // 經度 E

        // var latDMS = transformDMS(lat, "lat");
        // var lonDMS = transformDMS(lon, "lon");


        // console.log(lonDMS); // 107°44′35″E
        // console.log(latDMS); // 29°14′17″N

        if (coordinateType === 0) {
            $(".dms").show();
            $(".decimal").hide();
            $(this).text("切換十進位");
            coordinateType = 1;
        } else {
            $(".dms").hide();
            $(".decimal").show();
            $(this).text("切換度分秒");
            coordinateType = 0;
        }
    });



    $("#btnAllCheck").on("click", function () {
        var allCheckVal = $("#allCheck").prop("checked");
        if (allCheckVal == true) {
            $(".ship-list-upload").find("input").prop("checked", true);
        } else {
            $(".ship-list-upload").find("input").prop("checked", false);
        }
    });

    var shipDetailPage = 0;
    $(".btn-unfold").on("click", function () {
        if (shipDetailPage == 0) {
            $(this).parent().parent().css({ width: "100%" });
            $(this).find("img").attr("src", "img/icon_unfold_small.svg");
            shipDetailPage = 1;
        } else {
            $(this).parent().parent().removeAttr("style");
            $(this).find("img").attr("src", "img/icon_unfold_big.svg");
            shipDetailPage = 0;
        }
    });

    $(".btn-close").on("click", function () {
        $(this).parent().parent().hide();
    });
    $("#btnShipDetail").on("click", function () {
        // $("#pageShipDetial").show();
    })

    $("#btnShipInfoOpen").on("click", function () {
        $(".side-position-box,.side-use").hide();
        if ($(this).find("input").prop("checked") === true) {
            $("#shipInfoBox").show();
        } else {
            $("#shipInfoBox").hide();
        }
    });
    $("#btnMpasOpen").on("click", function () {
        $(".side-position-box,.side-use").hide();
        if ($(this).find("input").prop("checked") === true) {
            $("#mapsBox").show();
        } else {
            $("#mapsBox").hide();
        }
    });
    $("#btnLayersOpen").on("click", function () {
        $(".side-position-box,.side-use").hide();
        if ($(this).find("input").prop("checked") === true) {
            $("#layersBox").show();
        } else {
            $("#layersBox").hide();
        }
    });
    $("#checkAll").on('click',function(){
        var allCheckVal = $("#checkAll").prop("checked");
        if (allCheckVal == true) {
            $(".layer-list-box").find("input").prop("checked", true);
        } else {
            $(".layer-list-box").find("input").prop("checked", false);
        }
    })

    $("#btnShipLatLonOpen").on("click", function () {
        $(".side-position-box,.side-use").hide();
        if ($(this).find("input").prop("checked") === true) {
            $("#shipLatLonBox").show();
        } else {
            $("#shipLatLonBox").hide();
        }
    });
    $("#btnLegendOpen").on("click", function () {
        $(".side-position-box,.side-use").hide();
        if ($(this).find("input").prop("checked") === true) {
            $("#legendBox").show();
        } else {
            $("#legendBox").hide();
        }
    });
    $("#btnShipEtaOpen").on("click", function () {
        $(".side-position-box,.side-use").hide();
        if ($(this).find("input").prop("checked") === true) {
            $("#shipEtaBox").show();
        } else {
            $("#shipEtaBox").hide();
        }
    });

    //測量半徑
    $("#btnRadiusOpen").on("click", function () {
        $(".side-position-box,.side-use").hide();
        if ($(this).find("input").prop("checked") === true) {
            $("#radiusBox").show();
        } else {
            $("#radiusBox").hide();
        }    
    });

    $("#btnGpsOpen").on("click", function () {
        $(".side-position-box,.side-use").hide();
        if ($(this).find("input").prop("checked") === true) {
            $("#gpsBox").show();
        } else {
            $("#gpsBox").hide();
        }
    });


    $("#btnShipList").on("click", function () {
        if ($(this).find("input").prop("checked") === true) {
            $("#pageShipList").show();
        } else {
            $("#pageShipList").hide();
        }
    });
    //開啟警戒範圍
    $("#btnPageZone").on("click", function () {
        if ($(this).find("input").prop("checked") === true) {
            $("#pageZone").show();
        } else {
            $("#pageZone").hide();
        }
    });
    //開啟filter
    $("#btnPageFilter").on("click", function () {
        if ($(this).find("input").prop("checked") === true) {
            $("#pageFilter").show();
        } else {
            $("#pageFilter").hide();
        }
    });
    $("#btnCctvOpen").on("click", function () {
        $(".side-position-box,.side-use").hide();
        if ($(this).find("input").prop("checked") === true) {
            $("#cctvPage").show();
        } else {
            $("#cctvPage").hide();
        }
    });

    $("#closeAlarmsEvents").on("click", function () {
        $("#pageAlarmsEvents").hide();
    });

    //開啟進出港查詢
    $("#btnPageInOutPort").on("click", function () {
        if ($(this).find("input").prop("checked") === true) {
            $("#pageInOutPort").show();
        } else {
            $("#pageInOutPort").hide();
        }
    });




});

function pageShipDetial(){
    var pageShipDetial = document.querySelector('#pageShipDetial');
    pageShipDetial.style.display= 'block';
}
