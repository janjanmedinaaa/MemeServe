const Jimp = require('jimp');
const express = require('express');
const app = express();

const Default = require('./src/default');
const editor = require('./src/editor');

app.get('/', (req, res) => {
  renderImage(req, res, false)
});

app.get('/download', (req, res) => {
  renderImage(req, res, true)
})

const renderImage = (req, res, download) => {
  let imageSrc = req.query.image || Default.MIKE_WAZOWSKI
  let message = req.query.message || Default.ERROR_INCOMPLETE

  editor.getImage(imageSrc)
    .then(image => editor.resizeImage(image))
    .then(resizeImage => editor.attachToCanvas(resizeImage, message))
    .then(canvas => editor.writeToCanvas(canvas))
    .then(writtenCanvas => writtenCanvas.getBufferAsync(Jimp.MIME_PNG))
    .then(buffer => {
      var headers = {
        'Content-Type': 'image/png',
        'Content-Length': buffer.byteLength
      }
  
      if (download) {
        headers['Content-Disposition'] = 'attachment; filename=memeserve.png'
      }

      res.writeHead(200, headers);
      res.end(buffer);
    })
}

app.listen(Default.PORT, () => {
  console.log('Listening on Port:', Default.PORT)
});