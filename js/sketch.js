///<reference path='../p5.global-mode.d.ts'/>
let cellSize;
let grid = [];
let antCell;
let dir = 0;
let i0, i1, j0, j1;
let numCols = 121;
let running = true;
let stepCount = 0;
let k = 0;
let visibleGrid;
function setup() {
  i0 = 0;
  j0 = 0;
  i1 = numCols;
	j1 = numCols;
	
	createCanvas(1210, 1210);
	textSize(100);
  // frameRate(100);
  cellSize = width / numCols;
  for (let i = 0; i < numCols; i++) {
    let cols = [];
    for (let j = 0; j < numCols; j++) {
      cols.push(0);
    }
    grid.push(cols);
	}
}
  

function draw() {
	update();
	
}
function keyPressed() {
	if (key == " ") {
		running = !running;
	}
}
function update() {
	if (!running) return;
	// noStroke();
	getVisibleGrid();
	makeAnt();
	antCell = visibleGrid[floor(visibleGrid.length / 2)][floor(visibleGrid.length / 2)];
  for (let i = 0; i < visibleGrid.length; i++) {
    for (let j = 0; j < visibleGrid.length; j++) {
      if (visibleGrid[i][j] == 0 || visibleGrid[i][j] == 2) {
        fill(255);
      } else if (visibleGrid[i][j] == 1 || visibleGrid[i][j] == 3) {
        fill(0);
      }
			rect(i * cellSize, j * cellSize, cellSize, cellSize);
			if (visibleGrid[i][j] == 2 || visibleGrid[i][j] == 3) {
				fill(200, 0, 150);
				ellipseMode(CORNER);
				ellipse(i * cellSize, j * cellSize, cellSize);
			}
    }
	}

	if (antCell == 2) {
		k++;
		grid[i0 + floor(visibleGrid.length / 2)][j0 + floor(visibleGrid.length / 2)] = 1;
	} else if (antCell = 3) {
		k--;
		grid[i0 + floor(visibleGrid.length / 2)][j0 + floor(visibleGrid.length / 2)] = 0;
		
	}

	if (k < 0) { k = 3;}
	k = k % 4;
	
	if (k == 0) {
		moveUp();
	} else if(k == 1){
		moveLeft();
	} else if(k == 2){
		moveDown();
	} else if(k == 3){
		moveRight();
	}
	fill(255, 0, 0);
	text(stepCount.toString(), 50, 50, 500, 100);
	stepCount++;
	if (stepCount == 10647) {
		running = false;
	}
	delAnt();
}

function getVisibleGrid() {
	visibleGrid = [];
	for (let i = i0; i < i1; i++){
		let visCol = [];
		for (let j = j0; j < j1; j++) {
			visCol.push(grid[i][j]);
		}
		visibleGrid.push(visCol);
	}
}

function moveLeft() {
  let newCol = [];
  if (i0 == 0) {
    for (let j = 0; j < grid[0].length; j++) {
      newCol.push(0);
    }
    grid.unshift(newCol);
  } else {
    i0--;
    i1--;
  }
}


function makeAnt() {
	if (visibleGrid[floor(visibleGrid.length / 2)][floor(visibleGrid.length / 2)] == 0) {
		visibleGrid[floor(visibleGrid.length / 2)][floor(visibleGrid.length / 2)] = 2;
	} else {
		visibleGrid[floor(visibleGrid.length / 2)][floor(visibleGrid.length / 2)] = 3;
		}
}

function delAnt(){
	if ([floor(visibleGrid.length / 2)][floor(visibleGrid.length / 2)] == 2) {
		visibleGrid[floor(visibleGrid.length / 2)][floor(visibleGrid.length / 2)] = 0;
	} else if(visibleGrid[floor(visibleGrid.length / 2)][floor(visibleGrid.length / 2)] == 3){
		visibleGrid[floor(visibleGrid.length / 2)][floor(visibleGrid.length / 2)] = 0;
	}
}
function moveRight() {
	let newCol = [];
	console.log(grid[i1]);
	if (grid[i1] === undefined) {
    for (let j = 0; j < grid[0].length; j++) {
      newCol.push(0);
    }
		grid.push(newCol);
		console.log(grid[i1]);
	}
	i0++;
	i1++;
}

function moveDown() {
	for (let i = 0; i < grid.length; i++){
		if (grid[i][j1] === undefined) {
			grid[i].push(0);
		}
	}
	j0++;
	j1++;
}

function moveUp() {
	if (j0 == 0) {
		for (let i = 0; i < grid.length; i++){
			grid[i].unshift(0)
		}
	} else {
		j0--;
		j1--;
	}
	
}
