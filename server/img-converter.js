'use strict';

const Jimp = require('jimp');
const args = require('yargs').argv;
const input = args.i || args.input;
const output = args.o || args.output;

Jimp.read(input, (err, img) => {
  if (err) throw err;
  img
    .crop(64, 120, 248, 60)
    .gaussian(5)
    .greyscale()
    .contrast(.65)
    .invert()
    .quality(80)
    .write(output);
});
