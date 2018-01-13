/**
 * Created by Administrator on 2018/1/13.
 */
$(function(){
  var $form = $("form");
  $form.bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空呦☺"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          //非空校验
          notEmpty:{
            message:"用户密码不能为空呦☺"
          },
          //长度校验
          stringLength:{
            min:6,
            max:12,
            message:"密码必须是6-12位"
          },
          //是用于校验失败后，提示的信息
          callback:{
            message:"密码错误"
          }
        }
      }
      }
  });
  $form.on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success:function(info){
        if(info.success){
          location.href ="index.html";
        }
        if(info.error == 1000){
          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(info.error == 1001){
          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  });
  $("[type='reset']").on("click",function(){
    $form.data("bootstrapValidator").resetForm();
  });
})