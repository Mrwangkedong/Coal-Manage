/**
 * 全部司机信息获取
 */
function driverReady() {

    layui.use('table', function () {
        var table = layui.table;
        var layer = layui.layer;
        //方法级渲染
        table.render({
            elem: '#table_driver'
            , url: 'http://localhost:8081/getAllDriMsg'
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
                , {field: 'd_name', title: '司机姓名'}
                , {field: 'd_sex', title: '性别', sort: true}
                , {field: 'd_phonenum', title: '手机号码',event:'editPhoneNum'}
                , {field: 'd_password', title: '登录密码',event:'editPwd'}
                , {field: 'd_pay_password', title: '支付密码',event:'editPayPwd'}
                , {
                    field: 'd_ifqualified', title: '是否通过认证', sort: true,  templet: function (d) {
                        if (d.d_ifqualified === 1) {
                            return "通过";
                        } else {
                            return "不通过";
                        }
                    }
                }
                , {
                    field: 'd_ifbcard', title: '是否绑定银行卡', sort: true,  templet: function (d) {
                        if (d.d_ifbcard === 1) {
                            return "通过";
                        } else {
                            return "不通过";
                        }
                    }
                }
            ]]
        });


        table.on('tool(driverEvent)', function(obj){
            console.log(obj.data);
            var data = obj.data;
            //更改密码
            if (obj.event === 'editPwd'){
                // alert(1);
                editPwd(obj,data);
                // layer.msg("更改密码");
            }
            //更改手机号
            if (obj.event === 'editPhoneNum'){

                editPhoneNum(obj,data);
                // layer.msg("更改手机号")
            }
            //更改支付密码
            if (obj.event === 'editPayPwd'){
                editPayPwd(obj,data);
                // layer.msg("更改支付密码")
            }

        });


    });
}

/**
 * 表格重载
 */
function driverReLoad() {
    var $ = layui.$;
    var PhoneNum = $('#demoReload').val();

    if (PhoneNum === ""){
        driverReady();
        return;
    }

    layui.use('table', function () {
        var table = layui.table;
        var layer = layui.layer;
        table.render({
            elem: '#table_driver'
            , url: 'http://localhost:8081/getDriverMsg'
            , method: 'post'
            ,where:{d_id:PhoneNum}
            , parseData: function (res) {
                return {
                    "code": 0
                    , "msg": ""
                    , "count": res.length
                    , "data": {res} //解析数据列表
                };
            }
            , cols: [[
                {field: 'id', title: 'ID', sort: true, fixed: true}
                , {field: 'd_name', title: '司机姓名'}
                , {field: 'd_sex', title: '性别', sort: true}
                , {field: 'd_phonenum', title: '手机号码',event:"editPhoneNum"}
                , {field: 'd_password', title: '登录密码',event:"editPwd"}
                , {
                    field: 'd_ifqualified', title: '是否通过认证', sort: true, templet: function (d) {
                        if (d.d_ifqualified === 1) {
                            return "通过";
                        } else {
                            return "不通过";
                        }
                    }
                }
                , {
                    field: 'd_ifbcard', title: '是否绑定银行卡', sort: true, templet: function (d) {
                        if (d.d_ifbcard === 1) {
                            return "通过";
                        } else {
                            return "不通过";
                        }
                    }
                }
            ]]
        });

        table.on('tool(driverEvent)', function(obj){
            console.log(obj.data);
            var data = obj.data;
            //更改密码
            if (obj.event === 'editPwd'){
                editPwd(obj,data);
            }
            //更改手机号
            if (obj.event === 'editPhoneNum'){

                editPhoneNum(obj,data);
            }
            //更改支付密码
            if (obj.event === 'editPayPwd'){
                editPayPwd(obj,data);
            }

        });



    });

}

//修改司机密码
function editPwd(obj,data) {
    layer.prompt({
        formType:0
        ,title: '修改 姓名 为 ['+ data.d_name +'] 的用户密码'
        ,value: data.d_password
    }, function(value, index){
        if (value === data.d_password){
            alert("新旧密码一致，无需修改");
        }else {
            console.log("新的密码："+value);//新值
            console.log("用户id: "+data.id+"用户新密码："+value)
        }
        //关闭当前框
        layer.close(index);
        //这里一般是发送修改的Ajax请求
        $.ajax({
            url:"http://localhost:8081/editDriverPwb",
            type:'post',
            data:{
                d_id:data.id,  //员工id
                newPassword:value,
            },
            success:function (data) {
                console.log(data);
                if (data === 1){
                    layer.msg("更改成功!");
                    //同步更新表格和缓存对应的值
                    obj.update({
                        d_password: value
                    });
                }else {
                    layer.msg("更改失败!");
                }
            },
            error:function (error) {
                layer.msg('更改出错，请稍后再试！');
            }
        });

    });
}

/**
 * 更改司机手机号
 */
function editPhoneNum(obj, data) {
    layer.prompt({
        formType:0
        ,title: '修改 姓名 为 ['+ data.d_name +'] 的手机号码'
        ,value: data.d_phonenum
    }, function(value, index){
        if (value === data.d_phonenum){
            alert("新旧手机号一致，无需修改");
        }else {
            console.log("新的手机号："+value);//新值
            console.log("用户id: "+data.id+"用户新手机号："+value)
        }
        //关闭当前框
        layer.close(index);
        //这里一般是发送修改的Ajax请求
        $.ajax({
            url:"http://localhost:8081/editDriverPhoneNum",
            type:'post',
            data:{
                d_id:data.id,  //员工id
                newPhoneNum:value,
            },
            success:function (data) {
                console.log(data);
                if (data === 1){
                    layer.msg("更改成功!");
                    //同步更新表格和缓存对应的值
                    obj.update({
                        d_phonenum: value
                    });
                }else {
                    layer.msg("更改失败!");
                }
            },
            error:function (error) {
                layer.msg('更改出错，请稍后再试！');
            }
        });

    });
}


/**
 * 更改司机手机号
 */
function editPayPwd(obj, data) {
    layer.prompt({
        formType:0
        ,title: '修改 姓名 为 ['+ data.d_name +'] 的支付密码'
        ,value: data.d_pay_password
    }, function(value, index){
        if (value === data.d_pay_password){
            alert("新旧支付密码一致，无需修改");
        }else {
            console.log("新的支付密码："+value);//新值
            console.log("用户id: "+data.id+"用户新支付密码："+value)
        }
        //关闭当前框
        layer.close(index);
        //这里一般是发送修改的Ajax请求
        $.ajax({
            url:"http://localhost:8081/editDriverPayPwb",
            type:'post',
            data:{
                d_id:data.id,  //员工id
                newPayPwb:value,
            },
            success:function (data) {
                console.log(data);
                if (data === 1){
                    layer.msg("更改成功!");
                    //同步更新表格和缓存对应的值
                    obj.update({
                        d_pay_password: value
                    });
                }else {
                    layer.msg("更改失败!");
                }
            },
            error:function (error) {
                layer.msg('更改出错，请稍后再试！');
            }
        });

    });
}