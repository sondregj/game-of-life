// Sondre Gjellestad | 2017

function preload() {
  futura_pt_book = loadFont('fonts/futura-pt-book.ttf');
  futura_pt_medium = loadFont('fonts/futura-pt-medium.ttf');
  monospace = loadFont('fonts/monospace.ttf');

  // Unused fonts
  //futura_pt_book_oblique = loadFont('fonts/futura-pt-book-oblique.ttf');
}

function setup() {
  updated = 1;
  updateFreq = 1;

  minwidth = 930;
  minheight = 620;

  if (windowWidth >= minwidth) {
    var w = windowWidth;
    var h = windowHeight;
  } else {
    var w = minwidth;
    var h = minheight;
  }
  createCanvas(w, h, P2D);
  frameRate(60);

  // Initial text setup
  textSize(32);
  textFont(futura_pt_medium);
  fill(0);
  noStroke();
  textAlign(CENTER);

  // Initialize UI
  ui = new UI();

  // Initialize grid
  grid = new Grid();
  grid.init(50);
}

function draw() {
  if (updated || (grid.running && (frameCount % updateFreq == 0))) { // If anything is updated or grid is running, run
    console.log(1);
    //Reset
    //background(255, 150);
    background(196, 193, 160, 150);

    // Update grid if pause is off
    if (grid.running && frameCount % updateFreq == 0) {
      grid.updateNeighbors();
      grid.update();
    }

    // Render grid
    grid.render();

    //Print UI
    ui.update();
    ui.render();

    //Reset updated variable
    if (updated > 0) {
      updated -= 0.2;
    }
    if (updated <= 0) {
      updated = 0;
    }
  }
}
