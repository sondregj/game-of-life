function UI() {
  this.w = 400;
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
    //rect(0, 0, this.w, height);

    // Header text
    textAlign(CENTER);

    textSize(60);
    textFont(futura_pt_medium);
    fill(0);
    text("Game of Life", this.w / 2, 80);

    textSize(24);
    textFont(futura_pt_book);
    if (grid.running) {
      text("Running", this.w / 2, 150);
    } else {
      text("Paused", this.w / 2, 150);
    }

    textSize(16);
    text("Press spacebar to toggle play/pause", this.w / 2, height - 100);

    textAlign(LEFT);
    textFont(monospace);
    text("generation " + grid.generation, this.w / 4, 220);

    textAlign(CENTER);
    textFont(futura_pt_book);


    fill(220, 0, 140);
    rect(this.w / 2 - 30, height - 250, 60, -300 * this.percentageAlive / 100);
    text(this.percentageAlive + "%", this.w / 2, height - 200);
  }
}
