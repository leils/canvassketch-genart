const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

random.setSeed(random.getRandomSeed());

const settings = {
  // dimensions: [2048, 2048],
  suffix: random.getSeed(),
  dimensions: "letter",
  units: 'in',
  pixelsPerInch: 300
};

const sketch = () => {
  // const colorCount = random.rangeFloor(3, 6);
  // const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  // const symbols = ['-','=', '+', '.']

  const createGrid = (height, width) => {
    const points = [];
    const heightratio = height/width;
    const xcount = 40;
    const ycount = xcount * heightratio;

    for (let x=0; x < xcount; x++ ) {
      for (let y=0; y< ycount; y++) {
        const u = xcount <= 1 ? 0.5 : Math.max(0, x/(xcount - 1));
        const v = xcount <= 1 ? 0.5 : Math.max(0, y/(ycount - 1));
        const weight = Math.abs(random.noise2D(u, v));
        points.push({
          position: [u, v],
          weight: weight,
          // color: random.pick(palette),
          // rotation: random.noise2D(u, v),
          // symbol: random.pick(symbols),
        });
      }
    }
    return points;
  };

  // const points = createGrid().filter(() => random.gaussian() > 0.3);

  return ({ context, width, height }) => {
    // const points = createGrid(height, width).filter(() => random.gaussian() > 0.1);
    const points = createGrid(height, width);
    console.log(points);

    const margin = .09 * width;
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    points.forEach((data) => {
      const {
        position,
        weight,
        // color,
        // rotation,
        // symbol
      } = data;

      const [u, v] = position;
      const x = lerp(margin, width-margin, u);
      const y = lerp(margin, height-margin, v);

      console.log(x, y);

      context.beginPath();
      context.arc(x, y, .05 * weight * width, 0, Math.PI * 2, true);
      context.strokeStyle = 'black';
      context.lineWidth = .002 * weight * width;
      context.stroke();


      // context.save();
      // context.fillStyle = color;
      // // context.font = `${weight * width}px "Helvetica"`;
      // context.font = `2px "Helvetica"`;
      // context.translate(x, y);
      // // context.rotate(rotation);
      // // context.fillText(symbol, 0, 0);
      // // context.fillText("o", 0, 0);
      // context.restore();
    });
  };
};

canvasSketch(sketch, settings);
