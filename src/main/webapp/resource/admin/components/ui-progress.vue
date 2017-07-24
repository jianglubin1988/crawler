<!-- Demo -->
<!-- <ui-progress :step-obj="['步骤一：设置人员信息录入模板', '步骤二：录入人员信息']" :cur-step="1"></ui-progress> -->

<style lang="sass">
@import "../styles/base/_global.scss";
@import "../styles/base/_mixin.scss";

.ui-progress {
    padding: 50px 0;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    li {
        position: relative;
        width: 360px;
        text-align: center;
        color: $color-info;
        line-height: 1;
        span {
            display: block;
            margin-bottom: 14px
        }
        p {
            position: relative;
            dfn {
                position: absolute;
                left: 0;
                top: 50%;
                content: '';
                margin-top: -5px;
                width: 100%;
                height: 10px;
                background: url(../images/gray-line.png) left center repeat-x;
            }

        }
        strong {
            position: relative;
            z-index: 2;
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 100%;
            background: url(../images/gray-circle.png);
            font-size: 20px;
            color: #fff;
        }

        &:first-child {
            p dfn {
                left: 50%;
                width: 50%
            }
        }
        &:last-child {
            p dfn {
                width: 50%
            }
        }
    }
    .current {
        color: $color-primary;
        strong {
            text-indent: -9999em;
        }
        p:before {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 12;
            content: '';
            margin: -13px 0 0 -13px;
            width: 27px;
            height: 27px;
            background: url(../images/cur.png);
        }
        p:after {
            position: absolute;
            left: 0;
            top: 50%;
            z-index: 11;
            content: '';
            margin-top: -2px;
            width: 100%;
            height: 4px;
            background: $color-primary;
        }
        &:first-child {
            p:after {
                left: 50%;
                width: 50%
            }
        }
        &:last-child {
            p:after {
                width: 50%
            }
        }
    }
}

</style>

<template>
	<ul class="ui-progress">
		<li :class="{current:$index + 1 <= curStep}" v-for="step in stepObj">
			<span>{{step}}</span>
			<p>
				<strong>{{$index+1}}</strong>
				<dfn></dfn>
			</p>
		</li>
	</ul>
</template>

<script>
module.exports = {
	props : {
		stepObj : Array,
		curStep : Number
	}
}
</script>