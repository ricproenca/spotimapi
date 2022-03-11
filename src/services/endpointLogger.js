import logger from './logger';

const endpointLogger = (req, res, next) => {
  logger.info('=== REQUEST ===');
  logger.info(`Method: ${req.method}`);
  logger.info(`URL: ${req.url}`);
  logger.info(`Body: ${JSON.stringify(req.body)}`);
  logger.info(`Headers: ${JSON.stringify(req.headers)}`);

  res.on('finish', () => {
    logger.info('=== RESPONSE ===');
    logger.info(`Code: ${res.statusCode}`);
    logger.info(`Message: ${res.statusMessage}`);
    logger.info(`Body : ${JSON.stringify(res.body)}`);
    logger.info(`Headers: ${JSON.stringify(res.getHeaders())}`);
  });

  next();
};

export default endpointLogger;
