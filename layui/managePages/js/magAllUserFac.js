/**
 * 全部司机信息获取
 */
function facReady() {

    layui.use('table', function () {
        var table = layui.table;
        var layer = layui.layer;
        //方法级渲染
        table.render({
            elem: '#table_factory'
            , url: 'http://localhost:8081/getAllFac'
            , page: true
            , height: 310
            , parseData: function (res) {
                return {
                    "code": 0
                    , "msg": ""
                    , "count": res.length
                    , "data": res //解析数据列表
                };
            }
            , cols: [[
                {field: 'id', title: 'ID',  sort: true, fixed: true}
                , {field: 'name', title: '工厂名称'}
                , {field: 'factory_address', title: '工厂地址', sort: true}
                , {field: 'factory_longitude',title: '经度'}
                , {field: 'factory_latitude',title: '纬度'}
                , {field: 'factory_lpname', title: '法人姓名'}
                , {field: 'factory_lpcardnum', title: '法人身份证号'}
                , {field: 'factory_licencephoto', title: '工厂营业执照',templet:function (d) {

                        return "<button class='layui-btn' onclick='seeLicence("+d.id+")'>点击查看营业执照照片</button>";

                    }}
                , {
                    field: 'factory_ifpass', title: '是否通过认证', sort: true,  templet: function (d) {
                        if (d.factory_ifpass === 1) {
                            return "通过";
                        } else {
                            return "不通过";
                        }
                    }
                }
            ]]
        });


        table.on('tool(facEvent)', function(obj){
            console.log(obj.data);
            var data = obj.data;
            //更改密码
            if (obj.event === 'editLpname'){
                // alert(1);
                editLpname(obj,data);
                // layer.msg("更改密码");
            }
            //更改手机号
            if (obj.event === 'editLpcardnum'){

                editLpcardnum(obj,data);
                // layer.msg("更改手机号")
            }

        });


    });
}

/**
 * 表格重载
 */
function facReLoad() {
    var $ = layui.$;
    var facID = $('#facReload').val();

    if (facID === ""){
        facReady();
        return;
    }

    layui.use('table', function () {
        var table = layui.table;
        var layer = layui.layer;
        table.render({
            elem: '#table_factory'
            , url: 'http://localhost:8081/getFacMsg'
            , method: 'post'
            ,where:{fac_id:facID}
            , parseData: function (res) {
                return {
                    "code": 0
                    , "msg": ""
                    , "count": res.length
                    , "data": {res} //解析数据列表
                };
            }
            , cols: [[
                {field: 'id', title: 'ID',  sort: true, fixed: true}
                , {field: 'name', title: '工厂名称'}
                , {field: 'factory_address', title: '工厂地址', sort: true}
                , {field: 'factory_longitude',title: '经度'}
                , {field: 'factory_latitude',title: '纬度'}
                , {field: 'factory_lpname', title: '法人姓名'}
                , {field: 'factory_lpcardnum', title: '法人身份证号'}
                , {field: 'factory_licencephoto', title: '工厂营业执照',templet:function (d) {
                      
                        return "<button class='layui-btn' onclick='seeLicence("+d.id+")'>点击查看营业执照照片</button>";
                    }}
                , {
                    field: 'factory_ifpass', title: '是否通过认证', sort: true,  templet: function (d) {
                        if (d.factory_ifpass === 1) {
                            return "通过";
                        } else {
                            return "不通过";
                        }
                    }
                }
            ]]
        });

        table.on('tool(facEvent)', function(obj){
            console.log(obj.data);
            var data = obj.data;
            //更改密码
            if (obj.event === 'editLpname'){
                editLpname(obj,data);
            }
            //更改手机号
            if (obj.event === 'editLpcardnum'){
                editLpcardnum(obj,data);
            }

        });



    });

}

/**
 * 更改工厂法人姓名
 * @param obj
 * @param data
 */
function editLpname(obj,data) {

}

/**
 * 更改工厂法人身份证号码
 */
function editLpcardnum(obj,data) {

}

function seeLicence(fac_id) {
    let url = "http://localhost:8081/static/facImg/lPcardPhoto1/"+fac_id+".png";
    console.log(url);
    $("#displayImg").attr("src", url);
    var height = $("#displayImg").height();//拿的图片原来宽高，建议自定义宽高
    var width = $("#displayImg").width();
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        area: [width + 'px', height + 'px'], //宽高
        content: "<img src=" + url + " />"
    });
}