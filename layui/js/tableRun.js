
//进行表格的读取
getFacOrderEd1();
getFacOrderEd2();
getFacOrderWait2();
getFacOrderWait1();
getFacOrderIng1();
getFacOrderIng2();

//进行历史数据（出）的绑定
function getFacOrderEd1(){
    layui.use('table',function () {
        var table = layui.table;
        table.render({
            elem:'#orderEd1'
            ,url:'http://localhost:8081/getFacOrderEd1'
            ,title:"历史订单（出）"
            ,where:{fac_id:fac_id}
            ,page: true //开启分页
            ,method:'post'
            ,initSort: {field:'order_startdate', type:'desc'}
            ,parseData:function (res) {
                return {
                    "code":0
                    ,"msg":""
                    ,"count":res.length
                    ,"data": res //解析数据列表
                };
            }
            ,cols:[[
                {field:'ffName',title:'卖家工厂'},
                {field:'ftName',title:'买家工厂'},
                {field:'order_startdate',title:'开始时间',sort:true,templet:function (d) {
                        return d.factoryOrder.order_startdate;
                    }},
                {field:'',title:'结束时间',sort:true,templet:function (d) {
                        return d.factoryOrder.order_enddate;
                    }},
                {field:'',title:'目标车辆数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_targetcarnum;
                    }},
                {field:'',title:'实际车辆数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_actualcarnum;
                    }},
                {field:'',title:'目标吨数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_targetweight
                    }},
                {field:'',title:'实际吨数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_actualweight;
                    }},
                {field:'',title:'煤炭种类',sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodclass;
                    }},
                {field:'',title:'煤炭运费',sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodprice;
                    }},
                {field:'',title:"详情",templet:function (d) {
                        let fac_orderId = d.factoryOrder.id;
                        return "<button class='layui-btn' onclick='seeFacorderEd("+fac_orderId+")' >查看详情</button>"
                    }}
            ]]
            ,done:function (res, curr, count) {
                console.log("进行历史数据（出）完成");
            }
        });

    });
}

//进行历史数据（入）的绑定
function getFacOrderEd2(){
    layui.use('table',function () {
        var table = layui.table;
        table.render({
            elem:'#orderEd2'
            ,url:'http://localhost:8081/getFacOrderEd2'
            ,title:"历史订单（出）"
            ,page: true //开启分页
            ,where:{fac_id:fac_id}
            ,method:'post'
            ,initSort: {field:'order_startdate', type:'desc'}
            ,parseData:function (res) {
                return {
                    "code":0
                    ,"msg":""
                    ,"count":res.length
                    ,"data": res //解析数据列表
                };
            }
            ,cols:[[
                {field:'ffName',title:'卖家工厂'},
                {field:'ftName',title:'买家工厂'},
                {field:'order_startdate',title:'开始时间',sort:true,templet:function (d) {
                        return d.factoryOrder.order_startdate;
                    }},
                {field:'',title:'结束时间',sort:true,templet:function (d) {
                        return d.factoryOrder.order_enddate;
                    }},
                {field:'',title:'目标车辆数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_targetcarnum;
                    }},
                {field:'',title:'实际车辆数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_actualcarnum;
                    }},
                {field:'',title:'目标吨数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_targetweight
                    }},
                {field:'',title:'实际吨数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_actualweight;
                    }},
                {field:'',title:'煤炭种类',sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodclass;
                    }},
                {field:'',title:'煤炭运费',sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodprice;
                    }},
                {field:'',title:"详情",templet:function (d) {
                        let fac_orderId = d.factoryOrder.id;
                        return "<button class='layui-btn' onclick='seeFacorderEd("+fac_orderId+")' >查看详情</button>";
                    }}
            ]]
            ,done:function (res, curr, count) {
                console.log("进行历史数据（入）完成");
            }
        });

    });
}

