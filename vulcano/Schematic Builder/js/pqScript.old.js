$(document).ready(function(){
$(document).on('mousedown click', '.esquema .gs-w', function(){
    		habilitarBotones();
		removerSeleccion();
		$(this).addClass("clicked");
});


	deshabilitarBotones();
	$("#btnEliminar").click(function(){
	     esquema.remove_widget( $('.gridster li.clicked')[0]);
	     deshabilitarBotones();	
	});

	$("#btnBorrarTodo").click(function(){
	     esquema.remove_all_widgets();
	     deshabilitarBotones();
		
	});

	$("#btnTamano").click(function(){
	     esquema.enable_resize();
	     	
	});

	$('.esquema').click(function(e) {
        if(!$(e.target).hasClass('gs-w')) {
	    deshabilitarBotones();
            removerSeleccion();
	    deshabilitarResize();
        }
	
    });
	
});

function removerSeleccion(){
$('.gs-w').removeClass("clicked");
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
esquema.disable_resize();
}
