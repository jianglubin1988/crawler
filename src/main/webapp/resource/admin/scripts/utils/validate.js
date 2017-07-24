/**
 * 校验函数
 */

var validate = {

	/**
	 * 校验身份证号码
	 * @param  {[type]} card [description]
	 * @return {[type]}      [description]
	 */
    validIdcard: function(card){
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(card) === false){
            return  false;
        }
        return true;
    },

    /**
     * 校验手机号
     * @param  {[type]} tel [description]
     * @return {[type]}     [description]
     */
    validPhone: function(tel){
        var reg = /^((13|14|15|17|18)[0-9]{9})$/;
        if(reg.test(tel) === false){
            return  false;
        }
        return true;
    },

    /**
     * 校验电话号码
     * @param  {[type]} tel [description]
     * @return {[type]}     [description]
     */
    validTelephone: function(tel){
    	var reg = /(^(\d{3,4}-)?\d{7,8})$|((13|14|15|17|18)[0-9]{9})$/;
    	if(reg.test(tel) === false){
            return  false;
        }
        return true;
    },

    /**
     * 校验电子邮箱
     * @param  {[type]} mail [description]
     * @return {[type]}      [description]
     */
    validEmail: function(mail){
    	var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    	if(reg.test(mail) === false){
            return  false;
        }
        return true;
    },

    /**
     * 校验保留两位小数的金额
     * @param  {[type]} amount [description]
     * @return {[type]}        [description]
     */
    validAmount: function(amount){
    	var reg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
    	if(reg.test(amount) === false){
            return  false;
        }
        return true;
    },

    /**
     * 密码复杂度检查
     * @param  {[type]} pass [description]
     * @return {[type]}      [description]
     */
    checkPass: function(pass){
        if(pass == undefined || pass.length < 8){
            return 0;
        }
        var ls = 0;
        if(pass.match(/([a-z])+/)){
           ls++;
        }
        if(pass.match(/([0-9])+/)){
           ls++;
        }
        if(pass.match(/([A-Z])+/)){
            ls++;
        }
        if(pass.match(/[^a-zA-Z0-9]+/)){
            ls++;
        }
        return ls;
    },

    /**
     * 正整数检查
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    checkPositiveNumber: function(val){
        var reg = /^[0-9]*[1-9][0-9]*$/;
        if(reg.test(val)){
            return true;
        }
        return false;
    }
}

if(module) module.exports = validate;