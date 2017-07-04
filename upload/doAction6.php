<?php
header('content-type:text/html;charset=utf-8');
require_once 'upload.class.php';
$upload=new upload('file','../uploads');//上传文件配置
$dest=$upload->uploadFile();
echo $dest;