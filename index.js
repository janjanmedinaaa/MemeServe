const Jimp = require('jimp');
const express = require('express');
const compression = require('compression');
const app = express();

const Default = require('./src/default');
const editor = require('./src/editor');

app.set('port', process.env.PORT || Default.PORT);

app.use(compression());

app.get('/', (req, res) => {
  renderImage(req, res, false);
});

app.get('/download', (req, res) => {
  renderImage(req, res, true);
});

const renderImage = (req, res, download) => {
  let imageSrc = req.query.image || Default.MIKE_WAZOWSKI
  let message = req.query.message || Default.ERROR_INCOMPLETE

  editor.getImage(imageSrc)
    .then(image => editor.resizeImage(image))
    .then(resizeImage => editor.attachToCanvas(resizeImage, message))
    .then(canvas => editor.writeToCanvas(canvas))
    .then(writtenCanvas => writtenCanvas.getBufferAsync(Jimp.MIME_PNG))
    .then(buffer => {
      res.set('Content-Length', buffer.byteLength);
      res.set('Content-Type', 'image/png');
  
      if (download) {
        res.set('Content-Disposition', 'attachment; filename=memeserve.png');
      }

      return res.send(buffer);
    })
}

app.listen(app.get('port'), () => {
  console.log('Listening on Port:', app.get('port'));
});