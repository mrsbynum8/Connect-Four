let grid = [];
let gameInPlay = false;
let h2 = document.querySelector("h2");
let currentColor = "red";

restart = ()=>{
	grid = [
	[{}, {}, {}, {}, {}, {}, {}],
	[{}, {}, {}, {}, {}, {}, {}],
	[{}, {}, {}, {}, {}, {}, {}],
	[{}, {}, {}, {}, {}, {}, {}],
	[{}, {}, {}, {}, {}, {}, {}],
	[{}, {}, {}, {}, {}, {}, {}]
];
	gameInPlay = true;
	currentColor = "red";
	h2.style.backgroundColor = "#0000cc";
	h2.style.color = "white";
	document.getElementById("whoWon").innerHTML = `Connect 4`;
	document.getElementById("currentPlayer").innerHTML = `Current Color: <span class='${currentColor}'>${currentColor}</span>`
	render();
}


const render = () => {
	const svg = document.getElementById("svg");
	let doc = ``;
	for (var y2 = 0; y2 < grid.length; y2++) {
		var row = grid[y2];
		for (var x2 = 0; x2 < row.length; x2++) {
			const square = grid[y2][x2];
			const color = (square && square.color) || "#CBCBCB";
			doc +=
				`<circle onclick="clickSquare(${x2},${y2})" fill='${color}' r='6%' cx='${x2 *
					70+40}px' cy='${y2 * 70+40}px'></circle>`;
		}
	}
	svg.innerHTML = doc;
};

window.clickSquare = (x, y) => {
	if (!gameInPlay) {
		return;
	}
	for (var i = grid.length - 1; i >= 0; i--) {
		var row = grid[i];
		var targetPlace = row[x];
		if (!targetPlace.color) {
			row[x] = { color: currentColor };
			currentColor = currentColor === "red" ? "yellow" : "red";
			document.getElementById("currentPlayer").innerHTML = `Current Color: <span class='${currentColor}'>${currentColor}</span>`
			render();
			calculateWinners();
			return;
		}
	}
};

function calculateWinners() {
	for (var r = 0; r < grid.length; r++) {
		var row = grid[r];
		for (var c = 0; c < row.length; c++) {
			var square = grid[r][c];
			if (square && square.color) {
				//find vertical connects
				if (r >= 0 && r<=2) {
					if (
						grid[r + 1][c].color === square.color &&
						grid[r + 2][c].color === square.color &&
						grid[r + 3][c].color === square.color
					) {
						aColorWins(square.color);
						return;
					}
				}
				
				//find horizontal connects
				if (c>=0 && c<=3) {
					if (grid[r][c + 1].color === square.color &&
						 grid[r][c + 2].color === square.color &&
						 grid[r][c + 3].color === square.color) {
						aColorWins(square.color);
						return;
					}
				}
				
				//diagonal connects
				if (r>=0 && r<=3){
					if (c>=0 && c<=3){
						if(grid[r +1][c + 1].color === square.color &&
							grid[r +2][c + 2].color === square.color &&
							grid[r +3][c + 3].color === square.color) {
							aColorWins(square.color);
							return;
						}
					}
						if (r>=2 && r<=5){
						if(grid[r +1][c - 1].color === square.color &&
							grid[r +2][c - 2].color === square.color &&
							grid[r +3][c - 3].color === square.color) {
							aColorWins(square.color);
							return;
						}
					}
				}
			}
		}
	}
	// console.log("Is there a winner?");
}

function aColorWins(color) {
	gameInPlay = false;
	h2.style.backgroundColor = color;
	h2.style.color = "black";
	document.getElementById("currentPlayer").innerHTML = `Thanks for playing!`;
	document.getElementById("whoWon").innerHTML = `<span class='${color}'>${color}</span> Wins!`
}
restart();