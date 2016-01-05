$(document).ready(function(){
	//alert("doc ready");
	var isCollectionACharged = false, isCollectionBCharged = false,
		isCollectionCCharged = false;
	var collectionA =[
		['<li class="collectionA" onclick="clickFunction(this)">0</li>', 1, 1],
		['<li class="collectionA" onclick="clickFunction(this)">1</li>', 1, 1],
		['<li class="collectionA" onclick="clickFunction(this)">2</li>', 1, 1]
	];
	var collectionB =[
		['<li class="collectionB" onclick="clickFunction(this)">3</li>', 1, 1],
		['<li class="collectionB" onclick="clickFunction(this)">4</li>', 1, 1],
		['<li class="collectionB" onclick="clickFunction(this)">5</li>', 1, 1]
	];
	var collectionC =[
		['<li class="collectionC" onclick="clickFunction(this)">6</li>', 1, 1],
		['<li class="collectionC" onclick="clickFunction(this)">7</li>', 1, 1],
		['<li class="collectionC" onclick="clickFunction(this)">8</li>', 1, 1]
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
	
	
	
});

function clickFunction(liObject){
	
	/*var x = $(liObject).prop('outerHTML');
	alert(x);
	esquema.add_widget(x);*/
	
	//alert(x);
	esquema.add_widget($(liObject).prop('outerHTML'));
	$('#esquema ul li:last').removeAttr("onclick").css("display", "");

}









