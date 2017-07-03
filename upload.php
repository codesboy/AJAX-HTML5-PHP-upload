<?php
$fileInfo=$_FILES['u_photo'];
// $filename=$_FILES['name'];  //获取上传图片的名称

// var_dump($data);

echo json_encode($fileInfo);
