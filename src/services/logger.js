import dayjs from 'dayjs';
import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

/**
 * Customize log:
 *
 * { stream: pino.destination(path.resolve(__dirname, '../', '../', 'logs/', 'app.log')) }
 *
 * defaultLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'];
 *
 * transport: {
 *    target: 'pino-pretty',
 *    options: {
 *      colorize: true,
 *      translateTime: 'SYS:standard',
 *      ignore: 'hostname,pid'
 *    }
 *  }
 */

const streams = [{ stream: process.stdout }];

const logger = pino(
  {
    level: 'debug',
    base: {
      pid: undefined,
      hostname: undefined
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
    formatters: {
      level: label => ({ level: label })
    }
  },
  pino.multistream(streams)
);

export default logger;