//待接受订单（入）的绑定
function getFacOrderWait2(){
    layui.use('table',function () {
        var table = layui.table;
        table.render({
            elem:'#orderWait2'
            ,url:'http://localhost:8081/getFacOrderWait2'
            ,title:"接收订单（入）"
            ,where:{fac_id:fac_id}
            ,page: true //开启分页
            ,method:'post'
            ,initSort: {field:'order_startdate', type:'desc'}
            ,parseData:function (res) {
                return {
                    "code":0
                    ,"msg":""
                    ,"count":res.length
                    ,"data": res //解析数据列表
                };
            }
            ,cols:[[
                {field:'ffName',title:'卖家工厂',width:110},
                {field:'ftName',title:'买家工厂',width:110},
                {field:'order_startdate',title:'申请时间',width:180,sort:true,templet:function (d) {
                        return d.factoryOrder.order_startdate.slice(0,16);
                    }},
                {field:'',title:'目标车辆数',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_targetcarnum;
                    }},
                {field:'',title:'目标吨数',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_targetweight
                    }},
                {field:'',title:'煤炭种类',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodclass;
                    }},
                {field:'',title:'煤炭运费',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodprice;
                    }},
                {field:'',title:"是否接受",templet:function (d) {
                        var thisID = d.factoryOrder.id;

                        return "<button class='layui-btn layui-btn-normal' onclick='jieshou("+thisID+")'>接收订单</button>" +
                            "<button class='layui-btn layui-btn-danger' onclick='jujue("+thisID+")'>拒绝订单</button>"
                    }}
            ]]
            ,done:function (res, curr, count) {
                console.log("待接受订单（入）完成");
            }
        });

    });
}

//待接受订单（出）的绑定
function getFacOrderWait1(){
    layui.use('table',function () {
        var table = layui.table;
        table.render({
            elem:'#orderWait1'
            ,url:'http://localhost:8081/getFacOrderWait1'
            ,title:"接收订单（出）"
            ,where:{fac_id:fac_id}
            ,page: true //开启分页
            ,method:'post'
            ,initSort: {field:'order_startdate', type:'desc'}
            ,parseData:function (res) {
                return {
                    "code":0
                    ,"msg":""
                    ,"count":res.length
                    ,"data": res //解析数据列表
                };
            }
            ,cols:[[
                {field:'ffName',title:'卖家工厂',width:110},
                {field:'ftName',title:'买家工厂',width:110},
                {field:'order_startdate',title:'申请时间',width:180,sort:true,templet:function (d) {
                        return d.factoryOrder.order_startdate.slice(0,16);
                    }},
                {field:'',title:'目标车辆数',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_targetcarnum;
                    }},
                {field:'',title:'目标吨数',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_targetweight
                    }},
                {field:'',title:'煤炭种类',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodclass;
                    }},
                {field:'',title:'煤炭运费',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodprice;
                    }},
                {field:'',title:"是否接受",templet:function (d) {
                        var res = d.factoryOrder.order_state;
                        if (res == 2){
                            return '<p style="color: green">等待接收</p>'
                        }else {
                            var refuseReason = d.factoryOrder.order_refuseReason;
                            return "<p style='color: red'>拒绝原因："+refuseReason+"</p>";
                        }
                    }}
            ]]
            ,done:function (res, curr, count) {
                console.log("待接受订单（入）完成");
            }
        });

    });
}

//正在进行订单（出）的绑定
function getFacOrderIng1(){
    layui.use('table',function () {
        var table = layui.table;
        table.render({
            elem:'#orderIng1'
            ,url:'http://localhost:8081/getFacOrderIng1'
            ,title:"正在进行订单（出）"
            ,where:{fac_id:fac_id}
            ,method:'post'
            ,page: true //开启分页
            ,initSort: {field:'order_startdate', type:'desc'}
            ,parseData:function (res) {
                return {
                    "code":0
                    ,"msg":""
                    ,"count":res.length
                    ,"data": res //解析数据列表
                };
            }
            ,cols:[[
                {field:'ffName',title:'卖家工厂',width:110},
                {field:'ftName',title:'买家工厂',width:110},
                {field:'order_startdate',title:'申请时间',width:180,sort:true,templet:function (d) {
                        return d.factoryOrder.order_startdate.slice(0,16);
                    }},
                {field:'',title:'目标车辆数',sort:true,templet:function (d) {
                        return Number(d.factoryOrder.order_targetcarnum);
                    }},
                {field:'',title:'实际车辆数',sort:true,templet:function (d) {
                        return Number(d.factoryOrder.order_actualcarnum);
                    }},
                {field:'',title:'目标吨数',sort:true,templet:function (d) {
                        return Number(d.factoryOrder.order_targetweight);
                    }},
                {field:'',title:'实际吨数',sort:true,templet:function (d) {
                        return Number(d.factoryOrder.order_actualweight);
                    }},
                {field:'',title:'煤炭种类',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodclass;
                    }},
                {field:'',title:'煤炭运费',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodprice;
                    }},
                {field:'',title:"当前状态",templet:function (d) {
                        var res = d.factoryOrder.order_state;
                        if (res == 1){
                            return '<p style="color: green">接单中/进行中</p>'
                        }else {
                            return "<p style='color: blue'>接单完成/进行中</p>";
                        }
                    }},
                {field:'',title:"详情",templet:function (d) {
                        let fac_orderId = d.factoryOrder.id;
                        return "<button class='layui-btn' onclick='seeFacorderIng("+fac_orderId+",true)' >查看详情</button>"
                    }}
            ]]
            ,done:function (res, curr, count) {
                console.log("正在进行订单（出）完成");
            }
        });

    });
}

