const snakecaseKeys = require('snakecase-keys');
const statusCodes = require('../errors/statusCode');
const getErrorMessage = require('../errors/message');
const { logger } = require('../utils/logger');
// Khi nhận được lỗi được throw ra thì sẽ đi qua hàm này và trả về client
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  logger.error(err);
  let statusCode = err.code;
  let { message } = err;
  const code = err.code || statusCodes.INTERNAL_SERVER_ERROR;
  switch (code) {
    case statusCodes.BAD_REQUEST:
      message = message || 'Bad Request';
      break;
    case statusCodes.UNAUTHORIZED:
      message = 'Unauthorized';
      break;
    case statusCodes.FORBIDDEN:
      message = 'Forbidden';
      break;
    case statusCodes.NOT_FOUND:
      message = 'Not Found';
      break;
    case statusCodes.INTERNAL_SERVER_ERROR:
      statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      message = message || 'Something went wrong';
      break;
    default:
      message = message || getErrorMessage(code);
      statusCode = 200;
  }
  return res.status(statusCode).send(
    snakecaseKeys(
      code
        ? {
            status: 0,
            code,
            message,
          }
        : {
            status: 0,
            message,
          },
    ),
  );
}

module.exports = errorHandler;
