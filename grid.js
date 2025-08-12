const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

random.setSeed(random.getRandomSeed());

const settings = {
  // dimensions: [2048, 2048]
  dimensions: [3400, 4400]
};

const sketch = () => {
  const createGrid = (height, width) => {
    const points = [];
    const heightratio = height/width;
    const xcount = 40;
    const ycount = xcount * heightratio;

    for (let x=0; x < xcount; x++ ) {
      for (let y=0; y< ycount; y++) {
        const u = xcount <= 1 ? 0.5 : Math.max(0, x/(xcount - 1));
        const v = xcount <= 1 ? 0.5 : Math.max(0, y/(ycount - 1));
        const weight = Math.abs(random.noise2D(u, v, frequency=1.75));
        points.push({
          position: [u, v],
          weight: weight,
        });
      }
    }
    return points;
  };

  // const points = createGrid().filter(() => random.gaussian() > 0.3);

  return ({ context, width, height }) => {
    const points = createGrid(height, width);
    console.log(points);

    // Background
    const margin = .09 * width;
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const dimension = 100;
    context.fillStyle = "black";
    context.lineWidth = 5;


    points.forEach((data) => {
      const {
        position,
        weight,
      } = data;

      const [u, v] = position;
      const x = lerp(margin, width-margin, u);
      const y = lerp(margin, height-margin, v);

      console.log(x, y);

      context.beginPath();
      context.moveTo(x-(dimension * weight), y);
      context.lineTo(x+(dimension * weight), y);
      context.moveTo(x, y-(dimension * weight));
      context.lineTo(x, y+(dimension * weight));
      context.closePath();
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