//正在进行订单（入）的绑定
function getFacOrderIng2(){
    layui.use('table',function () {
        var table = layui.table;
        table.render({
            elem:'#orderIng2'
            ,url:'http://localhost:8081/getFacOrderIng2'
            ,title:"正在进行订单（入）"
            ,where:{fac_id:fac_id}
            ,method:'post'
            ,page: true //开启分页
            ,initSort: {field:'order_startdate', type:'desc'}
            ,parseData:function (res) {
                return {
                    "code":0
                    ,"msg":""
                    ,"count":res.length
                    ,"data": res //解析数据列表
                };
            }
            ,cols:[[
                {field:'ffName',title:'卖家工厂',width:110},
                {field:'ftName',title:'买家工厂',width:110},
                {field:'order_startdate',title:'申请时间',width:180,sort:true,templet:function (d) {
                        return d.factoryOrder.order_startdate.slice(0,16);
                    }},
                {field:'',title:'目标车辆数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_targetcarnum;
                    }},
                {field:'',title:'实际车辆数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_actualcarnum;
                    }},
                {field:'',title:'目标吨数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_targetweight
                    }},
                {field:'',title:'实际吨数',sort:true,templet:function (d) {
                        return d.factoryOrder.order_actualweight;
                    }},
                {field:'',title:'煤炭种类',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodclass;
                    }},
                {field:'',title:'煤炭运费',width:120,sort:true,templet:function (d) {
                        return d.factoryOrder.order_goodprice;
                    }},
                {field:'',title:"当前状态",templet:function (d) {
                        var res = d.factoryOrder.order_state;
                        if (res == 1){
                            return '<p style="color: green">接单中/进行中</p>'
                        }else {
                            return "<p style='color: blue'>接单完成/进行中</p>";
                        }
                    }},
                {field:'',title:"详情",templet:function (d) {
                        let fac_orderId = d.factoryOrder.id;
                        return "<button class='layui-btn' onclick='seeFacorderIng("+fac_orderId+",false)' >查看详情</button>"
                    }}
            ]]
            ,done:function (res, curr, count) {
                console.log("正在进行订单（入）完成");
            }
        });

    });
}

/**
 * 跳转页面到订单详情页面
 * @param facOrderId
 */
function seeFacorderIng(facOrderId,ifff) {
    let param = {
        facOrderid:facOrderId,
        ifff:ifff
    };
    let url = creaturl('facOrderIng',param);
    console.log("跳转页面至:"+url);
    window.open(url);
}



/*
获得工厂名称
 */
function getFacName(fac_id) {
    $.ajax({
        url: "http://localhost:8081/getFacNameById",
        type: 'post',
        data: {
            'fac_id':fac_id,
        },
        success: function(data) {
            document.getElementById("ff_name").value = data;
        },
        error: function(error) {
            alert('"获得公厂名称信息出错，请稍后再试！');
        }
    });
}

/**
 * 跳转页面到订单详情页面
 * @param facOrderId
 */
function seeFacorderEd(facOrderId) {
    let param = {
        facOrderid:facOrderId,
    };
    let url = creaturl('facOrderEd',param);
    console.log("跳转页面至:"+url);
    window.open(url);
}

/**
 * 订单接受
 * @param fac_orderid 工厂订单id
 */
