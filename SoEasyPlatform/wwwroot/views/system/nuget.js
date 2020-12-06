﻿var configs = {
    url: {
        Get: _root + "nuget/getnugetlist",
        Del: _root + "nuget/deletenuget",
        SaveSystem: _root + "nuget/savenuget",
        getNetVersion: _root +"system/getgoodnetversion"
    },
    text:
    {
        add: "添加Nuget",
        edit:"修改Nuget"
    },
    w: {
        w: 600,
        h:330
    }
};
divFrom.$Form({
    url: configs.url.Get,
    callback: function (msg) {
        msg.Data.Dblfunc = function () {
            btnEdit.click();
        };
        divGrid.$Grid(msg.Data);
    }
})
btnSearch.$Button({
    url: configs.url.Get,
    callback: function (msg) {
        msg.Data.Dblfunc = function () {
            btnEdit.click();
        };
        divGrid.$Grid(msg.Data);
    }
});

 
saveNetVersionName.$SelectTree({
    isMultiple: false,
    url: configs.url.getNetVersion,
    maxHeight: 180,
    rootIsSelect: false
})

btnReset.$Reset();


btnAdd.$Open("#divOpen", {
    title: configs.text.add,
    w: configs.w.w,
    h: configs.w.h,
    validate: function () {
        frmSave.$ClearControls();
        return true;
    },
    yes: function () {
        frmSave.$Form({
            url: configs.url.SaveSystem,
            callback: function (msg) {
                if (msg.IsKeyValuePair) {
                    $sugar.$Validate(msg.Data, "save");
                } else {
                    $sugar.$Validate("clear");
                    msg.Data.$Alert();
                    if (msg.IsSuccess) {
                        btnSearch.click();
                        $sugar.$CloseAll(divOpen.getAttribute("dataindex"));
                    }
                }
            }
        });
    },
    btn: ['添加', '关闭']
});

btnEdit.$Open("#divOpen", {
    title: configs.text.edit,
    w: configs.w.w,
    h: configs.w.h,
    validate: function () {
        var gridInfo = divGrid.$GridInfo();
        if (gridInfo.length == 0) {
            "请选择记录".$Alert();
            return false;
        } else {
            gridInfo = gridInfo[0];
            frmSave.$FillControls(gridInfo);
            return true;
        }
    },
    yes: function () {
        frmSave.$Form({
            url: configs.url.SaveSystem,
            callback: function (msg) {
                if (msg.IsKeyValuePair) {
                    $sugar.$Validate(msg.Data, "save");
                } else {
                    $sugar.$Validate("clear");
                    msg.Data.$Alert();
                    if (msg.IsSuccess) {
                        btnSearch.click();
                        $sugar.$CloseAll(divOpen.getAttribute("dataindex"));
                    }
                }
            }
        });
    },
    btn: ['保存', '关闭']
});


btnDel.$Confirm({
    title: "是否删除记录",
    ok: function () {
        var gridInfo = divGrid.$GridInfo();
        if (gridInfo.length > 0) {
            configs.url.Del.$Ajax({
                callback: function (msg) {
                    if (msg.IsSuccess) {
                        "删除成功".$Alert();
                        btnSearch.click();
                    }
                    else
                    {
                        msg.Data.$Alert();
                    }
                },
                data: { "model": JSON.stringify(gridInfo) }
            })
        } else {
            "请选择一条数据".$Alert();
        }
    }
})


 