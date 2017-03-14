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
