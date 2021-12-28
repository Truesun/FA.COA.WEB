$(function () {
    //typeing
    labelToSrc('#tagCheckList', '#tagSrc', '#tagSrcBtn', '#tagSrcCleanBtn');
    // labelToSrc('#moreBookList', '#moreSrc', '#moreSrcBtn', '#moreSrcCleanBtn');
    tagToSrc('#tagArea1', '#tagList1', '#tagSrcInput', '#tagSrcBtn', '#tagSrcCleanBtn');
    //顯示隱藏 新增標籤按鈕
    $('.tag-add').on('click', function () {
        var $addBox = $(this).next('.tag-creat');
        var isShow = $addBox.is(':visible');
        isShow ? $addBox.hide() : $addBox.show();
    });
});
//========== 一般多選 Label 搜尋 ==========
//labelToSrc('最外層Box','輸入匡ID','收尋按鈕','清除按鈕')
function labelToSrc(listBox, srcInput, srcBtn, cleanBtn) {
    var $listBox = $(listBox);
    var $srcInput = $(srcInput);
    var $srcBtn = $(srcBtn);
    var $cleanBtn = $(cleanBtn);
    //搜尋放入資料
    labelSrc(listBox, srcInput);
    //搜尋
    $srcBtn.on('click', function () {
        srcLabel(listBox, srcInput);
    });
    //清除搜尋
    $cleanBtn.on('click', function () {
        $srcInput.val('');
        $listBox.find('label').show();
        $listBox.find('.no-data').hide();
    });
}
//搜尋
function srcLabel(listBox, srcInput) {
    var $listBox = $(listBox);
    var $srcInput = $(srcInput);

    var keyWord = $srcInput.val();
    $listBox.find('span').each(function (index, item) {
        var txt = $(this).text();
        if (txt.indexOf(keyWord) == -1) {
            $(this).parent().hide();
        }
    });
    var tagNum = $listBox.find('span:visible').length;
    tagNum ? $listBox.find('.no-data').hide() : $listBox.find('.no-data').show();
}
//收尋放入資料
function labelSrc(listBox, srcInput) {
    var $listBox = $(listBox);
    $listBox.append('<div class="no-data" style="display: none;">無此關鍵字</div>');
    var $srcInput = $(srcInput);
    //搜尋資料陣列
    var srcList = [];

    $listBox.find('span').each(function (index, item) {
        var txt = $(this).text();
        srcList.push(txt);
    });

    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    $srcInput.typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
        {
            name: 'srcList',
            limit: 99,//如果沒有設定，最多只會出現五筆
            source: substringMatcher(srcList)
        });
}

//========== Tag的新增 刪除 搜尋 ==========
//tagToSrc('最外層ID', '存放tag的ul ID', '搜尋匡ID', '搜尋按鈕ID', '清除搜尋按鈕ID');
function tagToSrc(tagArea, tagBox, srcInput, srcBtn, cleanBtn) {
    var $tagArea = $(tagArea);
    var $tagBox = $(tagBox);
    var $srcInput = $(srcInput);
    var $srcBtn = $(srcBtn);
    var $cleanBtn = $(cleanBtn);
    //搜尋放入資料
    tagSrc(tagBox, srcInput);
    //搜尋
    $srcBtn.on('click', function () {
        srcTag(tagBox, srcInput);
    });
    //清除搜尋
    $cleanBtn.on('click', function () {
        $srcInput.val('');
        $tagBox.find('.tag-name').parent().show();
        $tagBox.find('.no-data').hide();
    });
    //新增TAG
    $tagArea.find('[tagAddBtn]').on('click', function () {
        var $inputItem = $(this).parent().find('input');
        var addTxt = $inputItem.val();
        $tagArea.find('[tagList]').append('<li>' +
            '<div class="tag-name">' + addTxt + '</div>' +
            '<div class="tag-del" tagDel>' +
            '<i class="fad fa-times" title="刪除" alt="刪除"></i>' +
            '</div></li>');
        $inputItem.val('');
        //新增後需綁定刪除鍵
        removeTag(tagArea, tagBox, srcInput);
        //更新搜尋放入資料
        tagSrc(tagBox, srcInput);
    });
    //刪除TAG(綁定原本的)
    removeTag(tagArea, tagBox, srcInput);
}
//搜尋
function srcTag(tagBox, srcInput) {
    var $tagBox = $(tagBox);
    var $srcInput = $(srcInput);

    var keyWord = $srcInput.val();
    $tagBox.find('.tag-name').each(function (index, item) {
        var txt = $(this).text();
        if (txt.indexOf(keyWord) == -1) {
            $(this).parent().hide();
        }
    });
    var tagNum = $tagBox.find('.tag-name:visible').length;
    tagNum ? $tagBox.find('.no-data').hide() : $tagBox.find('.no-data').show();
}
//收尋放入資料，因為新增刪除會更新 所以放在外層
var tagSrcList;
//收尋放入資料
function tagSrc(tagBox, srcInput) {
    var $tagBox = $(tagBox);
    var listBoxNodata = $tagBox.find('.no-data').length;
    //沒有才加入，因為新增刪除都會執行到
    if (!listBoxNodata) {
        $tagBox.append('<li class="no-data" style="display: none;">無此關鍵字</li>');
    }
    var $srcInput = $(srcInput);
    //搜尋資料陣列
    tagSrcList = [];

    $tagBox.find('.tag-name').each(function (index, item) {
        var txt = $(this).text();
        tagSrcList.push(txt);
    });

    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });
            cb(matches);
        };
    };
    //因為要更新搜尋項目 所以要先摧毀在設定
    $srcInput.typeahead("destroy");

    $srcInput.typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
        {
            name: 'tagSrcList',
            limit: 99,//如果沒有設定，最多只會出現五筆
            source: substringMatcher(tagSrcList)
        });
}
//移除自己tag,因為牽涉新增刪除的陣列和綁定 需要另外在下重置
//removeTag(最外層AreaId,標籤ul的Id,搜尋Input的Id)
function removeTag(tagArea, tagBox, srcInput) {
    var $tagArea = $(tagArea);
    $tagArea.find('[tagDel]').on('click', function () {
        $(this).parent().remove();
        //更新搜尋放入資料
        tagSrc(tagBox, srcInput);
        // console.log(tagSrcList);
    });
}