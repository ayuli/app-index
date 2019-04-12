<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>收藏</title>
</head>
<body>
<a class = "x" id="{$photo.id}" uid="{$Think.session.uid}" status = "{$collect_pic}" href = "javascript:void(0);">
    <if condition = "$collect_num gt 0">
        <span>取消收藏</span>
        <else/><span>收藏</span></if></a>
</body>
</html>
<script src=""></script>
<script>
    //点击收藏，实现已收藏
    $('.x').on('click',function(){
        var Oa=$(this);
        var id=Oa.attr('id');//获取图片id属性
        var uid = Oa.attr('uid');//获取用户id
        var status = Oa.attr('status'); //获取收藏状态 1收藏，0取消收藏
        $.post('url',{id:id,uid:uid,status:status},function(msg){
            if(msg.status==1){
                Oa.find("span").text('取消收藏');
                Oa.attr('status','1');
            }else{
                Oa.find("span").text('收藏');
                Oa.attr('status','0');
            }
        },'json')
    })
</script>