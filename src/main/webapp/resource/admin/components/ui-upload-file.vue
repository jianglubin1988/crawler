<style lang="sass">
@import "../styles/base/_global.scss";
@import "../styles/base/_mixin.scss";

/* 
demo:
<ui-upload-file
    post-url="/admin/demo/upload"
    :file-type="['xls', 'xlsx']"
    :max-size="10485760"
    @callback-file-error="fileError"
    @callback-success="uploadSuccess"
    @callback-fail="uploadFail"
>
</ui-upload-file>

 */

/* 批量上传 */
.vue-file-upload {
    margin-bottom: 10px;
    line-height: 40px;
    .file-name,
    .query-btn {
        display: none;
    }
    .file-name {
        span {
            margin-left: 10px;
            color: $color-success
        }
    }
    .reupload {
        margin-left: 20px
    }

    .input-file-wrap {
        position: relative;
        display: inline-block;
        .input-file {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            text-indent: -10em;
        }
    }
    &.uploading {
        .upload-btn {
            display: none;
        }
        .file-name {
            display: inline-block
        }
        .query-btn {
            display: block;
        }
    }
}


</style>

<template>
    <div class="vue-file-upload" :class="{'uploading':isUpload}">
    	<div class="input-file-wrap">
            <p class="file-name">{{filename}} <span>{{progress}}</span></p>
            <button class="btn btn-large btn-primary upload-btn">上传</button>
            <a class="reupload btn btn-large btn-primary" v-if="isUploaded">重新上传</a>
            <input type="file" class="input-file" name="{{name}}" @change="change">
        </div>
    </div>
</template>

<script>

$.append = function(){

}
module.exports = {
	props: {
        postUrl: String,        //上传地址
        fileType: Array,        //文件格式
        maxSize: Number,        //文件大小
        name : {default:''},    //文件名
        data: Object            //跟随文件上传需要附带上传的其他参数
    },
    data: function(){
        return {
            isUpload: false,     //是否开始上传
            isUploaded: false,   //是否上传完成
            filename: '',        //文件名
            progress: ''        //上传进度
        }
    },
    methods: {
        change: function(e){

            var files = e.target.files || e.dataTransfer.files;
            var file = files[0];
            var filename = file.name;
            var postfix = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase(); //文件后缀
            e.target.value = '';

            if($.inArray(postfix, this.fileType) == -1){
                this.$emit('callback-file-error', 'type');
                return
            }

            if(file.size > this.maxSize){
                this.$emit('callback-file-error', 'size');
                return
            }
            this.isUpload = true;
            this.filename = filename;
            this.upload(file);
        },
        upload: function(file){
            var fd = new FormData();
            fd.append(this.name, file);
            $.each(this.data, function(key, value){
                fd.append(key, value);
            })

            core.loading(true);
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", this.uploadProgress, false);
            xhr.addEventListener("load", this.uploadComplete, false);
            xhr.addEventListener("error", this.uploadFailed, false);
            xhr.addEventListener("abort", this.uploadCanceled, false);
            xhr.open("POST", this.postUrl);
            xhr.send(fd);
        },
        uploadProgress: function(evt){  //上传进度
            if(evt.lengthComputable){
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                this.progress = percentComplete.toString() + '%';
            }else{
                this.progress = '未完成';
            }
        },
        uploadComplete: function(evt){ //上传成功
            core.loading(false);
            this.isUploaded = true;
            this.$emit('callback-success',evt);
        },
        uploadFailed: function(evt){  //上传失败
            core.loading(false);
            this.isUpload = false
            this.$emit('callback-fail',evt);
        },
        uploadCanceled: function(evt){ //上传取消
            core.loading(false);
            alert("上传取消",evt);
        }
    }
}
</script>