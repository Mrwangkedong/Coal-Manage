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


function setFacId(fac_id){
	let param = {
	    "fac_id":fac_id
	};
	
	document.getElementById("facIndexePage").href="index.html?fac_id="+fac_id;
	// document.getElementById("facIndexePage").addEventListener('tap',function(){
		// goNavPage("index",param)
	// })
	document.getElementById("facMsgePage").href="facMsg.html?fac_id="+fac_id;
	// document.getElementById("facMsgePage").addEventListener('tap',function(){
		// goNavPage("facMsg",param);
	// })
	document.getElementById("facWalletPage").href="facWallet.html?fac_id="+fac_id;
	// document.getElementById("facWalletPage").addEventListener('tap',function(){
		// goNavPage("facWallet",param);
	// })
	document.getElementById("facMessagePage").href="facMessage.html?fac_id="+fac_id;
	// document.getElementById("facMessagePage").addEventListener('tap',function(){
		// goNavPage("facMessage",param);
	// })
}

function goNavPage(pageName,param){
	let url = creaturl(pageName,param);
	
	location.replace(url);
}