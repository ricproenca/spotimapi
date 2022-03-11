import logger from './logger';

const endpointLogger = (req, res, next) => {
  logger.info(`Request Method: ${req.method}`);
  logger.info(`Request URL: ${req.url}`);
  logger.info(`Request Body: ${JSON.stringify(req.body)}`);
  logger.info(`Request Headers: ${JSON.stringify(req.headers)}`);

  res.on('finish', () => {
    logger.info(`Response Code: ${res.statusCode}`);
    logger.info(`Response Message: ${res.statusMessage}`);
    logger.info(`Response Body : ${JSON.stringify(res.body)}`);
    logger.info(`Response Headers: ${JSON.stringify(res.getHeaders())}`);
  });

  next();
};

export default endpointLogger;
