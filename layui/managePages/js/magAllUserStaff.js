/**
 * 全部员工信息
 */
function staffReady() {
    layui.use('table', function () {
        var table = layui.table;
        var layer = layui.layer;
        //方法级渲染
        table.render({
            elem: '#table_staff'
            , url: 'http://localhost:8081/getAllStaffs'
            , page: true
            , parseData: function (res) {
                return {
                    "code": 0
                    , "msg": ""
                    , "count": res.length
                    , "data": res //解析数据列表
                };
            }
            ,cols:[[
                {field:"staff_name",title:"姓名",width:110},
                {field:"staff_sex",title:"性别",width:110},
                {field:"staff_phonenum",title:"手机号",width:130,event:'setPhoneNum'},
                {field:"staff_password",title:"密码",event:'setPwb'},
                {field:"factory_id",title:"所属工厂id"},
                {field:"staff_birthday",title:"出生日期",templet:function (d) {
                        return d.staff_birthday.slice(0,10);
                    },event:'setBirthDay'},
                {field:"staff_pcrdnumber",title:"身份证号码",event:'setPcardNum'},
                {field:"staff_class",title:"员工类别",event:'setStaffClass',templet:function (d) {
                        if (d.staff_class == 1){
                            return "管理人员";
                        }else {
                            if (d.staff_class == 2){
                                return "称重员";
                            }else {
                                return "化验员";
                            }
                        }
                    }},
                {field:"staff_place",title:"家庭住址",event: 'setAddress'},
                {field:"",title:"",templet:function (d) {
                        var staff_id = d.id;
                        return "<button class='layui-btn layui-btn-danger' type='button' onclick='deleteStaff("+staff_id+")'>删除</button>";
                    }}
            ]]
        });


        //监听单元格事件
        table.on('tool(staffEvent)', function(obj){
            var data = obj.data;
            //更改密码信息
            if(obj.event === 'setPwb'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的用户密码'
                    ,value: data.staff_password
                }, function(value, index){
                    if (value === data.staff_password){
                        alert("新旧密码一致，无需修改");
                    }else {
                        console.log("新的密码："+value);//新值
                        console.log(index);//第几次
                    }
                    //关闭当前框
                    layer.close(index);
                    //这里一般是发送修改的Ajax请求
                    $.ajax({
                        url:"http://localhost:8081/editStaffPwb",
                        type:'post',
                        data:{
                            staff_id:data.id,  //员工id
                            newPwb:value,
                        },
                        beforeSend:function(){
                            alert('即将发送数据...');
                        },
                        success:function (data) {
                            console.log(data);
                            if (data === 1){
                                layer.msg("更改成功!");
                                //同步更新表格和缓存对应的值
                                obj.update({
                                    staff_password: value
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

            //更改手机号码
            if (obj.event === 'setPhoneNum'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的手机号码'
                    ,value: data.staff_phonenum
                }, function(value, index){
                    if (value === data.staff_phonenum){
                        alert("新旧手机号码一致，无需修改");
                    }else {
                        console.log("新的手机号码址："+value);//新值
                        console.log(index);//第几次
                        //这里一般是发送修改的Ajax请求
                        $.ajax({
                            url:"http://localhost:8081/editStaffPhoneNum",
                            type:'post',
                            data:{
                                staff_id:data.id,  //员工id
                                newPhoneNum:value,
                            },
                            beforeSend:function(){

                            },
                            success:function (data) {
                                console.log(data);
                                if (data === 1){
                                    layer.msg("更改成功!");
                                    //同步更新表格和缓存对应的值
                                    obj.update({
                                        staff_phonenum: value
                                    });
                                }else {
                                    layer.msg("更改失败!");
                                }
                            },
                            error:function (error) {
                                layer.msg('更改出错，请稍后再试！');
                            }
                        });
                    }
                    layer.close(index);//关闭当前框


                });
            }

            //更改地址信息
            if(obj.event === 'setAddress'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的用户住址'
                    ,value: data.staff_place
                }, function(value, index){
                    if (value === data.staff_place){
                        alert("新旧住址一致，无需修改");
                    }else {
                        console.log("新的用户住址："+value);//新值
                        console.log(index);//第几次
                        //这里一般是发送修改的Ajax请求
                        $.ajax({
                            url:"http://localhost:8081/editStaffPlace",
                            type:'post',
                            data:{
                                staff_id:data.id,  //员工id
                                newPlace:value,
                            },
                            beforeSend:function(){

                            },
                            success:function (data) {
                                console.log(data);
                                if (data === 1){
                                    layer.msg("更改成功!");
                                    //同步更新表格和缓存对应的值
                                    obj.update({
                                        staff_place: value
                                    });
                                }else {
                                    layer.msg("更改失败!");
                                }
                            },
                            error:function (error) {
                                layer.msg('更改出错，请稍后再试！');
                            }
                        });
                    }
                    layer.close(index);//关闭当前框


                });
            }

            //修改身份证号码
            if(obj.event === 'setPcardNum'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的身份证号码'
                    ,value: data.staff_pcrdnumber
                }, function(value, index){
                    if (value === data.staff_pcrdnumber){
                        alert("新旧身份证号码一致，无需修改");
                    }else {
                        console.log("新的身份证号码："+value);//新值
                        console.log(index);//第几次
                        //这里一般是发送修改的Ajax请求
                        $.ajax({
                            url:"http://localhost:8081/editStaffPcardNum",
                            type:'post',
                            data:{
                                staff_id:data.id,  //员工id
                                newPcardNum:value,
                            },
                            beforeSend:function(){
                                alert('即将发送数据...');
                            },
                            success:function (data) {
                                console.log(data);
                                if (data === 1){
                                    layer.msg("更改成功!");
                                    //同步更新表格和缓存对应的值
                                    obj.update({
                                        staff_pcrdnumber: value
                                    });
                                }else {
                                    layer.msg("更改失败!");
                                }
                            },
                            error:function (error) {
                                layer.msg('更改出错，请稍后再试！');
                            }
                        });
                    }
                    layer.close(index);//关闭当前框


                });
            }

            //修改员工类别
            if(obj.event === 'setStaffClass'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的员工类别【1/管理员;2/称重员;3/化验员】'
                    ,value: data.staff_class
                }, function(value, index){
                    if (value === data.staff_class.toString()){
                        alert("新旧员工类别一致，无需修改");
                    }else {
                        console.log("新的员工类别："+value);//新值
                        console.log(index);//第几次
                        //这里一般是发送修改的Ajax请求
                        $.ajax({
                            url:"http://localhost:8081/editStaffStaffClass",
                            type:'post',
                            data:{
                                staff_id:data.id,  //员工id
                                newStaffClass:Number(value),
                            },
                            beforeSend:function(){
                                alert('即将发送数据...');
                            },
                            success:function (data) {
                                console.log(data);
                                if (data === 1){
                                    layer.msg("更改成功!");
                                    //同步更新表格和缓存对应的值
                                    obj.update({
                                        staff_class: value
                                    });
                                }else {
                                    layer.msg("更改失败!");
                                }
                            },
                            error:function (error) {
                                layer.msg('更改出错，请稍后再试！');
                            }
                        });
                    }
                    layer.close(index);//关闭当前框

                });
            }
            //修改出生日期
            if(obj.event === 'setBirthDay'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的出生日期【格式：yyyy-mm-dd】'
                    ,value: data.staff_birthday.slice(0,10)
                }, function(value, index){
                    if (value === data.staff_birthday.slice(0,10)){
                        alert("新旧出生日期一致，无需修改");
                    }else {
                        console.log("新的出生日期："+value);//新值
                        console.log(index);//第几次
                        //这里一般是发送修改的Ajax请求
                        $.ajax({
                            url:"http://localhost:8081/editStaffBirthDay",
                            type:'post',
                            data:{
                                staff_id:data.id,  //员工id
                                newBirthDay:value,
                            },
                            beforeSend:function(){

                            },
                            success:function (data) {
                                console.log(data);
                                if (data === 1){
                                    layer.msg("更改成功!");
                                    //同步更新表格和缓存对应的值
                                    obj.update({
                                        staff_birthday: value
                                    });
                                }else {
                                    layer.msg("更改失败!");
                                }
                            },
                            error:function (error) {
                                layer.msg('更改出错，请稍后再试！');
                            }
                        });
                    }
                    layer.close(index);//关闭当前框





                });
            }

        });


    });
}


