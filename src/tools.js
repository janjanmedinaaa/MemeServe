const FONT_HEIGHT = 70
const CHAR_MAX_PER_LINE = 30

const getTextHeight = (input) => {
  var charCount = input.length
  if (input.length == 0 || charCount < CHAR_MAX_PER_LINE) {
    return FONT_HEIGHT
  } else {
    return Math.ceil(charCount / CHAR_MAX_PER_LINE) * FONT_HEIGHT
  }
}

module.exports = {
  getTextHeight
}