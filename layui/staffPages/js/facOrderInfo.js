//*****创建地图实例****************************************************************************************************
var map = new BMap.Map("map");
map.centerAndZoom(new BMap.Point(116.310791, 40.003419), 15);
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
//添加地图类型控件
map.addControl(new BMap.MapTypeControl({
    mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]
}));
//*********************************************************************************************************
//绘制路线
function addRoute(ffLongitude, ffLatitude, ftLongitude, ftLatitude) {
    let driving = new BMap.DrivingRoute(map, {
        renderOptions: {
            map: map,
            autoViewport: true
        }
    });
    let start = new BMap.Point(ffLongitude, ffLatitude);
    let end = new BMap.Point(ftLongitude, ftLatitude);
    driving.search(start, end);
}

//*********************************************************************************************************
// 添加小车标记，并进行小车事件点击绑定
function addCar(longitude, latitude,d_name,d_state,d_distance,d_address) {
    let state = "";
    let distance = "";
    if (d_state == 0) {
        state = "已完成";
        distance = "已完成";
    } else if (d_state == 1) {
        state = "正在前往发货工厂";
        distance = "距离发货工厂"+d_distance+"Km";
    } else if (d_state == 2) {
        state = "正在发货工厂装货";
        distance = "距离收货工厂"+d_distance+"Km";
    } else {
        state = "正在前往发货工厂";
        distance = "距离收货工厂"+d_distance+"Km";
    }
    //处理消息框字符
    let text = "【司机姓名】："+d_name+"\n【当前所在地】："+d_address+"\n【当前状态】："+state+"\n【距离目的地距离】："+distance;

    let myIcon = new BMap.Icon("../photo/car.png", new BMap.Size(52, 26)); // 创建小车图标
    let pt = new BMap.Point(longitude, latitude); // 创建Marker标注，使用小车图标
    let marker = new BMap.Marker(pt, {
        icon: myIcon
    });
    map.addOverlay(marker); // 将标注添加到地图

    // 创建信息窗口
    var opts = {
        width: 250,
        height: 100,
        title: '当前货车情况'
    };
    var infoWindow = new BMap.InfoWindow(text, opts);
    // 点标记添加点击事件
    marker.addEventListener('click', function () {
        map.openInfoWindow(infoWindow, pt); // 开启信息窗口
    });
}
//*********************************************************************************************************
//获得子订单详情、制作为表格
function getorderSon(fac_orderId) {
    layui.use('table', function() {
        var table = layui.table;
        var layer = layui.layer;
        table.render({
            elem: '#orderSonList',
            url: 'http://localhost:8081/getFacOrderSonOrder',
            where: {
                fac_orderId: fac_orderId
            },
            method: 'post',
            page: true //开启分页
            ,
            parseData: function(res) {
                return {
                    "code": 0,
                    "msg": "",
                    "count": res.length,
                    "data": res //解析数据列表
                };
            },
            cols: [
                [
                    {
                        title:"序号",
                        width:80,
                        templet:function(d){
                            return d.LAY_TABLE_INDEX+1;
                        }
                    },
                    {
                        field: "d_name",
                        title: "司机姓名"
                    },
                    {
                        field: "d_phoneNum",
                        title: "司机手机号码"
                    },
                    {
                        field: "d_address",
                        title: "当前所在地"
                    },
                    {
                        field: "",
                        title: "当前状态",
                        templet: function(d) {
                            if (d.d_state == 0) {
                                return '<span style="color: red">已完成</span>';
                            } else if (d.d_state == 1) {
                                return '<span style="color: blue">正在前往发货工厂</span>';
                            } else if (d.d_state == 2) {
                                return '<span style="color: green">正在发货工厂装货</span>';
                            } else {
                                return '<span style="color: darkorange">正在前往收货工厂</span>';
                            }
                        }
                    },
                    {
                        field: "",
                        title: "距离目的地距离",
                        templet: function(d) {
                            if (d.d_state == 0) {
                                return '<span style="color: red">已完成</span>';
                            } else if (d.d_state == 1) {
                                return "距离发货工厂<span style='color: red'>"+d.d_distance+"</span>Km";
                            } else if (d.d_state == 2) {
                                return "距离发货工厂<span style='color: red'>"+d.d_distance+"</span>Km";
                            } else {
                                return "距离收货工厂<span style='color: red'>"+d.d_distance+"</span>Km";
                            }
                        }
                    },
                    {
                        field:"editPz",
                        title:"进厂空车填写",
                        templet:function (d) {
                            if (ifff == "true" && d.d_state == 1){
                                return "<button class='layui-btn' onclick='editPz("+d.d_orderId+")'>点击填写</button>"
                            }else {
                                return "<button class='layui-btn layui-btn-disabled' onclick='editPz("+d.d_orderId+")' disabled>点击填写</button>"
                            }

                        }
                    },
                    {
                        field:"editMz1",
                        title:"离厂满重填写",
                        templet:function (d) {
                            console.log(ifff);
                            console.log(d.d_state);
                            if (ifff == "true" && d.d_state == 2){
                                return "<button class='layui-btn' onclick='editMz1("+d.d_orderId+")'>点击填写</button>"
                            }else {
                                return "<button class='layui-btn layui-btn-disabled' onclick='editMz1("+d.d_orderId+")' disabled>点击填写</button>"
                            }
                        }
                    },
                    {
                        field:"editMz2",
                        title:"到厂满重填写",
                        templet:function (d) {
                            console.log(d.d_state);
                            if ((ifff != "true" && d.d_state == 3)){
                                return "<button class='layui-btn' onclick='editMz2("+d.d_orderId+")'>点击填写</button>"
                            }else {
                                return "<button class='layui-btn layui-btn-disabled' onclick='editMz2("+d.d_orderId+")' disabled>点击填写</button>"
                            }
                        }
                    }
                ]
            ],
            //数据加载完成，地图上添加小车车
            done:function (res, curr, count) {
                let sonList = res.data;
                for (let i = 0; i < count; i++) {
                    addCar(sonList[i].order_longitude,sonList[i].order_latitude,sonList[i].d_name,sonList[i].d_state,sonList[i].d_distance,sonList[i].d_address); //进行地图添加
                }
            }
        })
    })
}
//*********************************************************************************************************
// ,获得工厂订单详情
function getFacorderInfo(fac_orderId) {
    if (ifff == "true"){
        document.getElementById("orderOverBtn").style.display="none";
    }
    new Vue({
        el:"#facOrderInfo",
        data() {
            return {
                facOrderInfo: null,
                facOrderGps:null,
            }
        },
        mounted() {
            //axios获得工厂订单详情
            axios.post('http://localhost:8081/getFacOrderInfo', "fac_orderid=" + fac_orderId)
                .then(response => (this.facOrderInfo = response['data']))
                .catch(function(error) {
                    alert("获得工厂订单信息出错");
                });
            //axios获得工厂订单GPS信息
            axios.post('http://localhost:8081/getFacOrderGPS', "fac_orderID=" + fac_orderId)
                .then(response => (this.facOrderGps = response['data']))
                .catch(function(error) {
                    alert("获得工厂订单工厂位置出错");
                });
        },
        watch: {
            facOrderGps:function(){
                this.$nextTick(function(){
                    addRoute(this.facOrderGps.ff_longitude,this.facOrderGps.ff_latitude,this.facOrderGps.ft_longitude,this.facOrderGps.ft_latitude);
                })
            },
        },
    })
}
