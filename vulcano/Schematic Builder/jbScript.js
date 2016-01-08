var contadorEquipos = 0;

$(document).ready(function(){
	
	//alert("doc ready");
	var isCollectionACharged = false, isCollectionBCharged = false,
		isCollectionCCharged = false;
	var collectionA =[
		['<li class="collectionA" onclick="clickFunction(this)">bombaA</li>', 1, 1],
		['<li class="collectionA" onclick="clickFunction(this)">bombaB</li>', 1, 1],
		['<li class="collectionA" onclick="clickFunction(this)">bombaC</li>', 1, 1]
	];
	var collectionB =[
		['<li class="collectionB" onclick="clickFunction(this)">equipoA</li>', 1, 1],
		['<li class="collectionB" onclick="clickFunction(this)">equipoB</li>', 1, 1],
		['<li class="collectionB" onclick="clickFunction(this)">equipoC</li>', 1, 1]
	];
	var collectionC =[
		['<li class="collectionC" onclick="clickFunction(this)">aireA</li>', 1, 1],
		['<li class="collectionC" onclick="clickFunction(this)">aireB</li>', 1, 1],
		['<li class="collectionC" onclick="clickFunction(this)">aireC</li>', 1, 1]
	];
	/* <li data-row="1" data-col="1" data-sizex="1" data-sizey="1" class="gs-w"><span class="gs-resize-handle gs-resize-handle-both"></span></li>
       <li data-row="2" data-col="1" data-sizex="1" data-sizey="1" class="gs-w"><span class="gs-resize-handle gs-resize-handle-both"></span></li>
       <li data-row="3" data-col="1" data-sizex="1" data-sizey="1" class="gs-w"><span class="gs-resize-handle gs-resize-handle-both"></span></li>
	*/


	$('#industrySelector').change(function(){

		//alert($('#industrySelector option:selected').val());
		
		switch($('#industrySelector option:selected').val()){
			case "default":{
				//alert("a");
				cajaHerramientas.remove_all_widgets();
				//cajaHerramientas.remove_widget( $('#cajaHerramientas ul li') );
				//$('#cajaHerramientas ul li').hide();
				break;
			}
			case "firstOption":{
				//alert("b");
				cajaHerramientas.remove_all_widgets();
				$.each(collectionA, function(i, widget){					
				    cajaHerramientas.add_widget.apply(cajaHerramientas, widget);
				});
				
				break;
			}
			case "secondOption":{
				//alert("c");
				cajaHerramientas.remove_all_widgets();
				$.each(collectionB, function(i, widget){
				    cajaHerramientas.add_widget.apply(cajaHerramientas, widget);
				});
				break;
			}
			case "thirdOption":{
				//alert("d");
				cajaHerramientas.remove_all_widgets();
				$.each(collectionC, function(i, widget){
				    cajaHerramientas.add_widget.apply(cajaHerramientas, widget);
				});
				break;
			}
				
		}
		
	});
	
	//modal wait until the DOM has loaded before querying the document
	$.get('ajax.html', function(data){
		modal.open({content: data});
	});

	$('#btnExportar').click(function(e){
		var codigo = $('#esquema').html();
		//alert(codigo);
		modal.open({content: "<div>HTML</div>"
					+codigo});
		
		e.preventDefault();
	});
	
});

function clickFunction(liObject){
	
	/*var x = $(liObject).prop('outerHTML');
	alert(x);
	esquema.add_widget(x);*/
	
	//alert(x);
	esquema.add_widget($(liObject).prop('outerHTML'));
	$('#esquema ul li:last').removeAttr("onclick").css("display", "");
	

}
//modal export screen
var modal = (function(){
				var 
				method = {},
				$overlay,
				$modal,
				$content,
				$close;

				// Center the modal in the viewport
				method.center = function () {
					var top, left;

					top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
					left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

					$modal.css({
						top:top + $(window).scrollTop(), 
						left:left + $(window).scrollLeft()
					});
				};

				// Open the modal
				method.open = function (settings) {
					$content.empty().append(settings.content);

					$modal.css({
						width: settings.width || 'auto', 
						height: settings.height || 'auto'
					});

					method.center();
					$(window).bind('resize.modal', method.center);
					$modal.show();
					$overlay.show();
				};

				// Close the modal
				method.close = function () {
					$modal.hide();
					$overlay.hide();
					$content.empty();
					$(window).unbind('resize.modal');
				};

				// Generate the HTML and add it to the document
				$overlay = $('<div id="overlay"></div>');
				$modal = $('<div id="modal"></div>');
				$content = $('<div id="content"></div>');
				$close = $('<a id="close" href="#">close</a>');

				$modal.hide();
				$overlay.hide();
				$modal.append($content, $close);

				$(document).ready(function(){
					$('body').append($overlay, $modal);						
				});

				$close.click(function(e){
					e.preventDefault();
					method.close();
				});

				return method;
			}());









