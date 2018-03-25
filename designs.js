// Select color input
var color = $('#colorPicker');
var gridArea = $('#pixelCanvas');
// Select size input
var height = $('#inputHeight');
var width = $('#inputWeight');
// When size is submitted by the user, call makeGrid()
var subBtn = $('#submit');
// var resetBtn = $('#reset');
var x = "<tr class='canvasRow'></tr>";
var y = "<td class='canvasCol'></td>";
function makeGrid() {
// Your code goes here!
	$(".canvasRow:last").append(y);
	$(".canvasCol:last").on('click',function(e){
		selecteColor = $(color).val();
		preColor = $(this).css("background-color");
		if(preColor == "rgb(255, 255, 255)" 
			|| preColor == "rgba(0, 0, 0, 0)"){
			$(this).css("background-color",selecteColor);		
		}else{
			$(this).css("background-color","rgb(255, 255, 255)");		
		}
	})
}

$("#inputHeight, #inputWeight").on('change',function(evt){
	console.log($(this).val());	
	if($(this).val() >30){
		$(subBtn).prop('disabled','true');
		$("#error").removeAttr('hidden');
		$("#error").text("Max allowable height/width value is 30.");
		$("#error").css("color","red");
	}else{
		$("#error").attr("hidden","true");
		$(subBtn).removeAttr('disabled');
	}	
});

$('#submit').on('click',function(evt){
	// evt.preventDefault();
	$(".canvasRow").remove();
	$(".canvasCol").remove();
	var col	= $(width).val();
	var row	= $(height).val();
	for (r = 0; r<row; r++){
		$(gridArea).append(x);
		for(c = 0; c<col; c++){
			makeGrid();
		}
	}
	$('table').css("background-color", "white");
	$('#save').removeAttr('hidden');
});

$('#reset').on('click',function(evt){
	$("#save").attr("hidden","true");
	$(".canvasRow").remove();
	$(".canvasCol").remove();
});

var imgLink = $("<a id='myimage'>");

$('#save').on('click',function(evt){
	html2canvas(document.querySelector("#table"))
	.then(canvas => {
    document.body.appendChild(canvas)
    var img = canvas.toDataURL("image/png")
    			.replace("image/png", "image/octet-stream");
	$(imgLink)
	    .attr("href", img)
	    .attr("download", "pixel_art.png")
	    .appendTo(canvas)
	    .text("Click Me");
	document.getElementById("myimage")
		.click();
	$(canvas).remove();    
	});
});
