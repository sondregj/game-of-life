function Grid() {
  this.size = 600;
  this.woffset = (width - ui.w - this.size) / 2 + ui.w;
  this.hoffset = (height - this.size) / 2;
  this.gridS;
  this.running = 0;
  this.grid = [];
  this.liveCells = 0;

  this.init = function(x) {
    this.gridS = x;
    // Set up grid
    for (i = 0; i < this.gridS; i++) {
      this.grid[i] = [];
      for (j = 0; j < this.gridS; j++) {
        this.grid[i][j] = 0;
      }
    }

    this.gridUp = JSON.parse(JSON.stringify(this.grid));
    this.gridAlive = JSON.parse(JSON.stringify(this.grid));
  }

  this.addDot = function(x, y) {
    if (x > (this.woffset) && y > (this.hoffset)) {
      if (x < (this.size + this.woffset) && y < (this.size + this.hoffset)) {
        var coordinateX = floor((x - this.woffset) * this.gridS / this.size);
        var coordinateY = floor((y - this.hoffset) * this.gridS / this.size);

        if (this.grid[coordinateX][coordinateY] == 1) {
          this.grid[coordinateX][coordinateY] = 0;
        } else if (this.grid[coordinateX][coordinateY] == 0) {
          this.grid[coordinateX][coordinateY] = 1;
        } else {
          this.grid[coordinateX][coordinateY] = 0;
        }
      }
    }
  }

  this.updateNeighbors = function() {
    for (var x = 1; x < this.grid.length - 1; x++) { // The egdes are skipped, for now
      for (var y = 1; y < this.grid[x].length - 1; y++) {
        var neighbors = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            neighbors += this.grid[x + i][y + j];
          }
        }
        neighbors -= this.grid[x][y];
        this.gridAlive[x][y] = neighbors;
        console.log(neighbors);
      }
    }
  }

  this.update = function() {
    for (var x = 1; x < this.grid.length - 1; x++) { // The egdes are skipped, for now
      for (var y = 1; y < this.grid[x].length - 1; y++) {
        if ((this.grid[x][y] == 1) && (this.gridAlive[x][y] < 2)) this.gridUp[x][y] = 0;
        else if ((this.grid[x][y] == 1) && (this.gridAlive[x][y] > 3)) this.gridUp[x][y] = 0;
        else if ((this.grid[x][y] == 0) && (this.gridAlive[x][y] == 3)) this.gridUp[x][y] = 1;
        else this.gridUp[x][y] = this.grid[x][y];
      }
    }
    this.grid = JSON.parse(JSON.stringify(this.gridUp));
  }


  this.render = function() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] == 1) {
          fill(220, 0, 140);
        } else {
          fill(230, 230, 230);
        }
        rect(((i * this.size / this.gridS) + this.woffset), ((j * this.size / this.gridS) + this.hoffset), (600 / this.gridS) - 2, (600 / this.gridS) - 2);

        // Uncomment the lines below to show number of live neighbors on grid
        //fill(100, 100, 100);
        //text(this.gridAlive[i][j], ((i * this.size / this.gridS) + this.woffset + 15), ((j * this.size / this.gridS) + this.hoffset + 20));
      }
    }
  }
}






/*

function checkNeighbors() {
  for (i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[i].length; j++) {

      isAlive = 0;

      if (i > 0 && j > 0) {
        if (i < (gridS -1) && j < gridH - 1) {
          for (k = 0; k < neighbors.length; k++) {
            if (grid[i + neighbors[k][0]][j + neighbors[k][1]]) {
              isAlive++;
            }
          }
        }
      }

      gridAlive[i][j] = isAlive;
    }
  }
}


function updateGrid() {
  gridUp = grid;
  for (i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        // see if this cell should die
        console.log("alive" + gridAlive[i][j]);
        if (gridAlive[i][j] === 2 || gridAlive[i][j] == 3) {
          // extant
          gridUp[i][j] = 1;
        } else {
          // extinct

          gridUp[i][j] = 0;
        }
      } else {
        // see if this empty cell should come alive
        if (gridAlive[i][j] === 3) {
          // birth
          gridUp[i][j] = 1;
        } else {
          // staying unborn
          gridUp[i][j] = 0;
        }
      }
    }
  }

  grid = gridUp;
}
*/



/* Array for checking neighbors
  neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, -1],
    [0, +1],
    [+1, -1],
    [+1, 0],
    [+1, +1]
  ];
  */