function jieshou(fac_orderid) {
    console.log("待接受订单点击接受: "+fac_orderid);
    $.ajax({
        url:"http://localhost:8081/facOrderJieshou",
        type:'post',
        data:{'fac_orderID':fac_orderid},
        beforeSend:function(){

        },
        success:function (data) {
            console.log(data);
            if (data == 1){
                layer.msg("订单接受成功!");
                //刷新待接受订单（入）
                getFacOrderWait2();
                //刷新正在进行中订单
                getFacOrderEd2();
            }else {
                layer.msg("订单接受失败!");
            }
        },
        error:function (error) {
            layer.msg('"订单接受出错，请稍后再试！');
        }
    });
}

/**
 * 订单拒绝
 * @param fac_orderid 工厂订单id
 */
function jujue(fac_orderid) {
    console.log("待接受订单点击拒绝: "+fac_orderid);
    let order_refuseReason = "";
    //进行confirm，编写拒绝理由
    layer.prompt({
        formType: 2,
        value: '请输入拒绝理由',
        title: '请输入值',
        area: ['800px', '350px'] //自定义文本域宽高
    }, function(value, index, elem){
        order_refuseReason = value; //得到value【拒绝理由】
        layer.close(index);
        $.ajax({
            url:"http://localhost:8081/facOrderJujue",
            type:'post',
            data:{
                'fac_orderID':fac_orderid,
                'order_refuseReason':order_refuseReason,
            },
            success:function (data) {
                console.log(data);
                if (data == 1){
                    layer.msg("订单拒绝成功!");
                    //刷新待接受订单（入）
                    getFacOrderWait2();
                }else {
                    layer.msg("订单拒绝失败!");
                }
            },
            error:function (error) {
                layer.msg('"订单拒绝出错，请稍后再试！');
            }
        });
    });
}

/**
 * 添加新的订单
 */
layui.use('element', function(){
    var element = layui.element;
    var form = layui.form
    var layer = layui.layer;


    //表单取值
    layui.$('#LAY-component-form-getval').on('click', function() {
        let data = form.val('orderNew');
        if (fac_id === data['ft_id']){
            layer.msg("出货入货工厂相同，请重新选择!");
        }else {


            layer.confirm('是否进行添加', {
                btn: ['Go', 'Back'], //按钮
                title: "已读确认"
            }, function() {
                //    开始确认操作
                data['ff_id'] = fac_id;
                alert(JSON.stringify(data));
                //调用ajax进行添加
                $.ajax({
                    url:"http://localhost:8081/addNewFacOrder",
                    type:'post',
                    data:data,
                    beforeSend:function(){

                    },
                    success:function (data) {
                        console.log(data);
                        if (data == 1){
                            layer.msg("添加新的订单申请成功!");
                        }else {
                            if (data === 2){
                                layer.msg("未绑定银行卡");
                            }else {
                                if (data === 3){
                                    layer.msg("银行卡余额不足");
                                }else {
                                    layer.msg("添加新的订单申请失败!");
                                }
                            }
                        }
                    },
                    error:function (error) {
                        layer.msg('"添加新的订单申请出错，请稍后再试！');
                    }
                });
            //    结束确认操作
            }, function() {
                layer.msg('点了吧！');
            });






        }
    //    else
    });

});



// ********************************************************页面跳转函数********************************************************

/***
 * 创建跳转路径
 * @param pageName 页面名称【pageName.heml】
 * @param pageParams 需要传的参数[json]
 */
function creaturl(pageName,pageParams) {
    pageName = pageName + ".html?";

    var params = "";

    paramKeys = Object.keys(pageParams);

    for (var i = 0; i < paramKeys.length; i++) {
        key = paramKeys[i];

        params = params + key + "=" +  pageParams[key];

        if(i<paramKeys.length-1){
            params = params + "&";
        }
    }

    return pageName+params;
}

/***
 * 从当前网页中获取传递过来的恶
 * @returns {{}}
 */
function paramsReady() {
    //获得传过来的login与在数据库中对应的表单
    var paras = location.search;			//search获得地址中的参数，内容为'?itemId=12'
    var result = paras.match(/[^\?&]*=[^&]*/g); 	//match是字符串中符合的字段一个一个取出来，result中的值为['login=xx','table=admin']
    console.log(result);
    paras = {};					//让paras变成没有内容的json对象
    for(i in result){

        var temp = result[i].split('=');	//split()将一个字符串分解成一个数组,两次遍历result中的值分别为['itemId','xx']
        paras[temp[0]] = temp[1];
    }
    return paras;
}





