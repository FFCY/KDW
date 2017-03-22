/**
 * Created by Ellis on 2016/3/16.
 * 基础类：
 *功能：
 *1： 提示信息（含正则）
 *2： 数据有效性验证 验证
 *3:  Ajax 封装
 */
/*正则*/
var  RegularCase={
	Money_Verify_Reg:/^(([1-9]\d*)|0)(\.\d{1,2})?$/,
	Num_Unit_Reg:/^\d{1}$/,
	Tel_Verify_Reg:/^1[34578]\d{9}$/,
	Null_Verify_Reg:/(^s*)|(s*$)/g
};
/*提示信息*/
var PromptInfo={
    Money_Null_Error:"金额不能为空",
    Money_Format_Error:"金额格式错误",
    Num_Unit_Error:"不是一个0-9的正整数",
    Str_Null_Error:"为空",
    Tel_Null_Error:"请填写手机号",
    Tel_Format_Error:"手机号格式错误",
    Upd_Success_info:"修改成功！",
    Ver_Success_info:"验证成功"	
};
/*数据有效性验证 start*/
var DataVerify={
    /*非空移动手机号码*/
    IsTelPhone:function(data){
        var obj =new Object,
            myreg =RegularCase.Tel_Verify_Reg ;
        obj.status = !1;
        if (data == "") {
            obj.info = PromptInfo.Tel_Null_Error;
            return obj;
        }
        if (!myreg.test(data)) {
            obj.info = PromptInfo.Tel_Format_Error;
            return obj;
        }
       return DataVerify.retrunOk();
    },
    /*非空大于0的金额*/
    IsPositiveMoney:function(data){
        var obj=new Object,
            myreg =RegularCase.Money_Verify_Reg ;
        obj.status = !1
        if (data == "") {
            obj.info = PromptInfo.Money_Null_Error;
            return obj;
        }
        if (!myreg.test(data)) {
            obj.info = PromptInfo.Money_Format_Error;
            return obj;
        }
        return DataVerify.retrunOk();
    },
    /*为空的判断*/
    IsNullOrEmpty:function(data){
    	var obj={};
    	 obj.status = !1;
    	if(data.replace(RegularCase.Null_Verify_Reg, "").length ==0){
              obj.info = PromptInfo.Str_Null_Error;
              return obj;
    	}
    	return DataVerify.retrunOk();
    },
    /*非空0-9的正整数*/
    IsNumUnit:function(data){
     var obj=DataVerify.IsNullOrEmpty(data),
      	 myreg =RegularCase.Num_Unit_Reg   
     ;
     if(!obj.status) return obj;
     obj.status = !1;
     if (!myreg.test(data)) {
         obj.info = PromptInfo.Num_Unit_Error;
         return obj;
     }
     return DataVerify.retrunOk();
    },
    /*返回正确信息*/
    retrunOk:function(){
    	var obj={};
    	 obj.status = !0;
         obj.info = PromptInfo.Ver_Success_info;
         return obj;
    }
};
/*数据有效性验证 end*/
/*封装 ajax*/
(function(kindo){
	kindo.getAjaxData = function(param,callback){  
			$.ajax({
				type : param.type || 'Post',
				url : param.url,
				data : param.data||{},
				async : param.async||true, 
                beforeSend : function(){
                },
				dataType :param.dataType || 'json',
				success : function(data){
					callback && callback(data);
			    },
				error:function(e){
					console.log("服务器异常！");
				}

			});
	};

})(window);

/**
 * 对象判空
 * @param obj
 * @returns {Boolean}
 */
function isNull(obj){
	if(typeof(obj) == "undefined" || "" == obj || "undefined" == obj||null==obj){
		return true;
	}else{
		return false;
	}
}
//获取地址参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return null;
}
/*去除重复数组*/
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}
/*毫秒数的
转化为时间格式
 */
function formatTime(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        };
    });
};