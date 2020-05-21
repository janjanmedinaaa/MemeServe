const Jimp = require('jimp');
const Default = require('./default');
const tools = require('./tools');

var errorPortrait = false;
var errorTooSmall = false;
var errorInvalidImage = false;

const getImage = (url) => {
  errorPortrait = false
  errorTooSmall = false
  errorInvalidImage = false

  return new Promise((resolve) => {
    Jimp.read(url).then(image => {
      var { width, height } = image.bitmap;
      if (width < height) {
        errorPortrait = true;
        Jimp.read(Default.MIKE_WAZOWSKI)
          .then(mikeImage => resolve(mikeImage));
      } else if (width < Default.MINIMUM_WIDTH) {
        errorTooSmall = true;
        Jimp.read(Default.MR_CHOW_TINY)
          .then(chowImage => resolve(chowImage));
      } else {
        resolve(image);
      }
    }).catch(() => {
      errorInvalidImage = true;
      Jimp.read(Default.MIKE_WAZOWSKI)
        .then(mikeImage => resolve(mikeImage));
    });
  });
}

const resizeImage = (image) => {
  return new Promise((resolve) => {
    image.resize(
      Default.CANVAS_WIDTH - Default.MARGIN_TOTAL, 
      Jimp.AUTO
    );
    resolve(image);
  });
}

const attachToCanvas = (image, message) => {
  if (errorPortrait) {
    message = Default.ERROR_PORTRAIT_IMAGE
  } else if (errorTooSmall) {
    message = Default.ERROR_IMAGE_TOO_SMALL
  } else if (errorInvalidImage) {
    message = Default.ERROR_INVALID_IMAGE
  }

  var imageHeight = image.bitmap.height;
  var textHeight = tools.getTextHeight(message);
  var canvasHeight = textHeight + imageHeight + Default.MARGIN_TOTAL;

  return new Promise((resolve) => {
    new Jimp(
      Default.CANVAS_WIDTH, 
      canvasHeight, 
      Default.CANVAS_BACKGROUND, 
      (e, canvas) => {
        var imageX = Default.MARGIN;
        var imageY = canvasHeight - imageHeight - Default.MARGIN;
        canvas.composite(image, imageX, imageY);
        resolve({ canvas, image, message });
      }
    )
  })
}

const writeToCanvas = ({ canvas, image, message }) => {
  var { width, height } = canvas.bitmap;

  return new Promise((resolve) => {
    Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
      canvas.print(
        font, 
        Default.MARGIN, 
        Default.MARGIN, 
        {
          text: message,
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        },
        width - Default.MARGIN_TOTAL,
        height - image.bitmap.height - Default.MARGIN_TOTAL - Default.MARGIN
      );
      resolve(canvas);
    });
  });
}

module.exports = {
  getImage,
  resizeImage,
  attachToCanvas,
  writeToCanvas
}