// Select color input
const color = $("#colorPicker");
const gridArea = $("#pixelCanvas");
// Select size input
const height = $("#inputHeight");
const width = $("#inputWeight");
// When size is submitted by the user, call makeGrid()
const subBtn = $("#submit");
const resetBtn = $("#reset");
const downloadBtn = $("#save");
const errorDiv = $("#error");
const x = "<tr class='canvasRow'></tr>";
const y = "<td class='canvasCol'></td>";
const imgLink = $("<a id='myimage'>");

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

$(resetBtn).on("click",function(evt){
	$(downloadBtn).attr("hidden","true");
	$(errorDiv).attr("hidden","true");
	$(subBtn).removeAttr("disabled");
	$(height).val(2);
	$(width).val(2);
	$(".canvasRow").remove();
	$(".canvasCol").remove();
});

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
	    .text("Click Me");
	document.getElementById("myimage")
		.click();
	$(canvas).remove();
	});
});
