/**
 * Error Messages and Images
 */
const MIKE_WAZOWSKI = './images/mike.jpg';
const MR_CHOW_TINY = './images/chow.jpg';
const ERROR_INCOMPLETE = 'When you use a meme generator and forgot to add the message and image';
const ERROR_PORTRAIT_IMAGE = 'When you use a meme generator and use a portrait image';
const ERROR_IMAGE_TOO_SMALL = 'When you use a meme generator and use a tiny image';
const ERROR_INVALID_IMAGE = 'When you use a meme generator and attached an invalid image';

/**
 * Server Configuration
 */
const PORT = 4000

/**
 * Output Image Configuration
 */
const CANVAS_WIDTH = 1000
const CANVAS_BACKGROUND = '#FFFFFF'
const MARGIN_TOTAL = 40
const MARGIN = MARGIN_TOTAL / 2

/**
 * Image Requirements
 */
const MINIMUM_WIDTH = 400

module.exports = {
  MIKE_WAZOWSKI,
  MR_CHOW_TINY,
  ERROR_INCOMPLETE,
  ERROR_PORTRAIT_IMAGE,
  ERROR_IMAGE_TOO_SMALL,
  ERROR_INVALID_IMAGE,

  PORT,

  CANVAS_WIDTH,
  CANVAS_BACKGROUND,
  MARGIN_TOTAL,
  MARGIN,

  MINIMUM_WIDTH
}