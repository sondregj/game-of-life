function UI() {
  this.w = 300;
  this.percentageAlive = 0;

  this.update = function() {
    grid.liveCells = 0;
    for (i = 0; i < grid.grid.length; i++) {
      for (j = 0; j < grid.grid[i].length; j++) {
        if (grid.grid[i][j] == 1) {
          grid.liveCells++;
        }
      }
    }
    this.percentageAlive = floor(grid.liveCells * 1000 / sq(grid.gridS)) / 10;
  }

  this.render = function() {
    // UI background
    noStroke();
    fill(220);
    rect(0, 0, this.w, height);

    // Header text
    textSize(48);
    fill(0);
    text("Game of Life", this.w / 2, 60);

    textSize(24);
    if (grid.running) {
      text("Running", this.w / 2, 150);
    } else {
      text("Paused", this.w / 2, 150);
    }

    textSize(16);
    text("Press spacebar to toggle play/pause", this.w / 2, height - 100);

    fill(220, 0, 140);
    rect(this.w / 2 - 30, height - 250, 60, -300 * this.percentageAlive / 100);
    text(this.percentageAlive + "%", this.w / 2, height - 200);
  }
}
