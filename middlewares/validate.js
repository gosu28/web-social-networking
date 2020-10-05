// Dùng để kiểm tra đầu vào các request
const statusCodes = require('../errors/statusCode');
const CustomError = require('../errors/CustomError');

function validateParams(req) {
  const errors = req.validationErrors();
  if (errors) {
    const messages = errors.map(error => error.msg);
    throw new CustomError(statusCodes.BAD_REQUEST, messages[0]);
  }
}

function isPhoneNumber(str) {
  const regex = /^(\+?)(?:[-0-9] ?){6,15}[0-9]$/;
  return regex.test(str);
}

function isUrl(str) {
  const urlRegex =
    '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  const url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
}

module.exports = {
  validateParams,
  isPhoneNumber,
  isUrl,
};
