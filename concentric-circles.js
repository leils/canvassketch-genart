const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');
const Color = require('canvas-sketch-util/color');

random.setSeed(random.getRandomSeed());

const settings = {
  dimensions: [2048, 2048],
  // suffix: random.getSeed(),
  // dimensions: "letter",
  // orientation: 'landscape',
  // units: 'in',
  // pixelsPerInch: 300
};

const sketch = () => {
  const createList = (height, width) => {
    const intervals = [];
    const count = 10;

    for (let x=0; x<count; x++) {
      intervals.push({
        count: x,
        rotation: random.value(x) * (Math.PI * 2) //0-2pi
      })
    }

    return intervals;
  }


  return ({ context, width, height }) => {
    const intervals = createList(height, width);

    // Set background
    const margin = .09 * width;
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const intervalSize = 1 / intervals.length / 2;

    context.save();

    recursivePathTrace(context, intervals, [width/2, height/2], [0,0]);
  };
};

const recursivePathTrace = (context, intervals, c, lastc) => {
  //kill recursion
  if (intervals.length < 1) {
    return
  };

  c1 = c[0];
  c2 = c[1];

  currentPath = intervals.pop();
  context.save();
  //translate needs to be in context to last point
  //how do i do this off of the corner/new center instead
  context.translate(c1 - lastc[0], c2 - lastc[1]);
  context.rotate(currentPath.rotation);


  radius = .05 * 1000 * currentPath.count;
  angle = Math.PI * currentPath.rotation;

  context.arc(0, 0, radius, 0, angle, true);
  context.strokeStyle = 'black';
  context.lineWidth = 10;
  context.stroke();
  // need to translate to the end of the previous arc

  //ensure intervals has been removed
  recursivePathTrace(context, intervals, getEndArcPoint(c1, c2, radius, angle), c);
}

function getEndArcPoint(c1,c2,radius,angle){
    return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
}

canvasSketch(sketch, settings);
