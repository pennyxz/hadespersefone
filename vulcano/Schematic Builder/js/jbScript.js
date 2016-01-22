var contadorEquipos = 0;

$(document).ready(function(){

var collectionA =[
		 {x: 0, y: 0, width: 12, height: 2},
    		 {x: 1, y: 0, width: 12, height: 2},
    		 {x: 2, y: 0, width: 12, height: 2}
	];
	var collectionB =[
		 {x: 0, y: 0, width: 12, height: 2},
    		 {x: 1, y: 0, width: 12, height: 2},
    		 {x: 2, y: 0, width: 12, height: 2}
	];
	var collectionC =[
		 {x: 0, y: 0, width: 12, height: 2},
    		 {x: 1, y: 0, width: 12, height: 2},
    		 {x: 2, y: 0, width: 12, height: 2}
	];
	
	$('#industrySelector').change(function(){

		//alert($('#industrySelector option:selected').val());
		
		switch($('#industrySelector option:selected').val()){
			case "default":{
				gridCajaHerramientas.remove_all();
				break;
			}
			case "firstOption":{
				gridCajaHerramientas.remove_all();
				$.each(collectionA, function(i,widget){
				gridCajaHerramientas.add_widget($('<div class="grid-stack-item-content" onclick="clickFunction()">bomba'+i+'</div>'), widget.x, widget.y, widget.width, widget.height);
				});
				gridCajaHerramientas.resizable('.grid-stack-item', false);
				break;
			}
			case "secondOption":{
				gridCajaHerramientas.remove_all();
				$.each(collectionB, function(i, widget){
				    gridCajaHerramientas.add_widget($('<div class="grid-stack-item-content" onclick="clickFunction()">equipo'+i+'</div>'), widget.x, widget.y, widget.width, widget.height);
				});
				gridCajaHerramientas.resizable('.grid-stack-item', false);
				break;
			}
			case "thirdOption":{
				gridCajaHerramientas.remove_all();
				$.each(collectionC, function(i, widget){
				    gridCajaHerramientas.add_widget($('<div class="grid-stack-item-content" onclick="clickFunction()">aire'+i+'</div>'), widget.x, widget.y, widget.width, widget.height);
				});
				 gridCajaHerramientas.resizable('.grid-stack-item', false);
				break;
			}
				
		}
		
	});
	

	$('#btnExportar').click(function(e){
		var codigo = $('#esquema').html();
		//alert(codigo);
		modal.open({content: "<p>HTML</p><textarea rows='30' cols='70'>"+codigo+"</textarea>"});
		
		e.preventDefault();
	});
	
});

function clickFunction(){
	
if (gridEsquema.will_it_fit(0, 0, 2, 1, true)) {
	gridEsquema.add_widget($('<div class="grid-stack-item"><div class="grid-stack-item-content">Hola</div></div>'), 0, 0, 2, 1, true);
	gridEsquema.resizable('.grid-stack-item', false);	
}
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









