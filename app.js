// Sondre Gjellestad | 2017

function preload() {
  futura_pt_book = loadFont('fonts/futura-pt-book.ttf');
  futura_pt_medium = loadFont('fonts/futura-pt-medium.ttf');

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
  frameRate(30);

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
  grid.init(80);
}


function draw() {
  if (updated || (grid.running && frameCount % updateFreq == 0)) { // If anything is updated or grid is running, run
    //Reset
    background(255);

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
    if (updated !== 0) {
      updated -= 1 / 5;
    }

  }
}

function keyReleased() {
  if (keyCode == 32) {
    if (grid.running == 1) {
      grid.running = 0;
    } else {
      grid.running = 1;
    }

    // Update on keypress
    var updated = 1;
  }
}

function mouseReleased() {
  grid.addDot(mouseX, mouseY);

  // Update on mouseclick
  updated = 1;
}

function windowResized() {
  // Add rule for minimum window size | 930 x 620
  if (windowWidth >= minwidth) {
    resizeCanvas(windowWidth, windowHeight);
  } else {
    resizeCanvas(minwidth, minheight);
  }
  grid.woffset = (width - ui.w - grid.size) / 2 + ui.w;
  grid.hoffset = (height - grid.size) / 2;

  // Update on resize
  updated = 1;
}
