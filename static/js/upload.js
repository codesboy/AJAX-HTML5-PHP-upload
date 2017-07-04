
    var totalSize = 0;

    var fileNum = 0;

    $(function(){
        //绑定“选择并添加图片”按钮点击事件的callback
        $("#addImgBtn").on("click", function(){
            //新增一个file控件在“选择并添加图片”按钮前面
            var fileHtml = '<input type="file" capture="camera" name="file" id=file' + fileNum + ' /accept="image/jpeg,image/jpg,image/png">';// image/*这个会有bug
            fileNum++;
            $(this).before(fileHtml);

            var fileControl = $(this).prev(); //获取新增的file控件对象

            //为file控件绑定change事件的callback，图片被选择后会调用这个处理函数
            //注意：一定要在click事件被传递给file控件之前绑定，否则有些低版本的浏览器无法支持
            fileControl.on("change", function(){
                //获取从文件选择器返回的信息：
                var file = this.files[0]; //假设file标签没打开multiple属性，那么只取第一个文件就行了
                name = file.name;
                size = file.size;
                type = file.type;
                url = window.URL.createObjectURL(file); //获取本地文件的url，用于预览图片

                //图片预览：
                var imgHtml = '<img id="img'+ fileNum +'" class="imgPreview"/>';
                imgHtml += "文件名：" + name + " 文件类型：" + type + " 文件大小：" + size /* + " url: " + url */ + "<br/>";
                $("#imgPreview").append(imgHtml);
                $("#img"+fileNum).attr("src", url);

                //总计
                totalSize += size;
                $("#info").html("总大小: " + totalSize + "bytes");
            });

            //把点击事件传递给file控件
            fileControl.focus(); //注意：某些浏览器，比如android4.2版本的Webview，必须先focus file控件，不然无法弹出文件选择器！！！
            fileControl.click();
            fileControl.hide();
        });
    });

    function upload() {
        //创建FormData对象，初始化为form表单中的数据。需要添加其他数据可使用formData.append("property", "value");
        var formData = new FormData($('form')[0]);

        //ajax异步上传
        $.ajax({
            url: "upload/doAction6.php",
            type: "POST",
            data: formData,
            xhr: function(){ //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数

                myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){ //检查upload属性是否存在
                    //绑定progress事件的回调函数
                    myXhr.upload.addEventListener('progress',progressHandlingFunction, false);
                }
                return myXhr; //xhr对象返回给jQuery使用
            },
            success: function(result){
                $("#result").html(result);
            },
            contentType: false, //必须false才会自动加上正确的Content-Type
            processData: false  //必须false才会避开jQuery对 formdata 的默认处理
        });
    }

    //上传进度回调函数：
    function progressHandlingFunction(e) {
        if (e.lengthComputable) {
            $('progress').attr({value : e.loaded, max : e.total}); //更新数据到进度条
            var percent = e.loaded/e.total*100;
            $('#progress').html(e.loaded + "/" + e.total+" bytes. " + percent.toFixed(2) + "%");
        }
    }
