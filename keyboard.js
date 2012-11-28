 $(document).ready(function(){
 	
 	 var digit_to_symbol = {
     "`":"~",
     "1":"!",
     "2":"@",
     "3":"#",
     "4":"$",
     "5":"%",
     "6":"^",
     "7":"&",
     "8":"*",
     "9":"(",
     "0":")",
     "-":"_",
     "=":"+"     
     }
     
     var symbol_to_digit = {
     "~":"`",
     "!":"1",
     "@":"2",
     "#":"3",
     "$":"4",
     "%":"5",
     "^":"6",
     "&amp;":"7",
     "*":"8",
     "(":"9",
     ")":"0",
     "_":"-",
     "+":"="     
     }
           	 
 	 
	$("#keyboard .simple_button").click(function(){
		var buttonValue = $(this).html();
		$("textarea").attr("value", $("textarea").attr("value")+buttonValue);
		return false;	
	})
	
	$("#keyboard .digit_button").click(function(){
		var buttonValue = $(this).html();
		$("textarea").attr("value", $("textarea").attr("value")+buttonValue);
		return false;	
	})
	
	$("#keyboard #bs").click(function(){
		var text = $("textarea").attr("value").toString();
		var pos = getCaret(document.getElementById('text'));				
		$("textarea").attr("value", text.substring(0, pos-1) + text.substring(pos, text.length));
		setCaret(document.getElementById('text'),pos-1);	
		return false;
		
		})
	$("#keyboard .space_button").click(function(){
		var buttonValue = $(this).html();
		$("textarea").attr("value", $("textarea").attr("value")+" ");
		return false;
		
		})
	
		
	$("#keyboard #caps").click(function(){
				
		if ($(this).hasClass('pressed')) {
			$(this).removeClass('pressed');
			
			$ ("#keyboard .simple_button").each(function(index) {
				$(this).html($(this).html().toLowerCase());		
		    });		
			
		} else{
			$(this).addClass('pressed');
			
			$ ("#keyboard .simple_button").each(function(index) {
				$(this).html($(this).html().toUpperCase());		
		    });	
			
		};		
			
		return false;
			
	})		
	
	$("#keyboard .close_button").click(function(){
		$("#keyboard").remove();
		return false;
		
	})
	
	$("#keyboard .shift_button").click(function(){
				
		if ($(this).hasClass('pressed')) {
			$(this).removeClass('pressed');
			
			$ ("#keyboard .digit_button").each(function(index) {
				$(this).html(symbol_to_digit[$(this).html()]);		
		    });		
		    
		    $ ("#keyboard .simple_button").each(function(index) {
				$(this).html($(this).html().toLowerCase());		
		    });	
			
		} else{
			$(this).addClass('pressed');
			
			$ ("#keyboard .digit_button").each(function(index) {
				$(this).html(digit_to_symbol[$(this).html()]);					
		    });	
			
			$ ("#keyboard .simple_button").each(function(index) {
				$(this).html($(this).html().toUpperCase());		
		    });	
			
		};		
			
		return false;
		
	})

	})			        
				
	function getCaret (ctrl) {
		var CaretPos = 0;   // IE Support
		if (document.selection) {
		ctrl.focus ();
		var Sel = document.selection.createRange ();
		Sel.moveStart ('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
		}
		// Firefox support
		else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
		return (CaretPos);
	}

	function setCaret(ctrl, pos){
		if(ctrl.setSelectionRange)
		{
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
		}
		else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
		}

	}
		
		
	function fixEvent(e) {
	  // ссылка на объект event
	  e = e || window.event;

	  // target - целевой эл-т
	  // srcElement - эл-т, вызвавший тек. событие
	  if (!e.target) e.target = e.srcElement;

	  //pageX, pageY - левая и верхняя координаты эл-та относительно верхнего левого угла страницы
	  //clientX - горизонтальные координаты мыши во время вызова текущего события
	  if (e.pageX == null && e.clientX != null ) { // если нет pageX..
		//ссылка на объект HTML-элемента, который представляет содержимое всего текущего документа
		var html = document.documentElement;
		//ссылка на объект BODY
		var body = document.body;
		
		//scrollLeft - расстояние между левым краем элемента и фактическим содержанием элемента.
		e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
		//clientLeft - ширина границы элемента
		e.pageX -= html.clientLeft || 0;
		
		//scrollTop - расстояние между верхним краем элемента и фактическим содержанием элемента. 
		e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
		//clientTop - ширина границы элемента
		e.pageY -= html.clientTop || 0;
	  }
	  
	  //which - кнопка мыши – 1: левая, 2: средняя, 3: правая  
	  //button - кнопка мыши
	  if (!e.which && e.button) {
		e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
	  }

	  return e;
	}


	function getCoords(elem) {
		//прямоугольник, указывающий, сколько места объект занимает на странице 
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docElem = document.documentElement;
		
		//pageYOffset - размер в пикселах содержания страницы, которое было прокручено
		var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

		var clientTop = docElem.clientTop || body.clientTop || 0;
		var clientLeft = docElem.clientLeft || body.clientLeft || 0;

		var top  = box.top +  scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;

		return { top: Math.round(top), left: Math.round(left) };
	}

	var keyboard = document.getElementById("keyboard");

	keyboard.onmousedown = function(e) { // отследить нажатие
	  var self = this;
	  e = fixEvent(e);
	  
	  var coords = getCoords(this);
	  var shiftX = e.pageX - coords.left;
	  var shiftY = e.pageY - coords.top;
	 
	  // подготовить к перемещению
	  // разместить на том же месте, но в абсолютных координатах
	  this.style.position = 'absolute';
	  moveAt(e);
	  // переместим в body, чтобы keyboard была точно не внутри position:relative
	  document.body.appendChild(this);
	  //zIndex - положение в списке относительно других элементов в пределах того же самого родительского контейнера.		 
	  this.style.zIndex = 1000; // показывать keyboard над другими элементами
	   
	  // передвинуть keyboard под координаты курсора  
	  function moveAt(e) {
		self.style.left = e.pageX - shiftX + 'px';
		self.style.top = e.pageY - shiftY+ 'px';
	   }
	 
	  // перемещать по экрану
	  document.onmousemove = function(e) {
		e = fixEvent(e);
		moveAt(e);
	  }
	 
	  this.onmouseup = function() {
		document.onmousemove = self.onmouseup = null;
	  }
	}

	keyboard.ondragstart = function() {
	  return false;

	}	