$(document).ready(function(){
$(document).on('mousedown click', '#gridEsquema .grid-stack-item', function(){
    		habilitarBotones();
		removerSeleccion();
		$(this).addClass("clicked");
});


	deshabilitarBotones();
	$("#btnEliminar").click(function(){
	     gridEsquema.remove_widget($('.clicked')[0]);
	     deshabilitarBotones();	
	});

	$("#btnBorrarTodo").click(function(){
	     gridEsquema.remove_all();
	     deshabilitarBotones();
		
	});

	$("#btnTamano").click(function(){
	     gridEsquema.resizable('.grid-stack-item', true);
	     	
	});

	$('.esquema').click(function(e) {
        if(!$(e.target).hasClass('grid-stack-item')) {
	    deshabilitarBotones();
            removerSeleccion();
	    deshabilitarResize();
        }
	
    });
	
});

function removerSeleccion(){
$('.grid-stack-item').removeClass("clicked");
}

function habilitarBotones(){
$("#btnTamano").attr('disabled', false);
$("#btnEliminar").attr('disabled', false);
}

function deshabilitarBotones(){
$("#btnTamano").attr('disabled', true);
$("#btnEliminar").attr('disabled', true);
}

function deshabilitarResize(){
    gridEsquema.resizable('.grid-stack-item', false);
}
