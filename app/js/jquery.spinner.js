;(function ($) {
	var goods_num="";
  $.fn.spinner = function (opts) {
    return this.each(function () {
      var defaults = {value:1, min:1}
      var options = $.extend(defaults, opts)
      var keyCodes = {up:38, down:40}
      var container = $('<div></div>')
      container.addClass('spinner')
      var textField = $(this).addClass('value').attr('maxlength', '3').val(options.value)
        .bind('keyup paste change', function (e) {
          var field = $(this)
          if (e.keyCode == keyCodes.up) changeValue(1)
          else if (e.keyCode == keyCodes.down) changeValue(-1)
          else if (getValue(field) != container.data('lastValidValue')) validateAndTrigger(field)
        })
      textField.wrap(container)

      var increaseButton = $('<button class="increase">+</button>').click(function () { var goods_price=Number($(this).parent().parent().parent().attr('goods_price'));  var goods_num=Number($(this).parent().parent().parent().attr('goods_num')); changeValue(1,goods_num,goods_price,$(this)) })
      var decreaseButton = $('<button class="decrease">-</button>').click(function () { var goods_price=Number($(this).parent().parent().parent().attr('goods_price'));  var goods_num=Number($(this).parent().parent().parent().attr('goods_num')); changeValue(-1,goods_num,goods_price,$(this)) })

      validate(textField)
      container.data('lastValidValue', options.value)
      textField.before(decreaseButton)
      textField.after(increaseButton)

      function changeValue(delta,goods_num,goods_price,obj) {  
				// var goods_num=0;   
				var num = getValue() + delta;
				if(num>=goods_num){
					return false;
				} 
				textField.val(num)
				validateAndTrigger(textField)
				if(!isNaN(goods_price)){
					var price=Number(goods_price).toFixed(2);
					price=(price*num).toFixed(2);
					$(obj).parents('tr').next().find('.goods_price').text(price);
					var cart_id=$(obj).parents('tr').attr('cart_id');
					total();
					var data={};
					data.cart_id=cart_id;
					data.goods_num=num;
					data.total_price=price;
					$.get("http://39.96.199.148:8060/cartUpdate",data,function(res){
						alert(res.msg);
					},'json');
				}
				
      }

      function validateAndTrigger(field) {
        clearTimeout(container.data('timeout'))
        var value = validate(field)
        if (!isInvalid(value)) {
          textField.trigger('update', [field, value])
        }
      }

      function validate(field) {
        var value = getValue()
        if (value <= options.min) decreaseButton.attr('disabled', 'disabled')
        else decreaseButton.removeAttr('disabled')
        field.toggleClass('invalid', isInvalid(value)).toggleClass('passive', value === 0)

        if (isInvalid(value)) {
          var timeout = setTimeout(function () {
            textField.val(container.data('lastValidValue'))
            validate(field)
          }, 500)
          container.data('timeout', timeout)
        } else {
          container.data('lastValidValue', value)
        }
        return value
      }

      function isInvalid(value) { return isNaN(+value) || value < options.min; }

      function getValue(field) {
        field = field || textField;
        return parseInt(field.val() || 0, 10)
      }
    })
  }
	
	//总价
	function total(){
	    var total=0;
	    var num=0;
	    //获取所有选中复选框
	    $('.box:checked').each(function (index) {
			var subtotal=$(this).parents('tr').next().find('.goods_price').text();
			subtotal=Number(subtotal).toFixed(2);//总价
			total+=Number(subtotal);
	    })  
		total=total.toFixed(2)
	    $(".total").text('￥'+total);
	}; 
	
})(jQuery)