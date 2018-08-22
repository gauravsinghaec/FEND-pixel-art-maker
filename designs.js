// Select color input
const color = document.getElementById("colorPicker");
// Select the canvas area
const gridArea = document.getElementById("pixelCanvas");
// Select size input
const height = document.getElementById("inputHeight");
const width = document.getElementById("inputWeight");
// Select buttons and error div
const subBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");
const downloadBtn = document.getElementById("save");
const errorDiv = document.getElementById("error");
// HTML components to be added dynamically by code
const imgLink = document.createElement('a');
imgLink.id='myimage';

/**
 * @description It creates the cell of the table and 
 * appends it to the repective row.
 */
function makeGrid() {
	const y = document.createElement('td');
	y.className='canvasCol';
	gridArea.lastElementChild.appendChild(y);
}

/**
 * @Event_Listener: registers click event on table
 * to set/unset the colors when user click in any of the table's cell
 */
gridArea.addEventListener("click",function(e){
	selecteColor = color.value;
	preColor = e.target.style.backgroundColor;
	if (preColor == "rgb(255, 255, 255)" || preColor == ''
		|| preColor == "rgba(0, 0, 0, 0)") {
		e.target.style.backgroundColor=selecteColor;
	}else {
		e.target.style.backgroundColor="rgb(255, 255, 255)";
	}
});

/**
 * @Event_Listener: It alert user about limit on width/height
 * in realtime before hitting submit.
 */
['change', 'keyup'].forEach(function(event){
	document.getElementById('sizePicker').addEventListener(event,function(evt){
		if(evt.target.value >30){
			subBtn.setAttribute("disabled","true");
			errorDiv.removeAttribute("hidden");
			errorDiv.textContent="Max allowable height/width value is 30.";
			errorDiv.style.color="red";
		}else{
			errorDiv.setAttribute("hidden","true");
			subBtn.removeAttribute("disabled");
		}
	});
});

/**
 * @Event_Listener: When size is submitted by the user, call makeGrid()
 * to draw the grid structure for pixel art.
 */
subBtn.addEventListener("click",function(evt){
	resetTable();
	const col = width.value;
	const row = height.value;
	for (let r = 0; r<row; r++){
		const x = document.createElement('tr');
      	x.className='canvasRow';
		gridArea.appendChild(x);
		for(let c = 0; c<col; c++){
			makeGrid();
		}
	}
    console.log(gridArea);
  	document.querySelector("table").style.backgroundColor="white";
	downloadBtn.removeAttribute("hidden");
});

/**
 * @description It resets the table and delete all rows.
 */
function resetTable(){
  	let rows = document.querySelectorAll('.canvasRow');
	Array.prototype.forEach.call(rows,function(node,i){
    	node.parentNode.removeChild(node);
    });
}

/**
 * @Event_Listener: It resets the page state.
 */
resetBtn.addEventListener("click",function(evt){
	downloadBtn.setAttribute("hidden","true");
	errorDiv.setAttribute("hidden","true");
	subBtn.removeAttribute("disabled");
	height.value=2;
	width.value=2;
  	resetTable();
});

/**
 * @Event_Listener: When user click download it does following:
 * generate temporary "canvas" tag using table
 * adds anchor tag inside canvas
 * convert canvas to set image "href" attribute
 * sets the "download" attribute on anchor tag
 * triggers click event on anchor tag to start download
 * removes the "canvas" tag
 */
downloadBtn.addEventListener("click",function(evt){
	html2canvas(document.querySelector("#pixelCanvas"))
	.then(canvas => {
    	document.body.appendChild(canvas);
 		const img = canvas.toDataURL("image/png")
    			.replace("image/png", "image/octet-stream");
		imgLink.setAttribute("href", img);
	    imgLink.setAttribute("download", "pixel_art.png");
	    canvas.appendChild(imgLink);
		document.getElementById("myimage").click();
		document.body.removeChild(canvas);
	})
  	.catch(e => console.log(e));
});