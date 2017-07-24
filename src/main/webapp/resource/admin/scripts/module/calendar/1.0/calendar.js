/**
 * 项目名称: [calendar日历组件]
 * 项目描述: [适用于企易管项目]
 * 创建人: [tianshu]
 * 创建时间: [2016-09-09]
 */
/**
 * @param  {node} node 外层节点，需要添加class ui-calendar
 * @param  {object} opt
 * @param  {String} opt.date 设置需要显示的当前日期
 * @param  {Boolean} opt.choose_days 设置默认进来有哪些被选日期
 * @param  {Boolean} opt.choose_only 一次只能选一个
 * @param  {String} opt.maxYear 能够切换到的最大年份
 * @param  {String} opt.minYear 能够切换到的最小年份
 * @param  {Boolean} opt.enableChoose 点击的时候是否可选日期
 * @param  {Boolean} opt.class_off 非当月日期样式
 * @param  {Number} opt.class_choose 已选日期样式
 * @param  {Boolean} opt.class_cur today日期样式
 * @param  {Boolean} opt.class_arrowoff 箭头不允许点击样式
 * @param  {Object} opt.fn 回调函数对象
 */
(function(){

function Calendar(node, opt) {
    this.$node = $(node);
    this.opt = $.extend(true, {
        date: '',
        choose_days: [],
        choose_only: true,
        // maxYear: 2017,
        // minYear: 2015,
        enableChoose: false,
        class_off: 'off',
        class_choose: 'choose',
        class_cur: 'cur',
        class_arrowoff: 'arrowoff',
        fn: {
            initCb: function(){ return [];},//每次渲染days天数之前回调，比如调用接口获取当前月哪些日期是choose
            chooseCb: function(obj){},//点击选择某个日期之后的回调函数
            hoverCb: function($node){},//鼠标hover某个日期之后的回调函数
            leaveCb: function($node){},//鼠标leave某个日期之后的回调函数
            prevMonth: function(){},//前一个月
            nextMonth: function(){}//后一个月
        }
    }, opt || {});
    return this.init();
}

Calendar.tmpl = {
    box: ''+
        '<div class="calendar-hd">'+
        '   <div class="calendar-hd-title">'+
        '       <a href="javascript:;" class="calendar-arrow calendar-arrow-prev js-prev"><span class="arrow-prev"></span></a>'+
        '       <span class="calendar-time"><i class="js-year">2016</i>年<i class="js-month">1</i>月</span>'+
        '       <a href="javascript:;" class="calendar-arrow calendar-arrow-next js-next"><span class="arrow-next"></span></a>'+
        '   </div>'+
        '   <div class="calendar-hd-week">'+
        '       <span>日</span>'+
        '       <span>一</span>'+
        '       <span>二</span>'+
        '       <span>三</span>'+
        '       <span>四</span>'+
        '       <span>五</span>'+
        '       <span>六</span>'+
        '   </div>'+
        '</div>'+
        '<div class="calendar-bd">'+
        '   <div class="calendar-bd-days js-days">      '+
        '   </div>'+
        '</div>',
    day: '{{~ it.list:item }}<a data-day="{{= item.day }}" data-month="{{= item.month }}" data-year="{{= item.year }}" class="{{= item.cl }}" href="javascript:;">{{= item.day }}</a>{{~}}'
};

Calendar.prototype = {
    init: function() {
        this.build();
        this.renderDays();
        this.bind();
    },
    //创建日历的结构
    build: function(){
        this.$node.html(Calendar.tmpl.box);
        this.$days = this.$node.find('.js-days');
        this.$year = this.$node.find('.js-year');
        this.$month = this.$node.find('.js-month');
        this.$prev = this.$node.find('.js-prev');
        this.$next = this.$node.find('.js-next');
    },
    bind: function() {
        var self = this;
        this.$prev.on('click', function(evt){
            var $target = $(evt.currentTarget);
            if($target.hasClass(self.opt.class_arrowoff)) return;
            self.prevMonth();
        });
        this.$next.on('click', function(evt){
            var $target = $(evt.currentTarget);
            if($target.hasClass(self.opt.class_arrowoff)) return;
            self.nextMonth();
        });
        this.$days.delegate('a', 'click', function(evt){

            var $target = $(evt.currentTarget);

            var hasChooseClass = $target.hasClass(self.opt.class_choose);

            if(!$target.hasClass('choose_default') && self.opt.enableChoose){
                hasChooseClass?$target.removeClass(self.opt.class_choose):$target.addClass(self.opt.class_choose);
            }

            if(self.opt.enableChoose && self.opt.choose_only){
                $target.siblings('a:not(".cur,.choose_default")').removeClass('choose');
            }

            self.opt.fn.chooseCb && self.opt.fn.chooseCb({
                hasChoose: $target.hasClass(self.opt.class_choose),
                year : $target.data('year'),
                month : $target.data('month'),
                date: $target.data('day')
            });

        });
        this.$days.delegate('a', 'mouseover', function(evt){
            var $target = $(evt.currentTarget);
            self.opt.fn.hoverCb && self.opt.fn.hoverCb($target);
        });
        this.$days.delegate('a', 'mouseout', function(evt){
            var $target = $(evt.currentTarget);
            self.opt.fn.leaveCb && self.opt.fn.leaveCb($target);
        });
    },
    //创建日期
    renderDays: function(dateString){
        var self = this;
        //每次渲染日期之前调用initCb回调函数，获取每月对应的choose_days信息,通过接口返回
        this.opt.choose_days = this.opt.fn.initCb && this.opt.fn.initCb();
        var today = new Date();
        this.today = this.getDateinfo(today);
        var curYear = this.today.year;
        var curMonth = this.today.month;
        var curDay = this.today.day;
            
        var date = this.opt.date?new Date(this.opt.date):today;
        var viewDate = dateString?new Date(dateString):date;
        this.date = this.getDateinfo(date);
        this.viewDate = this.getDateinfo(viewDate);

        var year = this.viewDate.year;
        var month = this.viewDate.month;
        var day = this.viewDate.day; 
        var dateYear = this.date.year;
        var dateMonth = this.date.month;
        var dateDay = this.date.day;

        var info = this.getMonthinfo(viewDate);
        var data = [];
        var cell = {};
        var _month, _year;
        for(var i = info.prevDays, j = info.prevDays-info.firstDayWeek; i > j ; i--){
            if(month - 1 == 0){
                _month = 12;
                _year = year - 1;
            }else{
                _month = month - 1;
                _year = year;
            }
            cell = {
                cl : this.opt.class_off,
                day : i,
                month: _month,
                year: _year
            };
            //上月最末几天顺序颠倒
            data.unshift(cell);
        }
        for(var m = 1, n = info.curDays; m <= n; m++){
            cell = {
                cl : '',
                day : m,
                month: month,
                year: year
            };
            //选择日期的样式是choose
            if(this.opt.choose_days.length > 0){
                $.each(this.opt.choose_days, function(i, item){
                    if(m == item){
                        cell = $.extend(cell, {
                            cl: self.opt.class_choose + ' choose_default'
                        });
                    }
                });
            }
            //默认显示的日期 this.opt.date
            if(m == dateDay && year == dateYear && month == dateMonth){
                cell = $.extend(cell, {
                    cl: self.opt.class_choose + ' choose_default'
                });
            }
            //当天日期的样式是day
            if(m == curDay && year == curYear && month == curMonth){
                cell = $.extend(cell, {
                    cl: self.opt.class_cur
                });
            }
            data.push(cell);
        }
        for(var k = 1,l = 7-info.lastDayWeek; k < l; k++){
            if(month + 1 > 12){
                _month = 1;
                _year = year + 1;
            }else{
                _month = month + 1;
                _year = year;
            }
            cell = {
                cl : this.opt.class_off,
                day : k,
                month: _month,
                year: _year
            };
            data.push(cell);
        }
        if(data.length < 42){
            for(var x = 7-info.lastDayWeek, y = 7-info.lastDayWeek + 7; x < y; x++){
                if(month + 1 > 12){
                    _month = 1;
                    _year = year + 1;
                }
                cell = {
                    cl : this.opt.class_off,
                    day : x,
                    month: _month,
                    year: _year
                };
                data.push(cell);
            }
        }

        var _html = doT.template(Calendar.tmpl.day).apply(null, [{list: data}]);
        this.$days.html(_html);
        this.$year.html(year).data('year', year);
        this.$month.html(month).data('month', month);
    },
    //获取当前日期对应的年、月、日信息
    getDateinfo: function(date){
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        return {
            year: year,
            month: month,
            day: day
        };
    },
    //获取对应日期所在月份的相关信息
    getMonthinfo: function(date){
        var d = date,
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            prevYear, prevMonth, prevDays,
            curDays,
            firstDayWeek, lastDayWeek;

        //上个月的年、月信息
        prevYear = year;
        prevMonth = month - 1;
        if (month === 1) {
            prevMonth = 12;
            prevYear = year - 1;
        }

        //上个月总天数
        prevDays = this.getDaysInMonth(prevYear, prevMonth);
        //当月总天数
        curDays = this.getDaysInMonth(year, month);

        d.setDate(1);
        //当月第一天是周几
        firstDayWeek = d.getDay();
        //当月最后一天是周几
        d.setDate(curDays);
        lastDayWeek = d.getDay();

        return {
            'prevDays': prevDays, // 上个月总天数
            'curDays': curDays, // 当月总天数
            'firstDayWeek': firstDayWeek, // 当月第一天是周几
            'lastDayWeek': lastDayWeek // 当月最后一天是周几
        };
    },
    getDaysInMonth : function(year, month) {
        return [, 31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },
    isLeapYear : function(year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    },
    //切换到前一个月
    prevMonth: function(){
        var _m = this.$month.data('month');
        var _y = this.$year.data('year');
        if(_m == 1){
            _m = 12;
            --_y;
        }else{
            --_m;
        }
        this.renderArrowState(_y, _m);
        var _dString = _y+"/"+_m+"/"+1;
        this.renderDays(_dString);
        this.opt.fn.prevMonth && this.opt.fn.prevMonth();
    },
    //切换到后一个月
    nextMonth: function(){
        var _m = this.$month.data('month');
        var _y = this.$year.data('year');
        if(_m == 12){
            _m = 1;
            ++_y;
        }else{
            ++_m;
        }
        this.renderArrowState(_y, _m);
        var _dString = _y+"/"+_m+"/"+1;
        this.renderDays(_dString);
        this.opt.fn.nextMonth && this.opt.fn.nextMonth();
    },
    renderArrowState: function(_y, _m){
        (_y == this.opt.minYear && _m == 1)?this.$prev.addClass(this.opt.class_arrowoff):this.$prev.removeClass(this.opt.class_arrowoff);
        (_y == this.opt.maxYear - 1 && _m == 12)?this.$next.addClass(this.opt.class_arrowoff):this.$next.removeClass(this.opt.class_arrowoff);
    },
};
window.xCalendar = function(node, opt) {
    return new Calendar(node, opt);
};

})();