function staffReLoad() {
    var $ = layui.$;
    var facID = $('#staffReload').val();

    if (facID === ""){
        staffReady();
        return;
    }



    layui.use('table',function () {
        var table = layui.table;
        var layer = layui.layer;
        table.render({
            elem: '#table_staff'
            ,url:'http://localhost:8081/getAllStaff'
            ,title:"工厂员工ALL"
            ,where:{fac_id:facID}
            ,method:'post'
            ,parseData:function (res) {
                return {
                    "code":0
                    ,"msg":""
                    ,"count":1000
                    ,"data": res //解析数据列表
                };
            }
            ,cols:[[
                {field:"staff_name",title:"姓名",width:110},
                {field:"staff_sex",title:"性别",width:110},
                {field:"staff_phonenum",title:"手机号",width:130,event:'setPhoneNum'},
                {field:"staff_password",title:"密码",event:'setPwb'},
                {field:"factory_id",title:"所属工厂id"},
                {field:"staff_birthday",title:"出生日期",templet:function (d) {
                        return d.staff_birthday.slice(0,10);
                    },event:'setBirthDay'},
                {field:"staff_pcrdnumber",title:"身份证号码",event:'setPcardNum'},
                {field:"staff_class",title:"员工类别",event:'setStaffClass',templet:function (d) {
                        if (d.staff_class == 1){
                            return "管理人员";
                        }else {
                            if (d.staff_class == 2){
                                return "称重员";
                            }else {
                                return "化验员";
                            }
                        }
                    }},
                {field:"staff_place",title:"家庭住址",event: 'setAddress'},
                {field:"",title:"",templet:function (d) {
                        var staff_id = d.id;
                        return "<button class='layui-btn layui-btn-danger' type='button' onclick='deleteStaff("+staff_id+")'>删除</button>";
                    }}
            ]]
        });

        //监听单元格事件
        table.on('tool(demoEvent)', function(obj){
            var data = obj.data;
            //更改密码信息
            if(obj.event === 'setPwb'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的用户密码'
                    ,value: data.staff_password
                }, function(value, index){
                    if (value === data.staff_password){
                        alert("新旧密码一致，无需修改");
                    }else {
                        console.log("新的密码："+value);//新值
                        console.log(index);//第几次
                    }
                    //关闭当前框
                    layer.close(index);
                    //这里一般是发送修改的Ajax请求
                    $.ajax({
                        url:"http://localhost:8081/editStaffPwb",
                        type:'post',
                        data:{
                            staff_id:data.id,  //员工id
                            newPwb:value,
                        },
                        beforeSend:function(){
                            alert('即将发送数据...');
                        },
                        success:function (data) {
                            console.log(data);
                            if (data === 1){
                                layer.msg("更改成功!");
                                //同步更新表格和缓存对应的值
                                obj.update({
                                    staff_password: value
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

            //更改手机号码
            if (obj.event === 'setPhoneNum'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的手机号码'
                    ,value: data.staff_phonenum
                }, function(value, index){
                    if (value === data.staff_phonenum){
                        alert("新旧手机号码一致，无需修改");
                    }else {
                        console.log("新的手机号码址："+value);//新值
                        console.log(index);//第几次
                        //这里一般是发送修改的Ajax请求
                        $.ajax({
                            url:"http://localhost:8081/editStaffPhoneNum",
                            type:'post',
                            data:{
                                staff_id:data.id,  //员工id
                                newPhoneNum:value,
                            },
                            beforeSend:function(){

                            },
                            success:function (data) {
                                console.log(data);
                                if (data === 1){
                                    layer.msg("更改成功!");
                                    //同步更新表格和缓存对应的值
                                    obj.update({
                                        staff_phonenum: value
                                    });
                                }else {
                                    layer.msg("更改失败!");
                                }
                            },
                            error:function (error) {
                                layer.msg('更改出错，请稍后再试！');
                            }
                        });
                    }
                    layer.close(index);//关闭当前框


                });
            }

            //更改地址信息
            if(obj.event === 'setAddress'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的用户住址'
                    ,value: data.staff_place
                }, function(value, index){
                    if (value === data.staff_place){
                        alert("新旧住址一致，无需修改");
                    }else {
                        console.log("新的用户住址："+value);//新值
                        console.log(index);//第几次
                        //这里一般是发送修改的Ajax请求
                        $.ajax({
                            url:"http://localhost:8081/editStaffPlace",
                            type:'post',
                            data:{
                                staff_id:data.id,  //员工id
                                newPlace:value,
                            },
                            beforeSend:function(){

                            },
                            success:function (data) {
                                console.log(data);
                                if (data === 1){
                                    layer.msg("更改成功!");
                                    //同步更新表格和缓存对应的值
                                    obj.update({
                                        staff_place: value
                                    });
                                }else {
                                    layer.msg("更改失败!");
                                }
                            },
                            error:function (error) {
                                layer.msg('更改出错，请稍后再试！');
                            }
                        });
                    }
                    layer.close(index);//关闭当前框


                });
            }

            //修改身份证号码
            if(obj.event === 'setPcardNum'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的身份证号码'
                    ,value: data.staff_pcrdnumber
                }, function(value, index){
                    if (value === data.staff_pcrdnumber){
                        alert("新旧身份证号码一致，无需修改");
                    }else {
                        console.log("新的身份证号码："+value);//新值
                        console.log(index);//第几次
                        //这里一般是发送修改的Ajax请求
                        $.ajax({
                            url:"http://localhost:8081/editStaffPcardNum",
                            type:'post',
                            data:{
                                staff_id:data.id,  //员工id
                                newPcardNum:value,
                            },
                            beforeSend:function(){
                                alert('即将发送数据...');
                            },
                            success:function (data) {
                                console.log(data);
                                if (data === 1){
                                    layer.msg("更改成功!");
                                    //同步更新表格和缓存对应的值
                                    obj.update({
                                        staff_pcrdnumber: value
                                    });
                                }else {
                                    layer.msg("更改失败!");
                                }
                            },
                            error:function (error) {
                                layer.msg('更改出错，请稍后再试！');
                            }
                        });
                    }
                    layer.close(index);//关闭当前框


                });
            }

            //修改员工类别
            if(obj.event === 'setStaffClass'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的员工类别【1/管理员;2/称重员;3/化验员】'
                    ,value: data.staff_class
                }, function(value, index){
                    if (value === data.staff_class.toString()){
                        alert("新旧员工类别一致，无需修改");
                    }else {
                        console.log("新的员工类别："+value);//新值
                        console.log(index);//第几次
                        //这里一般是发送修改的Ajax请求
                        $.ajax({
                            url:"http://localhost:8081/editStaffStaffClass",
                            type:'post',
                            data:{
                                staff_id:data.id,  //员工id
                                newStaffClass:Number(value),
                            },
                            beforeSend:function(){
                                alert('即将发送数据...');
                            },
                            success:function (data) {
                                console.log(data);
                                if (data === 1){
                                    layer.msg("更改成功!");
                                    //同步更新表格和缓存对应的值
                                    obj.update({
                                        staff_class: value
                                    });
                                }else {
                                    layer.msg("更改失败!");
                                }
                            },
                            error:function (error) {
                                layer.msg('更改出错，请稍后再试！');
                            }
                        });
                    }
                    layer.close(index);//关闭当前框

                });
            }
            //修改出生日期
            if(obj.event === 'setBirthDay'){
                layer.prompt({
                    formType:0
                    ,title: '修改 姓名 为 ['+ data.staff_name +'] 的出生日期【格式：yyyy-mm-dd】'
                    ,value: data.staff_birthday.slice(0,10)
                }, function(value, index){
                    if (value === data.staff_birthday.slice(0,10)){
                        alert("新旧出生日期一致，无需修改");
                    }else {
                        console.log("新的出生日期："+value);//新值
                        console.log(index);//第几次
                        //这里一般是发送修改的Ajax请求
                        $.ajax({
                            url:"http://localhost:8081/editStaffBirthDay",
                            type:'post',
                            data:{
                                staff_id:data.id,  //员工id
                                newBirthDay:value,
                            },
                            beforeSend:function(){

                            },
                            success:function (data) {
                                console.log(data);
                                if (data === 1){
                                    layer.msg("更改成功!");
                                    //同步更新表格和缓存对应的值
                                    obj.update({
                                        staff_birthday: value
                                    });
                                }else {
                                    layer.msg("更改失败!");
                                }
                            },
                            error:function (error) {
                                layer.msg('更改出错，请稍后再试！');
                            }
                        });
                    }
                    layer.close(index);//关闭当前框





                });
            }

        });
    });


}

//删除员工操作
function deleteStaff(staff_id) {
    layer.confirm('是否确认删除',function (index) {
        $.ajax({
            url:"http://localhost:8081/deleteStaffById",
            type:'post',
            data:{
                staff_id:staff_id,  //员工id
            },
            beforeSend:function(){

            },
            success:function (data) {
                console.log(data);
                if (data === 1){
                    layer.msg("删除成功!");
                    //同步更新表格
                    staffDataReady();
                }else {
                    layer.msg("删除失败!");
                }
            },
            error:function (error) {
                layer.msg('删除出错，请稍后再试！');
            }
        });

        layer.close(index);
    });



}