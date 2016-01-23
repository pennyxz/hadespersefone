$(document).ready(function(){
    getTodaysDate();
    
    var node = {
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        };
    var data = {
    labels: [],
    datasets: []
    };
    var limitesSuperiores = new Array();
    var limitesInferiores = new Array();
    var ctx = $("#myChart").get(0).getContext("2d");  
    var myLineChart;
    
   $("#canvasForChart" ).droppable({
      drop: function( event, ui ) {
       
      }
    });
    
$('#tiempoInicial').timepicker({ 'step': 60 });
$('#tiempoFinal').timepicker({ 'step': 60 });
    $('#tiempoInicial').on('changeTime', function() {
        $('#tiempoFinal').timepicker('setTime', $(this).val());
        $('#tiempoFinal').timepicker('option', { 'minTime': $(this).val(), 'maxTime': '11:30pm' });
});
    
  $('#enviarRango').click(function (){
      data.labels = getDateRange();
      data.datasets.push(node);
      initChart(); 

  }); 
    
  $('#tree, #core').jstree({
  "core" : {
    "animation" : 0,
    "check_callback" : true,
    "themes" : { "stripes" : true }, 
  },
  "types" : {
    "#" : {
      "max_children" : 1,
      "max_depth" : 4,
      "valid_children" : ["root"]
    },
    "root" : {
      "icon" : "/static/3.2.1/assets/images/tree_icon.png",
      "valid_children" : ["default"]
    },
    "default" : {
      "valid_children" : ["default","file"]
    },
    "file" : {
      "icon" : "glyphicon glyphicon-file",
      "valid_children" : []
    }
  },
  "plugins" : [
    "contextmenu", "dnd", "search",
    "state", "types", "wholerow"
  ]
}); 

    
    function getDateRange(){
        var rangoHoras = ["12:00am","1:00am","2:00am","3:00am","4:00am","5:00am","6:00am","7:00am","8:00am","9:00am","10:00am","11:00am","12:00pm","1:00pm","2:00pm","3:00pm","4:00pm","5:00pm","6:00pm","7:00pm","8:00pm","9:00pm","10:00pm","11:00pm"]
        var arreglo = new Array();
        var horaInferior = $('#tiempoInicial').val();
        var horaSuperior = $('#tiempoFinal').val();
        
        var i = rangoHoras.indexOf(horaInferior);
        var j = rangoHoras.indexOf(horaSuperior);
        for (var index=i; index<=j; index++){
           
            arreglo.push(rangoHoras[index]);
        }
        
        return arreglo;
        
    }
    
    function getData()
    {
        var data = {
    labels: getDateRange(),
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
        /*data.datasets.push({
            label: "My Third dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [54, 2, 40, 78, 34, 27, 90]
        });*/
        return data;
    }
    
    function getTodaysDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    document.getElementById("todayDate").textContent = "Fecha de Hoy: "+today;
    }
    
    function initChart(){
        Chart.types.Line.extend({
    name: "LineWithLine",
    draw: function () {
        Chart.types.Line.prototype.draw.apply(this, arguments);
   
       /* 
        HACER ESTO POR CADA NODO QUE SE HA ARRASTRADO y SOLO
        SI PR LO MENOS HAY UNO
       var scale = this.scale
        // draw line
        this.chart.ctx.beginPath();
        this.chart.ctx.moveTo(scale.startPoint+40, this.scale.calculateY(getLimiteSuperior()));
        this.chart.ctx.strokeStyle = '#ff0000';
        this.chart.ctx.lineTo(this.chart.width, this.scale.calculateY(getLimiteSuperior())); //para los limites
        this.chart.ctx.stroke();
        
        this.chart.ctx.textAlign = 'center';
        this.chart.ctx.fillText("Limite superior", scale.startPoint + 60, this.scale.calculateY(90)+10);
        
        var point = this.datasets[0].points[1]
        
        this.chart.ctx.beginPath();
        this.chart.ctx.moveTo(scale.startPoint+40, point.y);
        this.chart.ctx.strokeStyle = '#ff0000';
        this.chart.ctx.lineTo(this.chart.width, point.y);
        this.chart.ctx.stroke();
        
        this.chart.ctx.textAlign = 'center';
        this.chart.ctx.fillText("Limite Inferior", scale.startPoint + 60, point.y+10);
        
        var ctx = this.chart.ctx;
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = this.options.scaleFontColor;
        // position
        var x = this.scale.xScalePaddingLeft * 0.4;
        var y = this.chart.height / 2;
        // change origin
        ctx.translate(x, y)
        // rotate text
        ctx.rotate(-90 * Math.PI / 180);
        ctx.fillText(getTypeSensors(), 0, 0);
        ctx.restore();*/

        
    }
});
       if (myLineChart != undefined)
           {
                myLineChart.destroy();
           }
        myLineChart = new Chart(ctx).LineWithLine(data, {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,
            scaleLabel: "          <%=value%>",
    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : false,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : false,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

});
    
    /*var legend= myLineChart.generateLegend();
    document.getElementById('js-legend').innerHTML =                     myLineChart.generateLegend();*/
        
    }
    
    function getLimiteSuperior()
    {
        //Retornar arreglo de limites superiores de los sensores seleccionados
        
        return 90;
    }
    
    function getLimiteInferior(){
        //Retornar arreglo de limites inferiores de los sensores seleccionados
        return 10;
    }
    
    function getTypeSensors(){
        return "Temperaturas"
    }
});

