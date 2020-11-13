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
        rotation: random.value(x) * (Math.PI * 2)
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

    intervals.forEach((data) => {
      const {
        count,
        rotation
      } = data;


      context.save();
      context.translate(width / 2, height / 2);
      context.rotate(rotation);
      context.beginPath();
      context.arc(0, 0, (intervalSize * width) * count, 0, Math.PI * .25, true);
      context.strokeStyle = 'black';
      context.lineWidth = .01 * width;
      context.stroke();
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
