// Select color input
const color = $("#colorPicker");
// Select the canvas area
const gridArea = $("#pixelCanvas");
// Select size input
const height = $("#inputHeight");
const width = $("#inputWeight");
// Select buttons and error div
const subBtn = $("#submit");
const resetBtn = $("#reset");
const downloadBtn = $("#save");
const errorDiv = $("#error");
// HTML components to be added dynamically by code
const x = "<tr class='canvasRow'></tr>";
const y = "<td class='canvasCol'></td>";
const imgLink = $("<a id='myimage'>");

/**
* @description It creates the cell of the table and registers click
*				event on each cell to set/unset the colors
*/
function makeGrid() {
// Your code goes here!
	$(".canvasRow:last").append(y);
	$(".canvasCol:last").on("click",function(e){
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

/**
*@Event_Listener: It alert user about limit on width/height
*	in realtime before hitting submit.
*/
$("#inputHeight, #inputWeight").on("change, keyup",function(evt){
	console.log($(this).val());
	if($(this).val() >30){
		$(subBtn).prop("disabled","true");
		$(errorDiv).removeAttr("hidden");
		$(errorDiv).text("Max allowable height/width value is 30.");
		$(errorDiv).css("color","red");
	}else{
		$(errorDiv).attr("hidden","true");
		$(subBtn).removeAttr("disabled");
	}
});

/**
*@Event_Listener: When size is submitted by the user, call makeGrid()
*				to draw the grid structure for pixel art.
*/
$(subBtn).on("click",function(evt){
	// evt.preventDefault();
	const col = $(width).val();
	const row = $(height).val();
	$(".canvasRow").remove();
	$(".canvasCol").remove();

	for (r = 0; r<row; r++){
		$(gridArea).append(x);
		for(c = 0; c<col; c++){
			makeGrid();
		}
	}
	$("table").css("background-color", "white");
	$(downloadBtn).removeAttr("hidden");
});

/**
* @Event_Listener: It resets the page state.
*
*/
$(resetBtn).on("click",function(evt){
	$(downloadBtn).attr("hidden","true");
	$(errorDiv).attr("hidden","true");
	$(subBtn).removeAttr("disabled");
	$(height).val(2);
	$(width).val(2);
	$(".canvasRow").remove();
	$(".canvasCol").remove();
});

/**
* @Event_Listener: When user click download it does following:
*					,generate temporary "canvas" tag using table
*					,adds anchor tag inside canvas
*					,convert canvas to set image "href" attribute
*					,sets the "download" attribute on anchor tag
*					,triggers click event on anchor tag to start download
*					,removes the "canvas" tag
*/
$(downloadBtn).on("click",function(evt){
	html2canvas(document.querySelector("#table"))
	.then(canvas => {
    document.body.appendChild(canvas)
    const img = canvas.toDataURL("image/png")
    			.replace("image/png", "image/octet-stream");
	$(imgLink)
	    .attr("href", img)
	    .attr("download", "pixel_art.png")
	    .appendTo(canvas)
	document.getElementById("myimage")
		.click();
	$(canvas).remove();
	});
});
